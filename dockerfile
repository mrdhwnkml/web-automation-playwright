# Base image Node.js
FROM node:18

# Set working directory
WORKDIR /app

# Copy package.json & install dependencies
COPY package*.json ./
RUN npm install

# Install Playwright browsers
RUN npx playwright install --with-deps

# Copy semua file project
COPY . .

# Default command: jalankan Playwright test
CMD ["npx", "playwright", "test"]
