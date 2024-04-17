# Use Node.js 16 as base image
FROM node:21

# Set working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

RUN npm cache clean --force

# Install dependencies
RUN npm install

# Install nodemon globally
RUN npm install -g nodemon

# Copy the rest of the application
COPY . .

# Expose the port your app runs on
EXPOSE 8004

# Command to run your application
CMD ["npm", "run", "start"]
