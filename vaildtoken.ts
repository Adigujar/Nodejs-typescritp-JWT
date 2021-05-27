import { NextFunction, Request, Response } from 'express';

const jwt = require('jsonwebtoken')
const dotenv = require("dotenv");

dotenv.config();


const auth =  (req: Request, res: Response, next: NextFunction)=>{
        const token = req.header('auth-token')
        if(!token) return res.status(400).send(" Access Deined")    
        
        try {
            const verfied = jwt.verify(token,process.env.Token_secret)
            next()
        } catch (err) {
            res.status(400).send("invaild token")
            
        }

}

export default  auth ;