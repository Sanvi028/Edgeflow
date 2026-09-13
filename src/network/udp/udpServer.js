import dgram from 'node:dgram';

const server = dgram.createSocket('udp4');

const edges = {};

server.on('message', (message, rinfo) => {

    const data = JSON.parse(message.toString());

    if (data.type === 'heartbeat') {

        if (!edges[data.edgeId]) {
            edges[data.edgeId] = {
                lastSeen: Date.now(),
                status: 'healthy'
            };
        } else {
            edges[data.edgeId].lastSeen = Date.now();
            edges[data.edgeId].status = 'healthy';
        }

        console.log(`Heartbeat received from ${data.edgeId}`);
    }
});

setInterval(() => {

    const now = Date.now();

    for (const edgeId in edges) {

        const edge = edges[edgeId];

        if (now - edge.lastSeen > 5000) {
            edge.status = 'unhealthy';
        } else {
            edge.status = 'healthy';
        }

        console.log(`${edgeId}: ${edge.status}`);
    }

}, 2000);

server.bind(6000, () => {
    console.log('UDP monitoring server started on port 6000');
});