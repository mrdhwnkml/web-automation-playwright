# ================================
# Dockerfile Jenkins + Playwright + Allure
# ================================

# 1️⃣ Base image Jenkins LTS
FROM jenkins/jenkins:lts

USER root

# 2️⃣ Install Node.js & npm
RUN curl -fsSL https://deb.nodesource.com/setup_20.x | bash - \
    && apt-get install -y nodejs \
    && npm install -g npm

    
# 3️⃣ Install dependencies untuk Playwright browser
RUN apt-get update && apt-get install -y \
    libnss3 libatk1.0-0 libatk-bridge2.0-0 libcups2 \
    libxkbcommon0 libxcomposite1 libxdamage1 libxrandr2 \
    libgbm1 libpango-1.0-0 libpangocairo-1.0-0 libgtk-3-0 wget curl unzip

# 4️⃣ Install Playwright browsers
RUN npx playwright install --with-deps

# 5️⃣ Install Allure CLI
RUN wget https://github.com/allure-framework/allure2/releases/download/2.27.0/allure-2.27.0.zip \
    -O /tmp/allure.zip && \
    unzip /tmp/allure.zip -d /opt && \
    ln -s /opt/allure-2.27.0/bin/allure /usr/bin/allure && \
    rm /tmp/allure.zip

# 6️⃣ Set working directory
WORKDIR /app

# 7️⃣ Copy dependency descriptor dulu (package.json + package-lock.json)
COPY package.json package-lock.json ./

# 8️⃣ Install project dependencies secara deterministic
RUN npm ci

# 9️⃣ Copy seluruh source code
COPY . .


