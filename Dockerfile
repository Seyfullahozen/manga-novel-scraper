FROM php:8.3-fpm

WORKDIR /var/www/html

RUN apt-get update && apt-get install -y \
    libzip-dev \
    libxml2-dev \
    libpng-dev \
    libicu-dev \
    libmagickwand-dev \
    libwebp-dev \
    libavif-dev \
    libjpeg62-turbo-dev \
    libfreetype6-dev \
    unzip \
    git \
    curl \
    && docker-php-ext-configure gd \
        --with-freetype \
        --with-jpeg \
        --with-webp \
    && docker-php-ext-install zip pdo_mysql xml dom gd intl exif \
    && pecl install imagick \
    && docker-php-ext-enable imagick \
    && apt-get clean && rm -rf /var/lib/apt/lists/*

RUN sed -i 's/name="width" value="32KP"/name="width" value="64KP"/g; \
            s/name="height" value="32KP"/name="height" value="64KP"/g' \
    /etc/ImageMagick-7/policy.xml

COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

RUN usermod -u 1000 www-data && groupmod -g 1000 www-data

COPY --chown=www-data:www-data . /var/www/html

RUN chmod -R 755 /var/www/html \
    && chmod -R 775 /var/www/html/storage /var/www/html/bootstrap/cache

RUN mkdir -p /var/www/.config/psysh \
    && chown -R www-data:www-data /var/www/.config

RUN curl -fsSL https://deb.nodesource.com/setup_20.x | bash - \
    && apt-get install -y nodejs

USER www-data
