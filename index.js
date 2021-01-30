const { Kafka } = require('kafkajs')
const util = require('util');

exports.handler = (event, context, callback) => {

    console.log("Reading options from event:\n", util.inspect(event, {depth: 7}));
    const audioName = event.Records[0].s3.object.key;
    console.log("Uploaded New audio : ",audioName);

    const kafka = new Kafka({
        brokers: ['200.69.103.29:26240']
    });

    const producer = kafka.producer()

    const run = async () => {
        await producer.connect()
        await producer.send({
            topic: 'audio-upload-event',
            messages: [
                { value: audioName },
            ],
        });
        await producer.disconnect()
    }
    run().catch(console.error);
}
