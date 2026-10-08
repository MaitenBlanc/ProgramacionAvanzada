FROM node:20-alpine
WORKDIR /app
COPY apps/demo-ui /app/apps/demo-ui
WORKDIR /app/apps/demo-ui
RUN npm install
RUN npm run build
CMD ["npm", "run", "preview", "--", "--host", "0.0.0.0", "--port", "5173"]
