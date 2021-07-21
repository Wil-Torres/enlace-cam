const WebSocket = require('wss');

const wss = new WebSocket.Server({
    host: '192.9.201.163',
    port:4300}, () => {
    console.log('Signalling server is now listening port 4300');
});

/*Siempre estara escuchando */
wss.broadcast = (ws, data) => {
    wss.clients.forEach(client=> {
        if(client !== ws && client.readyState === WebSocket.OPEN){
            client.send(data);
        }
        
    });
}

/* cuando establezca conexion */
wss.on('connection', ws => {
    console.log(`client connected. total connected clients: ${wss.clients.size}`);

    ws.on('message', message => {
        console.log(message + "\n\n")
        wss.broadcast(ws,message);
    });
    ws.on('close', ws => {
        console.log(`Client disconnected. Total connected clients: ${wss.clients.size}`);
    });
    ws.on('error', error => {
        console.log(`Client error. Total connected clientes: ${wss.clients.size}`)
    })
})