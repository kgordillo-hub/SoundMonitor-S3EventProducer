const { Kafka } = require('kafkajs')
const util = require('util');
const map = require('./s3-topic-map.json')

exports.handler = (event, context, callback) => {

    console.log("Reading options from event = \n", util.inspect(event, {depth: 7}));

    for (let item of map) {
        if (item.bucketName === event.Records[0].s3.bucket.name) {
            const fileName = event.Records[0].s3.object.key;
            console.log("Uploaded data : ",fileName);

            var kafkaEndpoints = process.env.KAFKA_ENDPOINTS.split(',');

            const kafka = new Kafka({
                brokers: kafkaEndpoints
            });

            const producer = kafka.producer()

            const run = async () => {
                await producer.connect()
                await producer.send({
                    topic: item.topicName,
                    messages: [
                        { value: fileName },
                    ],
                });
                await producer.disconnect()
            }
            run().catch(console.error);
            break;
        }
    }
}
