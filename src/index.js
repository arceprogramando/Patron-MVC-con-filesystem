import express from 'express' //Es Modules
import userRouter from '../routers/user.router.js'
import petsRouter from '../routers/pets.router.js'

let logged = true
const app = express()

// Middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))//Solo es necesario cuando los datos se envian por formulario
app.use('/contenido', express.static('public'))

app.get('/', (req, res) => {
    res.send('Bienvenida')
})
// Middleware
app.use(function (req, res, next) {
    console.log('Validando login de usuario que hizo la consulta')
    if (logged) {
        next()
    } else {
        res.send('Error no estas logeado')
    }
    next()
})

app.use('/users', userRouter);
app.use('/pets', petsRouter)

const PORT = 8080

app.listen(PORT, () => console.log(`Levantando el servidor en http://localhost:${PORT}`))
