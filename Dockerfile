# Fetching the latest node image on alpine linux
FROM node:23.5.0-alpine3.21 AS development

# Declaring env
ENV NODE_ENV development

# Setting up the work directory
WORKDIR /react-app

# Installing dependencies
COPY ./package*.json /react-app

RUN npm config set legacy-peer-deps true 
RUN npm install

# Copying all the files in our project
COPY . .

# Starting our application
CMD ["npm","start"]