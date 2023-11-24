import os

import psycopg2


def _get_db_conn():
    db_user = os.getenv("DB_USER")
    db_password = os.getenv("DB_PASSWORD")
    db_host = os.getenv("DB_HOST")
    db_name = os.getenv("DB_NAME")
    db_port = os.getenv("DB_PORT")

    conn = psycopg2.connect(
        dbname=db_name,
        user=db_user,
        password=db_password,
        host=db_host,
        port=db_port
    )
    return conn


def execute_sql(sql, params=None):
    conn = _get_db_conn()
    cursor = conn.cursor()
    try:
        if params:
            cursor.execute(sql, params)
        else:
            cursor.execute(sql)

        # Если SQL-запрос должен возвращать значение, например, после вставки
        if "returning" in sql.lower():
            inserted_id = cursor.fetchone()[0]
            conn.commit()
            return inserted_id
        else:
            conn.commit()

    finally:
        cursor.close()
        conn.close()



def fetch_one(sql, params=None):
    conn = _get_db_conn();
    cursor = conn.cursor()
    if params:
        cursor.execute(sql, params)
    else:
        cursor.execute(sql)
    result = cursor.fetchone()
    cursor.close()
    conn.close()
    return result


def execute_many_sql(sql, params_list=None):
    conn = _get_db_conn()
    cursor = conn.cursor()
    cursor.executemany(sql, params_list)
    conn.commit()
    cursor.close()
    conn.close()


def fetch_all(sql, params=None):
    conn = _get_db_conn();
    cursor = conn.cursor()
    if params:
        cursor.execute(sql, params)
    else:
        cursor.execute(sql)
    results = cursor.fetchall()
    cursor.close()
    conn.close()
    return results
