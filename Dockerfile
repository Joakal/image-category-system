# Warning: This calls Debian:Jessie
FROM php:7.0-fpm

# Required dependency for MongoDB, composer and php
RUN apt-get update -y && apt-get install -y libssl-dev git libzip-dev curl libmcrypt-dev

# Install PHP modules
RUN docker-php-ext-install pdo_mysql
RUN docker-php-ext-install json
RUN docker-php-ext-install mcrypt
RUN docker-php-ext-install zip
RUN docker-php-ext-install mbstring
# Possible values for ext-name as at 24/7/17:
# bcmath bz2 calendar ctype curl dba dom enchant exif fileinfo filter ftp gd
# gettext gmp hash iconv imap interbase intl json ldap mbstring mcrypt mysqli
# oci8 odbc opcache pcntl pdo pdo_dblib pdo_firebird pdo_mysql pdo_oci pdo_odbc
# pdo_pgsql pdo_sqlite pgsql phar posix pspell readline recode reflection
# session shmop simplexml snmp soap sockets spl standard sysvmsg sysvsem sysvshm
# tidy tokenizer wddx xml xmlreader xmlrpc xmlwriter xsl zip

# Install MongoDB driver and enable the driver extension
RUN pecl install mongodb-1.2.9 \
    && docker-php-ext-enable mongodb

RUN curl -sS https://getcomposer.org/installer | \
    php -- --install-dir=/usr/bin/ --filename=composer
COPY composer.json ./
COPY composer.lock ./
RUN composer install --no-scripts --no-autoloader
COPY .env.example ..env

RUN apt-get remove --purge curl -y && \
  apt-get clean
