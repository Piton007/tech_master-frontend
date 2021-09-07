FROM mhart/alpine-node:11.11.0
WORKDIR /app
COPY . .

RUN ls -la
RUN node -v
RUN npm -v


RUN npm install
RUN npm audit fix
RUN npm run build

ENTRYPOINT ["sh", "-c", "HOST=0.0.0.0 PORT=${PORT} npm run start"]
