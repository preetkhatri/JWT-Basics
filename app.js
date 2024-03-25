require('dotenv').config()
require('express-async-errors')

const express = require('express')
const app = express()

const mainRouter = require('./routes/main')
const errorHandlerMiddleware = require('./errors/error-handler');
const notFoundMiddleware = require('./errors/not-found');

app.use(express.static('./public'))
app.use(express.json())

app.use('/api/v1', mainRouter)

app.use(errorHandlerMiddleware)
app.use(notFoundMiddleware)

const port = process.env.PORT || 3000

const start = async ()=> {
    try {
        app.listen(port, console.log(`Server is listening to ${port}...`))
    } catch (error) {
        console.log(error);
    }
}

start()

