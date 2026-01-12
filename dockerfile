# Gunakan image Jenkins LTS
FROM jenkins/jenkins:lts

# Non-interactive
USER root

# Install Node.js & dependencies
RUN curl -fsSL https://deb.nodesource.com/setup_20.x | bash - \
    && apt-get install -y nodejs \
    && npm install -g npm

# Install Playwright dependencies
RUN apt-get update --fix-missing && apt-get install -y --no-install-recommends \
    libnss3 libatk-bridge2.0-0 libxss1 libgtk-3-0 libx11-xcb1 libxcomposite1 \
    libxcursor1 libxdamage1 libxi6 libxtst6 libglib2.0-0 libasound2 libpangocairo-1.0-0 \
    wget unzip || apt-get install -y --fix-missing

# Copy project ke container
COPY . /var/jenkins_home/workspace/web-automation-playwright
WORKDIR /var/jenkins_home/workspace/web-automation-playwright

# Install node modules
RUN npm install
RUN npx playwright install

# Default user back to jenkins
USER jenkins
