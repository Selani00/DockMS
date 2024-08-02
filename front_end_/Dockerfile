FROM node:latest

# create a directory called `app` in the container and set it as the working directory.
WORKDIR /app

# Copying the package.json file from the root of the project to the `app` directory in the container.
COPY package*.json .

# Installing all the dependencies listed in the package.json file. 
RUN npm install

# Copying all the files from the root of the project to the `app` directory in the container.
COPY . .

# Container will listen on port 3000.
EXPOSE 3000

# Run the `npm start` command when the container is started.
CMD ["npm", "start"]