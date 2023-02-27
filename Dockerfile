FROM node:latest
RUN mkdir -p /root
WORKDIR /root
COPY package*.json ./
RUN touch .env
COPY .env ./
RUN npm install
COPY . .
EXPOSE 4040
CMD [ "npm", "start", "server.js" ]
