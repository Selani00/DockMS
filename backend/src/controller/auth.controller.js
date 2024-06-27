import { Router } from "express";
import handler from 'express-async-handler';
import  UserModel  from "../models/user.model.js";
import bcrypt from 'bcrypt';
const PASSWORD_HASH_SALT_ROUNDS = 10;
const router = Router()
        
router.post('/login',handler(async (req,res) => {
    const { email, password} = req.body;

    try{  
        const user = await UserModel.findOne({email});

        if (user && (await bcrypt.compare(password, user.password))){
            res.send(user);      
        }else{
            res.status(BAD_REQUEST).send("User name or password is incorrect");
            
        }
    }catch(error){
        res.status(BAD_REQUEST).send("Login failed!");
    }
}));


router.post(
    '/register',
    handler(async (req, res) => {
        const {email, password} = req.body;

        const user = await UserModel.findOne({email});

        if (user) {
            res.status(BAD_REQUEST).send('User name already taken, please enter another!');
            return;
        }

        const hashedPassword = await bcrypt.hash(
            password,
            PASSWORD_HASH_SALT_ROUNDS
        );

        const newUser = {
            id: (await generateID()).toString(),
           
            email,
            password: hashedPassword,
        };

        const result = await UserModel.create(newUser);
        res.send(result);
    })
);


const generateID = async() => {
    var count = await UserModel.countDocuments();

    while(await UserModel.findOne({id : count.toString()})) {
        count++;
    }

    return count;
};

export default router;