FROM php:7.4.33-apache
WORKDIR /var/www/html
COPY . .
EXPOSE 80