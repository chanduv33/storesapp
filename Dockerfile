# stage 1
FROM node:11.15.0-alpine as build-step
WORKDIR /app
COPY package.json ./
RUN npm install
COPY . .
RUN npm run build --prod --base-href=storesapp

# stage 2
FROM nginx:alpine
COPY --from=build-step /app/dist/storesmanagementsystem /usr/share/nginx/html