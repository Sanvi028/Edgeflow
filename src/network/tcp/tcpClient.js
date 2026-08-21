import net from 'node:net'

const client = net.createConnection(5000,()=>{
    console.log("Client is listening")
})

