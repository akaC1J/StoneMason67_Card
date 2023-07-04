import os
import asyncio
import threading
from telegram import Update, Bot
from telegram.ext import CommandHandler, MessageHandler, CallbackContext, filters, ApplicationBuilder
import redis
from dotenv import load_dotenv

load_dotenv("../.env")
# создание Redis клиента
redis_host = os.getenv("REDIS_HOST")
bot_token = os.getenv("BOT_TOKEN")
redis_port = os.getenv("REDIS_PORT")
redis_password = os.getenv("REDIS_PASSWORD")
r = redis.Redis(host=redis_host, port=redis_port, password=redis_password)

users = {}
admins = {}


async def delete_user(update: Update, context: CallbackContext):
    chat_id = str(update.message.chat_id)
    if chat_id not in admins:
        await update.message.reply_text("У вас недостаточно прав.")
        return
    command, delete_chat_id = update.message.text.split(' ', 1)
    delete_chat_id = str(delete_chat_id)
    if delete_chat_id in admins:
        await update.message.reply_text("Невозможно удалить администратора! Обратитесь к разработчику бота")
        return
    del users[delete_chat_id]
    await update.message.reply_text(f"Пользователь с chatId = {delete_chat_id} удален")


async def list_users(update: Update, context: CallbackContext):
    chat_id = str(update.message.chat_id)
    if chat_id not in admins:
        await update.message.reply_text("У вас недостаточно прав.")
        return
    res_str = '\n'.join(f"{index + 1}. Имя: {users[key]} - ChatID: {key}" for index, key in enumerate(users))
    await update.message.reply_text(res_str)


async def register_command(update: Update, context: CallbackContext):
    chat_id = str(update.message.chat_id)
    command, password = update.message.text.split(' ', 1)
    if password == os.getenv('TELEGRAM_USER_PASSWORD'):
        users[chat_id] = update.message.from_user.first_name
        await update.message.reply_text("Регистрация прошла успешно.")
    elif password == os.getenv('TELEGRAM_ADMIN_PASSWORD'):
        users[chat_id] = update.message.from_user.first_name
        admins[chat_id] = update.message.from_user.first_name
        await update.message.reply_text("Регистрация администратора прошла успешно.")
    else:
        await update.message.reply_text("Неверный пароль.")


async def message(update: Update, context: CallbackContext):
    chat_id = str(update.message.chat_id)
    if chat_id in users:
        reply_text = f"Привет, {update.message.from_user.first_name}! Вы уже будете получать сообщения от этого бота"
        await update.message.reply_text(reply_text)
    else:
        await update.message.reply_text("У вас нет доступа. Зарегистрируйтесь, введя команду /register и пароль.")


async def help_command(update: Update, context: CallbackContext):
    chat_id = str(update.message.chat_id)
    help_text = """
    Основные команды бота:
    /register <пароль> - Зарегистрируйтесь в системе. Если вы зарегистрированы, вы начнете получать сообщения от этого бота.
    /list - (Только для администраторов) Показывает список всех зарегистрированных пользователей.
    /delete <chat_id> - (Только для администраторов) Удаляет пользователя по его chat_id.
    """
    await update.message.reply_text(help_text)


async def send_all_sync(mes, bot):
    for chat_id in users.keys():
        await bot.send_message(chat_id=chat_id, text=mes)


async def process_messages(bot, redis):
    while True:
        mes = redis.lpop('message_deque')
        if mes is not None:
            await send_all_sync(mes.decode(), bot)
        await asyncio.sleep(2)


def main(token=None, redis=None):
    application = ApplicationBuilder().token(token).build()
    application.add_handler(CommandHandler("register", register_command))
    application.add_handler(CommandHandler("list", list_users))
    application.add_handler(CommandHandler("delete", delete_user))
    application.add_handler(MessageHandler(~filters.COMMAND, message))
    application.add_handler(CommandHandler("help", help_command))
    application.add_handler(CommandHandler("start", help_command))
    # Создание и запуск цикла событий asyncio в отдельном потоке
    asyncio_thread = threading.Thread(target=asyncio.run, args=(process_messages(Bot(token), redis),))
    asyncio_thread.start()
    application.run_polling()


if __name__ == '__main__':
    main(bot_token, r)
