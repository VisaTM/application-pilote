FROM node:10.15

WORKDIR /app
# Install the node modules only
COPY package.json /app
RUN rm -rf ./node_modules && \
    npm install && \
    npm install -g serve && \
    npm cache verify

ENV NODE_ENV production

# Copy the local code source
COPY . /app

 
RUN npm run build

CMD ["serve", "-s", "build"]
