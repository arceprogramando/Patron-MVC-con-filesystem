import express from "express";

const app = express()


app.get('/', (request, response) => {
    response.send("Bienvenida");
})

app.get('/users', (request, response) => {
    response.send("Usuarios");
})

const PORT = 8080

app.listen(PORT, () => console.log(`Se levanto el servidor por el puerto http://localhost:${PORT}`))