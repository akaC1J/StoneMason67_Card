#!/bin/bash

domains=(stonemason67.ru www.stonemason67.ru)
email=stonemason67@bk.ru
rsa_key_size=4096
staging=0 # Установите в 1 для тестирования, 0 для реального режима

if [ "$staging" != "0" ]; then staging_arg="--staging"; fi

certbot certonly --webroot -w data/certbot/www \
  --verbose \
  --register-unsafely-without-email \
  --rsa-key-size=$rsa_key_size \
  --agree-tos \
  --no-eff-email \
  --email=$email \
  -d ${domains[0]} -d ${domains[1]} \
