import mongoose from "mongoose";
import bcrypt from 'bcryptjs';

const userSchema  = new mongoose.Schema({

    email: {
        type: String,
        required: true,
        unique: true,
    },

    password: {
        type: String,
        required: true,
    }

});

userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
}

const User = mongoose.model("Users", userSchema);
export default User;