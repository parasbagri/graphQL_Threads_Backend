# Use the official Node.js image as base image
FROM node:18

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json (or yarn.lock) into the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the port your app will run on
EXPOSE 2002

# Run the app
CMD ["npm", "run", "start"]
