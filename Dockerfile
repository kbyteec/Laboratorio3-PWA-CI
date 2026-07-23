FROM nginx:alpine
COPY dist/lab-pwa/browser /usr/share/nginx/html
EXPOSE 80
