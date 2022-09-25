FROM node:16

# Create app directory
WORKDIR /usr/src/app
EXPOSE 1200

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
# COPY package*.json ./
RUN mkdir frontend
RUN mkdir backend
RUN mkdir db

COPY db ./db
COPY frontend ./frontend
RUN cd frontend && npm install && npm run build

# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
COPY backend ./backend

RUN cd backend && npm install && npm run build

CMD [ "node","backend/build/index.js"]