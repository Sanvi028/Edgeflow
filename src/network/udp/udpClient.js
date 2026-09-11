import dgram from 'node:dgram';

const client = dgram.createSocket('udp4');

const edgeId = 'edge-1';

setInterval(() => {

    const heartbeat = {
        type: 'heartbeat',
        edgeId: edgeId,
        timestamp: Date.now()
    };

    const message = Buffer.from(JSON.stringify(heartbeat));

    client.send(message, 6000, 'localhost', () => {
        console.log(`Heartbeat sent from ${edgeId}`);
    });

}, 2000);