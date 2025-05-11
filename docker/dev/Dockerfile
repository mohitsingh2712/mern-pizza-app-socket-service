#base image of node js ideal verison for our code
FROM node:18

# set work directory /user/src/app
WORKDIR /user/src/app

# copy package.json and package-lock.json to /user/src/app
COPY package*.json ./

# install all pacakges
RUN npm install

#copy all source code to the container at /user/src/app
COPY . .

#expose the port the app will run on ... it is only for doumentation purpose
EXPOSE 5002

# command to run our app
CMD [ "npm","run","dev" ]