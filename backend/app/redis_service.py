import redis
import os


def create_redis_client():
    redis_host = os.getenv("REDIS_HOST")
    redis_port = os.getenv("REDIS_PORT")
    redis_password = os.getenv("REDIS_PASSWORD")
    return redis.Redis(host=redis_host, port=redis_port, password=redis_password)


def push_message_to_deque(r, form_data):
    form_data_str = '\n'.join([f"{field}: {value}" for field, value in form_data.items()])
    r.rpush('message_deque', form_data_str)
