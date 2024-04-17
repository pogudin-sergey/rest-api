FROM node:20

WORKDIR /var/www/server

ADD . .

RUN npm ci
RUN npm run build

EXPOSE 9080
EXPOSE 8080

ENTRYPOINT ["npm", "run"]
CMD ["dev"]
