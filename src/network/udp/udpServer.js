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

setInterval(() => {

    const now = Date.now();

    for (const edgeId in edges) {

        const lastSeen = edges[edgeId];

        if (now - lastSeen > 5000) {
            console.log(`${edgeId} is UNHEALTHY`);
        } else {
            console.log(`${edgeId} is HEALTHY`);
        }
    }

}, 2000);

server.bind(6000, () => {
    console.log('UDP monitoring server started on port 6000');
});