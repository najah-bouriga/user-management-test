# Use Node.js for development
FROM node:20.14.0
WORKDIR /app

RUN npm install -g @angular/cli@18.2.12

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 4200

CMD ["npm", "run", "start"]
