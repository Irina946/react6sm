FROM node:20

ENV DOTNET_URLS=http://+:5000

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 5173

CMD ["npm", "run", "dev"]
