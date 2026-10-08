FROM node:20-alpine
WORKDIR /app
COPY libs /app/libs
COPY apps/billing-service /app/apps/billing-service
WORKDIR /app/apps/billing-service
RUN npm install
RUN npm run build
CMD ["npm", "run", "start:prod"]
