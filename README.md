# cmpe273-yelp-app-with-Kafka
Lab2 Assignment for CMPE273 - Yelp App prototype - Diner's Choice

Download Apache Kafka (kafka_2.11-2.2.1.tgz ) from https://kafka.apache.org/downloads

Navigate to the downloaded kafka folder in the terminal and run `bin/zookeeper-server-start.sh config/zookeeper.properties` to start zookeeper.
Navigate to the downloaded kafka folder in the terminal and run `bin/kafka-server-start.sh config/server.properties` to start kafka.

Add the createTopics.sh file to this folder and run `./createTopics.sh` to create kafka topics.

Use `npm i` to install frontend, kafka-backend and backend dependencies.
Navigate to the Frontend folder in the terminal and use `npm start` to run frontend.
Navigate to the kafka-backend folder in the terminal and use `npm start` to run kafka-backend.
Navigate to Backend folder and use `node index.js` to run backend.

Navigate to localhost:3000 to view the application
