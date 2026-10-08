FROM node:20-alpine
WORKDIR /app
COPY libs /app/libs
COPY apps/notification-service /app/apps/notification-service
WORKDIR /app/apps/notification-service
RUN npm install
RUN npm run build
CMD ["npm", "run", "start:prod"]
