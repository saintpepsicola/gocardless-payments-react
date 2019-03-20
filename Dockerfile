FROM node:8.15-alpine AS builder

ARG PORT
EXPOSE ${PORT}

ARG ENV

WORKDIR /app

COPY package.json ./

# Creating tar of productions dependencies
RUN npm install --production && cp -rp ./node_modules /tmp/node_modules

# Installing all dependencies
RUN npm install

# Copying application code
COPY . ./

COPY ${ENV} .env

# Running tests
RUN CI=true npm test

####################

FROM node:8.15-alpine AS runner

ARG PORT
EXPOSE ${PORT}

ARG ENV

WORKDIR /app

# Adding production dependencies to image
COPY --from=builder /tmp/node_modules ./node_modules

# Copying application code
COPY . ./

COPY ${ENV} .env

CMD ["npm", "start"]
