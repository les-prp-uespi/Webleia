#!/bin/sh
set -e

# Aguarda o MySQL estar disponível (troque 'mysql' pelo nome do seu serviço de banco no docker-compose)
 /usr/local/bin/wait-for-it.sh mysql:3306 --timeout=30 --strict -- echo "MySQL está disponível"

# Inicia o servidor Laravel
exec php artisan serve --host=0.0.0.0 --port=8000
