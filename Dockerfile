FROM node:24-alpine AS build
WORKDIR /react-app

ARG REACT_APP_BE_API_URL=http://localhost:3008
ENV REACT_APP_BE_API_URL=$REACT_APP_BE_API_URL

COPY package*.json ./
RUN npm config set legacy-peer-deps true && npm ci

# Move it here so npm ci installs everything, but React builds optimized code
ENV NODE_ENV=production 
COPY . .
RUN npm run build

# Production stage
FROM nginx:stable-alpine AS production
COPY --from=build /react-app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]