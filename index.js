import {ApolloServer,gql} from 'apollo-server-express'
import {ApolloServerPluginLandingPageGraphQLPlayground,
  ApolloServerPluginDrainHttpServer,
  ApolloServerPluginLandingPageDisabled} from 'apollo-server-core'
import {quotes,users} from './fakedb.js'
import typeDefs from './schemasGql.js'
import mongoose from 'mongoose'
//import MONGO_URI from './config.js'
//import {JWT_SECRET} from './config.js'
import jwt from 'jsonwebtoken';
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv'
import bodyParser from 'body-parser';
import http from 'http';
import path from 'path';
const app = express();
const port = process.env.PORT || 4000;
const httpServer = http.createServer(app);
if(process.env.NODE_ENV !=="production"){
  dotenv.config()
}
app.use(express.json())
app.use(cors())
app.use(cors());
app.use(bodyParser.json());

mongoose.connect(process.env.MONGO_URI,{
  useNewUrlParser: true,
  useUnifiedTopology: true
})

mongoose.connection.on('connected', ()=>{
  console.log('Connected to mongodb')
})
mongoose.connection.on('error', (err)=>{
  console.log('error in connecting', err)
})
//import models here
import './models/Quotes.js'
import './models/User.js'
import resolvers from './resolvers.js'
//middleware
const  context=({req})=>{
 const {authorization} = req.headers;
  if(authorization){
   const {userId} = jwt.verify(authorization,process.env.JWT_SECRET);
   return {userId}
  }
}
const server = new ApolloServer({ 
    typeDefs, 
    resolvers,
   context,
    plugins:[
        ApolloServerPluginDrainHttpServer({ httpServer }),
        process.env.NODE_ENV !=="production" ? 
        ApolloServerPluginLandingPageGraphQLPlayground() :
        ApolloServerPluginLandingPageDisabled()
    ]
});
//const server = new ApolloServer({ typeDefs, resolvers });
if(process.env.NODE_ENV=="production"){
  app.use(express.static('client/build'))
  app.get("*",(req,res)=>{
      res.sendFile(path.resolve(__dirname,'client','build','index.html'))
  })
}
await server.start();
server.applyMiddleware({ app, path: '/api' });

httpServer.listen({port},()=>{
  console.log(`🚀  Server ready at 4000 ${server.graphqlPath}`);
})