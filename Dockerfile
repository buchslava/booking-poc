FROM node:10.15.0
RUN apt-get update
RUN apt-get install -y mc git
RUN mkdir -p /home/booking-poc
WORKDIR /home/booking-poc
COPY ./package.json ./package.json
RUN npm i
COPY ./ ./
ENV PORT 9090
RUN echo $PORT
CMD ["node", "./index.js"]
