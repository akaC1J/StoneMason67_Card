FROM python:3.9

WORKDIR /bot

COPY requirements.txt requirements.txt
VOLUME data data
RUN pip install -r requirements.txt

COPY . .

CMD ["python", "bot.py"]
