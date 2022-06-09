FROM node:14.16.0 AS development
WORKDIR /usr/src/app
COPY ["package.json", "package-lock.json", "./"]
RUN npm ci
COPY . .
EXPOSE 3000
RUN npm start