FROM node:18

# Install dependencies
WORKDIR /app
COPY package*.json ./
RUN npm install

# Install Playwright browsers
RUN npx playwright install --with-deps

COPY . .

# Default CMD hanya untuk test
CMD ["npx", "playwright", "test"]
