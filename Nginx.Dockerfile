FROM nginx:1.17.4-alpine

RUN rm /etc/nginx/conf.d/default.conf
COPY ./nginx/nginx.conf /etc/nginx/conf.d
COPY ./frontend/dist/ /www/mintally