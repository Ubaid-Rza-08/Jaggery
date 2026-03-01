FROM node:20
WORKDIR /app

# Install dependencies first (cache optimization)
COPY package*.json ./
RUN npm install

# Copy source code
COPY . .

# Expose Vite dev server port
EXPOSE 5173

# Run in dev mode
CMD ["npm", "run", "dev", "--", "--host","0.0.0.0"]
