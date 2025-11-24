FROM php:8.5-rc-cli

WORKDIR /var/www/html

RUN set -eux; \
    apt-get update; \
    apt-get install -y --no-install-recommends \
        git \
        unzip \
        zip \
        libicu-dev \
        libzip-dev \
        libpq-dev \
        libsqlite3-dev \
        libxml2-dev \
    ; \
    rm -rf /var/lib/apt/lists/*

RUN curl -sSL https://github.com/mlocati/docker-php-extension-installer/releases/latest/download/install-php-extensions -o /usr/local/bin/install-php-extensions \
    && chmod +x /usr/local/bin/install-php-extensions \
    && install-php-extensions \
        bcmath \
        intl \
        pcntl \
        pdo_mysql \
        pdo_sqlite \
        redis \
        zip

COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

ENV PATH="/var/www/html/vendor/bin:${PATH}"

