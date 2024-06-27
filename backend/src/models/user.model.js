import { Schema,model } from "mongoose";

export const userSchema = new Schema({ 
    id :{ type: String, required: true, unique: true},
    email: { type: String, required: true,unique: true},
    password: { type: String, required: true },
    });

const UserModel = model('User', userSchema);
export default UserModel;