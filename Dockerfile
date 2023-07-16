FROM node:slim

COPY . .

# Install dependencies
RUN npm i
RUN npm run build
RUN ls -la
# Run `node /index.js`
ENTRYPOINT ["node", "./dist/index.js"]
