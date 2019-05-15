FROM node:current-alpine

WORKDIR /gary
COPY . .
RUN npm install
CMD ["node", "gary.js"]
