FROM node:slim
WORKDIR /slack-blot
COPY . .

# Install and build dependencies
RUN npm i
RUN npm run build



RUN chmod 775 /slack-blot/dist

ENTRYPOINT ["node", "/slack-blot/dist/index.js"]
