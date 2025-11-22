# Stage 1: Build Angular app
FROM node:20 AS angular-build

WORKDIR /app
COPY . .

RUN npm install
RUN npm run build -- --configuration production

# Stage 2: Serve Angular with Nginx
FROM nginx:alpine

# Remove default nginx website
RUN rm -rf /usr/share/nginx/html/*

# Copy Angular build to Nginx html folder
COPY --from=angular-build /app/dist/clinic-frontend/browser/ /usr/share/nginx/html

# Optional: copy custom nginx config for SPA routing
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 8779
CMD ["nginx", "-g", "daemon off;"]
