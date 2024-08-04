# Use the official Node.js image as the base image
FROM node:14

# Set the working directory
WORKDIR /app
RUN apt-get update

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the port that your app runs on
EXPOSE 3000

# Command to run the application
CMD ["node", "index.js"]

# FROM debian:bullseye as builder

# ENV PATH=/usr/local/node/bin:$PATH
# ARG NODE_VERSION=16.15.1

# RUN apt-get update; apt install -y curl python-is-python3 pkg-config build-essential && \
#     curl -sL https://github.com/nodenv/node-build/archive/master.tar.gz | tar xz -C /tmp/ && \
#     /tmp/node-build-master/bin/node-build "${NODE_VERSION}" /usr/local/node && \
# rm -rf /tmp/node-build-master

# RUN mkdir /app
# WORKDIR /app

# COPY ./package*.json .

# RUN npm install

# COPY . .

# FROM debian:bullseye-slim

# LABEL fly_launch_runtime="nodejs"

# COPY --from=builder /usr/local/node /usr/local/node
# COPY --from=builder /app /app
# COPY release.sh /release.sh

# WORKDIR /app
# ENV NODE_ENV production
# ENV PATH /usr/local/node/bin:$PATH

# CMD [ "npm", "run", "start" ]