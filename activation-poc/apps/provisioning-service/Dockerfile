FROM node:20-alpine
WORKDIR /app
COPY libs /app/libs
COPY apps/provisioning-service /app/apps/provisioning-service
WORKDIR /app/apps/provisioning-service
RUN npm install
RUN npm run build
CMD ["npm", "run", "start:prod"]
