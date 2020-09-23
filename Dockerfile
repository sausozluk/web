FROM node:14.5.0
ENV NPM_CONFIG_LOGLEVEL warn
COPY . /app
WORKDIR /app/src
RUN ["npm", "install", "-g", "bower"]
RUN ["npm", "install", "-g", "gulp-cli"]
RUN ["npm", "install"]
RUN ["bower", "install", "--allow-root"]
RUN ["gulp", "build"]
