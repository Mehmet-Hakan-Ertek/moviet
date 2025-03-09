FROM node:latest AS Production
LABEL authors="hakan.ertek"
ENV NODE_ENV=production
WORKDIR /Desktop/insider/moviet_new/moviet
COPY package.json .
COPY package-lock.json .
RUN npm install
COPY . .
RUN npm run build
CMD ["sh", "-c", "npm run start:production"]
ENTRYPOINT ["top", "-b"]
