# Gunakan Node.js sebagai base image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package.json dan package-lock.json
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Generate Prisma
RUN npx prisma generate

# Copy seluruh kode aplikasi
COPY . .

# Copy .env file
COPY .env .env

# Build aplikasi Next.js
RUN npm run build

# Set environment variables (jika diperlukan)
ENV NODE_ENV=production

# Expose port yang digunakan oleh Next.js
EXPOSE 3000

# Jalankan aplikasi
CMD ["npm", "start"]
