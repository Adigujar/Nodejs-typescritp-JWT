import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';


const bcryptjs = require('bcryptjs')
const User = require('./model')
const jwt = require('jsonwebtoken')
const dotenv = require("dotenv");

dotenv.config();



const register =  async (req: Request, res: Response, next: NextFunction) => {

    const noEmailthere= await User.findOne({email:req.body.email})
    if(noEmailthere) return res.status(400).send("user already resigtered")

    const salt = await bcryptjs.genSalt(10)
    const hash = await bcryptjs.hash(req.body.password,salt)
    const user = new User({
        username: req.body.username,
        email: req.body.email,
        password:hash
    })
    try {
        const saveduser = await user.save()
        res.send(saveduser)
    } catch (err) {
        res.status(400).send(err)
    }
  
};

const login = async (req: Request, res: Response, next: NextFunction) => {
    const user= await User.findOne({email:req.body.email})
    if(!user) return res.status(400).send("user does not exist")
    const vaildPass = await bcryptjs.compare(req.body.password,user.password)
    if(!vaildPass) return res.status(400).send("Invalid password")
    const token = jwt.sign({_id: user._id},process.env.Token_secret)
    res.header('auth-token',token).send( token)
}

    

const getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
    const users = await User.find({});
    const username = []
    for(let i=0;i<users.length;i++){
        username.push(users[i].username)
    }
    res.send(username)
};

export default {  register, login ,getAllUsers};

