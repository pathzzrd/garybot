FROM node:12.2.0-alpine
WORKDIR /gary
COPY package* ./
RUN npm install
COPY . .
CMD ["node", "bot.js"]
