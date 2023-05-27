import { Router } from 'express'

let pets = []

const router = Router()

router.get('/', (req, res) => {
    res.send({ pets })

})

router.post('/', (req, res) => {
    const pet = req.body;
    pets.push(pet)
    res.send({ status: 'sucess' })
})

export default router