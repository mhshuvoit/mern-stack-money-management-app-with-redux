const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const mongoose = require('mongoose')
const passport = require('passport')
const path = require('path')
const config = require("./config/key")

const app = express()
app.use(morgan('dev'))
app.use(cors())
app.use(express.json())
app.use(passport.initialize())

require('./passport')(passport)

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'))
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })
}

mongoose.connect(config.mongoURI, { useNewUrlParser: true, useCreateIndex: true }
)
const db = mongoose.connection
db.on('error', (err) => {
    console.log(err)
})
db.once("open", () => {
    console.log("Database connect Estabished")
})

const PORT = process.env.PORT || 4000
app.listen(PORT, () => {
    console.log(`Running on port ${PORT}`)
})

app.use('/api/users', require('./routers/userRoute'))
app.use('/api/transactions', require('./routers/transactionRoute'))