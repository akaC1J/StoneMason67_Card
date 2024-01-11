import redis
import os


def create_redis_client():
    redis_host = os.getenv("REDIS_HOST")
    redis_port = os.getenv("REDIS_PORT")
    redis_password = os.getenv("REDIS_PASSWORD")
    return redis.Redis(host=redis_host, port=redis_port, password=redis_password)


r = create_redis_client()


def push_message_to_deque(key, message):
    r.rpush(key, message)
