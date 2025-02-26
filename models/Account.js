import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const accountSchema = new mongoose.Schema({
    first_name: {
        type: String, 
        required: true
    },
    last_name: {
        type: String, 
        required: true
    },
    tel: {
        type: String,
        required: [true, 'Please add a telephone number'],
        unique: true,
    },
    email: {
        type: String,
        required: [true, 'Please add an email'],
        unique: true,
        match: [
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z0-9]+\.)+[a-zA-Z]{2,}))$/,
            'Please add a valid email'
        ]
    },
    password: {
        type: String,
        required: [true, 'Please add a password'],
        minlength: 6,
        select: false
    },
    role: { 
        type: String, 
        enum: ["user", "hotel_admin", "super_admin"], 
        required: true 
    },
    create_at: {
        type: Date,
        default: Date.now
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
});

accountSchema.pre('save' , async function(next){
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password,salt);
});

accountSchema.methods.getSignedJwtToken = function(){
    return jwt.sign({id:this._id} , process.env.JWT_SECRET,{
        expiresIn: process.env.JWT_EXPIRE
    });
}

accountSchema.methods.matchPassword = async function(password){
    return await bcrypt.compare(password , this.password);
}

const Account = mongoose.model('Account', accountSchema);
export default Account;