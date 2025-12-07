# Use Node.js LTS version
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy package files
COPY app/package*.json ./

# Install dependencies
RUN npm ci

# Copy application source
COPY app/ .

# Expose Vite dev server port (default 5173)
EXPOSE 5173

# Start the development server
CMD ["bash"]

