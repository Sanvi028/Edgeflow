import net from 'node:net'

const client = net.createConnection(5000,()=>{
    console.log("Connected to server")

    client.write("Hello Server\n")
})

client.on("data", (data) => {
    console.log("Server:", data.toString());

    client.end();
});

client.on("end", () => {
    console.log("Connection closed");
});