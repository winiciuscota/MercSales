FROM nginx:stable-alpine
RUN apk update --no-cache
RUN apk upgrade --no-cache
RUN apk add --no-cache curl
COPY ./nginx.conf /etc/nginx/nginx.conf