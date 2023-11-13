import express, { request } from "express"
import cors from "cors"
import 'dotenv/config'
import { MongoClient, ObjectId } from "mongodb"
import bcrypt from "bcrypt"

const client = new MongoClient(process.env.MONGO_URI as string)
const db = client.db('dinos-store')
const users = db.collection('users')




const app = express()
app.use(cors())
app.use(express.json())
//use packages^^

//listen on port
app.listen(process.env.PORT, () => console.log('api running here test '))


//create a get end point 
app.get('/:_id', async (req, res) => {
    const userDeleted = await users.find().toArray()
    res.send(userDeleted)
})
// 5.create endpoint to add users 
app.post('/', async (req, res) => {
    const userAdded = await users.insertOne(req.body)
    res.send(userAdded)

})
app.delete('/:email', async (req, res) => {
    const clean_id= new ObjectId
   const userAdded= 
   await bcrypt.hash(req.body.password, 10)
   const userDeleted = await users.findOneAndDelete({ _id: clean_id })
   console.log('req.params ->', req.params)
   const userEmail = req.body.password 
    res.send(userDeleted)
})
//6.create delete endpoint by _id with params

//7. create a path endpoint by _id with params 
app.patch('/:_id', async (req, res) => {
const clean_id = new ObjectId(req.params._id)    
const itemUpdated = await users.findOneAndUpdate({_id: clean_id}, {$set: req.body})
    res.send(itemUpdated)

})

//8. login endpoint 
app.post('/login', async (req, res) => {
   const userPassword= req.body.password
const foundUser = await users.findOne({email: request.body.email})
if (foundUser) {
    const passInDb = foundUser?.password
    const result= await bcrypt.compare(userPassword, passInDb)
    console.log('result ->', result) // true / false 
    res.send(foundUser)
} else {
    res.json('user not found')
}

})