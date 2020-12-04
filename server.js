const express = require('express')
const path = require('path')

const app = express()

app.listen(3000)
app.use(express.static('public'))


app.get('/', (req, res)=>{
    res.sendFile(path.join(__dirname, 'public', 'index.html'))
})

app.get('/questions', (req, res)=>{
    if (!req.xhr){
        res.status(401).send({message: 'Access Denied!'})
        return
    }
    res.sendFile(path.join(__dirname, 'resources', 'questions.json'))
})