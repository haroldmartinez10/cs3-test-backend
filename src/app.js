import express from 'express';
import cors from 'cors';
import config from './config.js';
import morgan from 'morgan';

import todoRouter from './routes/todo.routes.js'


const app = express()

app.use(cors());
app.use(express.json())
app.use(morgan('dev'))

app.set('port', config.PORT)

app.use('/api/todo', todoRouter)

app.get('/', (_, res) => {
  res.json({
    message: 'Hello World'
  })
})

export default app
