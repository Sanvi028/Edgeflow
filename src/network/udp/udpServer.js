import dgram from 'node:dgram';

const server = dgram.createSocket('udp4');

const edges = {};

server.on('message', (message, rinfo) => {

    const data = JSON.parse(message.toString());

    if (data.type === 'heartbeat') {

        edges[data.edgeId] = Date.now();

        console.log(`Heartbeat received from ${data.edgeId}`);
    }
});

server.bind(6000, () => {
    console.log('UDP monitoring server started on port 6000');
});