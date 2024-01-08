# Use an official Node.js runtime as the base image
FROM node:14 AS build

# Set the working directory in the container
WORKDIR /app

# Copy the package.json and package-lock.json files to the container
COPY package*.json ./

# Install app dependencies
RUN npm install

# Copy the entire application to the container
COPY . .

# Build the production version of the app
RUN npm run build

# Use an official Node.js runtime as the base image for serving
FROM node:14 AS serve

# Set the working directory in the container
WORKDIR /app

# Install the 'serve' package globally
RUN npm install -g serve

# Copy the built React app from the previous stage to the container
COPY --from=build /app/build /app

# Expose port 80, which is the default port for HTTP traffic
EXPOSE 80

# Start the application using the 'serve' package
CMD ["serve", "-s", "build", "-l", "80"]

