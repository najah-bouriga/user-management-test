FROM node:20.14.0

WORKDIR /app

RUN npm install -g @angular/cli@18.2.12

COPY package*.json ./

RUN rm -rf node_modules

RUN npm install

COPY . .

EXPOSE 4200
