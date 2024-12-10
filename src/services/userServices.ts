// service layer ka kya kaam hota hai.

import { prismaClient } from "../lib/DB"
import {createHmac, randomBytes} from "node:crypto"
import JWT  from "jsonwebtoken"

const JWT_SECRET = '$ParasTuKarLegaSabKuchAkele'
export interface CreateUserPayload{
  firstName: string
  lastName?: string
  email: string
  password:string
}
export interface GteUserTokenPayload {
    email: string
    password:string
}
class UserService {
    private static generateHash(salt:string,password:string){
        const hashedPassword = createHmac('sha256', salt).update(password).digest('hex')
        return hashedPassword
    }
    public static createUser(playload:CreateUserPayload ){
        const { firstName, lastName, email, password} = playload
        // validation layer
        // if(!firstName ||!email ||!password){
        //     throw new Error("All fields are required")
        // }
        // if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)){
        //     throw new Error("Invalid email format")
        // }
        // // encryption layer
        // const salt = randomBytes(32).toString("hex")
        // const hashedPassword = createHmac('sha256', salt).update(password).digest('hex')
        // // logic to create a user
        // // database operations, validation, encryption, etc.
        //  return prismaClient.user.create({
        //      data: {
        //          firstName,
        //          lastName,
        //          email,
        //          password: hashedPassword,
        //          solt:salt,
        //      },
        //  })
        const salt = randomBytes(32).toString("hex")
        // const hashedPassword = createHmac('sha256', salt).update(password).digest('hex')
        const hashedPassword = UserService.generateHash(salt,password) ;
        // logic to create a user
        // database operations, validation, encryption, etc.
         return prismaClient.user.create({
             data: {
                 firstName,
                 lastName,
                 email,
                 password: hashedPassword,
                 solt:salt,
             },
         })

    }

    // user finding
    private static getUserByEmail(email:string){
        return prismaClient.user.findUnique({
            where: {
                email
            }
        })
    }
    // login process email and password ke through if both are right nd equal then they will singUP tab hum JWT token send kar denge bana kr agar nhi h match to invalide password bana denge 
    public static async getUserToken(playload:GteUserTokenPayload){
        const {email, password,} = playload;
        const user = await UserService.getUserByEmail(email);
        if(!user) throw new Error(`User ${email} not found`);

        const userSolt =  user.solt
        const userHashPassword = UserService.generateHash(userSolt,password)
        if(userHashPassword !== user.password)throw new Error(`incorrect password`)

       // generate Token
       const token = JWT.sign({id: user.id, email: user.email}, JWT_SECRET)
       return token;
    }
}

export default UserService; 