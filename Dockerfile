FROM ubuntu:latest
LABEL app="app to query data (BB8 and Focus prediction results) from MongoDB and show metrics."

RUN apt-get update
RUN apt-get install -y nodejs npm
RUN apt-get clean

COPY ./package.json src

RUN cd src && npm install

COPY . /src

WORKDIR /src/

CMD ["npm", "start"]

