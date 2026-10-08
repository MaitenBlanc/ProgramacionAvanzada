FROM node:20-alpine
WORKDIR /app
COPY libs /app/libs
COPY apps/crm-analytics-service /app/apps/crm-analytics-service
WORKDIR /app/apps/crm-analytics-service
RUN npm install
RUN npm run build
CMD ["npm", "run", "start:prod"]
