const express = require ('express')
require('dotenv').config()
const cors = require('cors');
const mainRouter = require('./src/api/routes/main_routes');
const { connectDB } = require('./src/config/db');


const app = express();

connectDB()

app.use(express.json())
app.use(cors())


app.use('/api/v1', mainRouter)


app.listen(3000, () => {
    console.log('Servidor levantado en http://localhost:3000');
})