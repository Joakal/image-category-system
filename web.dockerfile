FROM nginx:1.13.3

COPY conf /etc/nginx/conf.d
COPY . /var/www/html

RUN chown -R www-data:www-data /var/www/html
