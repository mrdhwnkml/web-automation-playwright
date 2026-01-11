FROM node:18

# Set working directory
WORKDIR /app

# Copy package & install dependencies
COPY package*.json ./
RUN npm install

# Install Playwright browsers
RUN npx playwright install --with-deps

# Install Mochawesome tools
RUN npm install --save-dev mochawesome mochawesome-merge mochawesome-report-generator

# Copy semua file project
COPY . .

# Buat folder report
RUN mkdir -p /app/playwright-report/json /app/playwright-report/html

# Default command: jalankan test & generate HTML Mochawesome
CMD ["sh", "-c", "npx playwright test && npx mochawesome-merge /app/playwright-report/json/*.json > /app/playwright-report/json/merged.json && npx marge /app/playwright-report/json/merged.json -f final-report -o /app/playwright-report/html"]
