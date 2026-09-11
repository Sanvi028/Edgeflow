import net from 'node:net';

let clientId = 0;

const server = net.createServer((socket) => {
    let buffer = "";

    clientId++;

    const currentClient = clientId;

    console.log(`Client ${currentClient} connected`);

    socket.on("data", (data) => {
    buffer += data.toString();

    let messages = buffer.split("\n");

    buffer = messages.pop();

    for (const message of messages) {
        console.log(`Client ${currentClient}: ${message}`);

        socket.write(`Hello Client ${currentClient}\n`);
    }
}); 

    socket.on("end", () => {
        console.log(`Client ${currentClient} disconnected`);
    });
});

server.listen(5000, () => {
    console.log("TCP server started at port 5000");
});