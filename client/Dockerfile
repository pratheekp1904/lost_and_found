# client/Dockerfile

FROM node:18
WORKDIR /app
COPY client/package.json .
COPY client/package-lock.json .
RUN npm install
COPY client/ .
RUN npm run build
RUN npm install -g serve
CMD ["serve", "-s", "build", "-l", "3000"]
