FROM node:20 as builder
WORKDIR /app

COPY ./ /app/

RUN npm install
RUN npm run build

FROM nginx:stable

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/build /usr/share/nginx/html

EXPOSE 80