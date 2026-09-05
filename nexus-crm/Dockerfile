FROM php:8.4-cli

# Install system dependencies and PostgreSQL driver
RUN apt-get update && apt-get install -y \
    libpq-dev \
    git \
    unzip \
    && docker-php-ext-install pdo pdo_pgsql \
    && apt-get clean && rm -rf /var/lib/apt/lists/*

# Install Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

WORKDIR /var/www

# Copy project files
COPY . .

# Install composer dependencies
RUN composer install --no-dev --optimize-autoloader --no-interaction

EXPOSE 8080

# Run Laravel on the port assigned by Render ($PORT)
CMD php artisan serve --host=0.0.0.0 --port=${PORT:-8080}
