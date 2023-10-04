import {quotes,users} from './fakedb.js'
import {randomBytes} from 'crypto'
import mongoose from 'mongoose'
import User from "./models/User.js"
import Quote from "./models/Quotes.js"
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { JWT_SECRET } from './config.js';

const resolvers = {
    Query:{
      // users:()=>users,     //fakedb
       users:async()=>await User.find({}),
      // user:(_,{_id})=>users.find(user=>user._id == _id),
       user:async(_, {_id})=>await User.findOne({_id}),
      // quotes:()=>quotes,
       quotes:async()=>await Quote.find({}).populate("by", "_id firstName"),
      // iquote:(_,{by})=>quotes.filter(quote=>quote.by == by)
       iquote:async(_,{by})=>await Quote.find({by}),
       myprofile:async (_,args,{userId})=>{
        if(!userId) throw new Error("You must be logged in")
        return await User.findOne({_id:userId})
       }
    },
    User:{
       // quotes:(ur)=>quotes.filter(quote=>quote.by == ur._id)
       quotes: async(ur)=>await Quote.find({by:ur._id})
    },
    Mutation:{
        signupUser:async (_,{userNew})=>{
          const user = await User.findOne({email:userNew.email})
          if(user){
              throw new Error("User already exists with that email")
          }
         const hashedPassword =  await bcrypt.hash(userNew.password,12)

         const newUser =  new User({
             ...userNew,
             password:hashedPassword
         })
        return await newUser.save()
        },
        signinUser:async (_,{userSignin})=>{
         const user = await User.findOne({email:userSignin.email})
         if(!user){
             throw new Error("User dosent exists with that email")
         }
         const doMatch =await bcrypt.compare(userSignin.password,user.password)
         if(!doMatch){
             throw new Error("email or password is invalid")
         }
         const token = jwt.sign({userId:user._id},process.env.JWT_SECRET)
         return {token}
        },
        createQuote:async (_,{name},{userId})=>{
            if(!userId) throw new Error("You must be logged in")
            const newQuote = new Quote({
                name,
                by:userId
            })
            await newQuote.save()
            return "Quote saved successfully"
         },
        deleteQuote: async (_, { _id }, context) => {
            const deletedQuote = await Quote.findByIdAndDelete(_id);
            if (!deletedQuote) {
              throw new Error('Error deleting quote');
            }
            return deletedQuote;
          },
        updateQuote: async (_, { _id, name }) => {
            const updatedQuote = await Quote.findByIdAndUpdate(_id, { name }, { new: true });
            if (!updatedQuote) {
              throw new Error('Error updating quote');
            }
            return updatedQuote;
          }
    }
}

export default resolvers