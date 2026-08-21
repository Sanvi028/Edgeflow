import net from 'node:net'

const server  = net.createServer((socket)=>
    console.log("Client connected")
)

server.listen(5000,()=>{
    console.log("TCP server started at port 5000")
});

