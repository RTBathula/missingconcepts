# Grab the image
FROM node:12.11.1-alpine
RUN apk add --no-cache bash && npm config set unsafe-perm true

# Copy the entire project, install and build 
COPY . /usr/src/missingconcepts
WORKDIR /usr/src/missingconcepts
RUN npm install && npm run build

# Prepare for run
RUN sed -i 's/\r$//' ./entrypoint.sh && chmod +x ./entrypoint.sh

EXPOSE 3000
CMD ["./entrypoint.sh"]
