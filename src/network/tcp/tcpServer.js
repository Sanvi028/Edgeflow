import net from 'node:net'

const server  = net.createServer((socket)=>{
    console.log("Client connected")

    socket.on("data",(data)=>{
        const message = data.toString();

        console.log("Received:", message);

        socket.write("Hello Client");

    })

  socket.on("end", () => {
        console.log("Client disconnected");
    });
});

server.listen(5000,()=>{
    console.log("TCP server started at port 5000")
})

