FROM node:12.2.0-alpine
WORKDIR /gary
COPY package* ./
RUN npm install
RUN apk add bash py-pip python3 --update --no-cache && \
    pip install markovify
COPY . .
CMD ["node", "bot.js"]
