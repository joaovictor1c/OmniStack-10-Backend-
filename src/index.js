const express = require ('express')
const mongoose = require ('mongoose')
const cors = require ('cors')
const routes = require('./routes')
const http = require('http')
const {setupWebsocket} = require('./websocket')


const app = express()
const server = http.Server(app)

setupWebsocket(server)

mongoose.connect('mongodb+srv://joaovictor1024:14041949@cluster0-e3to2.mongodb.net/DevRadar?retryWrites=true&w=majority',{
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
})
app.use(cors())
app.use(express.json())
app.use(routes)
//Query Params: GET - request.query(filtros, ordenação, paginação...)
//Route Params: PUT e DELETE - request.params(Identificar um recurso na alteração ou remoção)
//Body: POST e PUT - (Dados para criação ou alteração de um registro)

server.listen(3333)