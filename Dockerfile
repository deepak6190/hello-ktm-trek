FROM node:20-alpine
WORKDIR /app
COPY hello-ktm-trek-api/package*.json ./
RUN npm ci
COPY hello-ktm-trek-api/ .
RUN npm run build
EXPOSE 5001
CMD ["npm", "start"]
