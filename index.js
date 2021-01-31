const { Kafka } = require('kafkajs')
const util = require('util');

exports.handler = (event, context, callback) => {

    console.log("Reading options from event:\n", util.inspect(event, {depth: 7}));
    const audioName = event.Records[0].s3.object.key;
    console.log("Uploaded New audio : ",audioName);

    var audioUploadTopic = process.env.TOPIC;
    var kafkaEndpoints = process.env.KAFKA_ENDPOINTS.split(',');

    const kafka = new Kafka({
        brokers: kafkaEndpoints
    });

    const producer = kafka.producer()

    const run = async () => {
        await producer.connect()
        await producer.send({
            topic: audioUploadTopic,
            messages: [
                { value: audioName },
            ],
        });
        await producer.disconnect()
    }
    run().catch(console.error);
}
