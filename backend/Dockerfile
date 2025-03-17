FROM node:20
WORKDIR /app
COPY package*.json ./
RUN npm install dotenv pg
COPY . .
EXPOSE 3000
CMD ["node", "src/server.js"]
