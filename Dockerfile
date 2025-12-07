# Use Node.js LTS version
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy package files first (for better caching)
COPY app/package*.json ./

# Install dependencies
RUN npm install

# Expose default dev port
EXPOSE 5173

# Default command: interactive shell
CMD ["sh"]
