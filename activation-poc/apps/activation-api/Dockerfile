FROM node:20-alpine
WORKDIR /app
COPY libs /app/libs
COPY apps/activation-api /app/apps/activation-api
WORKDIR /app/apps/activation-api
RUN npm install
RUN npm run build
CMD ["npm", "run", "start:prod"]
