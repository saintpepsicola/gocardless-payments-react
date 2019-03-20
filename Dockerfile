FROM node:8.15-alpine AS builder

ARG PORT=3060
EXPOSE ${PORT}

WORKDIR /app

COPY package.json /app

# Creating tar of productions dependencies
RUN npm install --production && cp -rp ./node_modules /tmp/node_modules

# Installing all dependencies
RUN npm install

# Copying application code
COPY . /app

# Running tests
RUN npm test

####################

FROM node AS runner

ARG PORT=3060
EXPOSE ${PORT}

WORKDIR /app

# Adding production dependencies to image
COPY --from=builder /tmp/node_modules /app/node_modules

# Copying application code
COPY . /app

CMD ["npm", "start"]
