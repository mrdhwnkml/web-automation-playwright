FROM node:18

# Set working directory
WORKDIR /app

# Copy package & install dependencies
COPY package*.json ./
RUN npm install

# Install Playwright browsers
RUN npx playwright install --with-deps

# Copy semua file project (termasuk test)
COPY . .

# Default command: jalankan test & HTML report
CMD ["npx", "playwright", "test", "--reporter=html"]
