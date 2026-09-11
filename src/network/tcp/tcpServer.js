import net from 'node:net';

let clientId = 0;

const server = net.createServer((socket) => {

    clientId++;

    const currentClient = clientId;

    console.log(`Client ${currentClient} connected`);

    socket.on("data", (data) => {

        const message = data.toString();

        console.log(`Client ${currentClient}: ${message}`);

        socket.write(`Hello Client ${currentClient}`);
    });

    socket.on("end", () => {
        console.log(`Client ${currentClient} disconnected`);
    });
});

server.listen(5000, () => {
    console.log("TCP server started at port 5000");
});