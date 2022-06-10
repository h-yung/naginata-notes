console.log('Server is here')

if (process.env.NODE_DEV !== 'production'){
    const dotenv = require('dotenv')
    dotenv.config({path: 'proc.env'}) //add env path
}
const express = require('express')
const app = express();
const MongoClient = require('mongodb').MongoClient

MongoClient.connect(process.env.DATABASE_URL, { 
    useUnifiedTopology: true 
})
    .then(client => {
        console.log('connected to database')
        const db = client.db('bunch-of-things')  //database name
        const thingGroup = db.collection('things') //collection name

        // express to find and serve public directory contents
        app.use(express.static('public'))
        // set engine ahead of everything else
        app.set('view engine', 'ejs')
        // 'middleware'
        app.use(express.json());
        app.use(express.urlencoded({ extended: true }))

        app.get ('/', (req,res)=>{
            // res.send('HELLO!')
            thingGroup.find().toArray()
                .then(results => {
                    res.render('index.ejs', { info: results }) //var in ejs is info
                })
        })
        app.post('/thing', (req,res)=>{
            console.log('A thing was done!')
            thingGroup.insertOne(req.body)
                .then(result => {
                    // console.log(result)
                    res.redirect('/') //you don't want to reload persistently at /thing either - it resubs
                })
        })
        app.listen(process.env.PORT || 3000, ()=> {
            console.log('Listening on 3000 or her port')
        })
    })
    .catch(err => console.log(err))

