const mongoose = require('mongoose'),
    validator = require('validator'),
    bcrypt = require('bcryptjs'),
    jwt = require('jsonwebtoken');

const userSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        trim: true
    },
    lastName: {
        type: String,
        required: true,
        trim: true
    },
    lastLogin: {
        type: Number,
        required: false,
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)){
                throw new Error('Email is not valid.');
            }
        }
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minLength: 8,
        validate(value) {
            if (value.toLowerCase().includes('password')) {
                throw new Error('Password must not contain common strings.')
            }
        }
    },
    token: {
        type: String,
        required: false
    }
});

userSchema.pre("save", async function(next) {
    if (this.isModified("password")){
        this.password = await bcrypt.hash(this.password, 8)
        console.log(this.password)
    }
    next();
});

userSchema.methods.generateAuthToken = async function() {
    const user = this;
    const token = jwt.sign({
        _id: user._id,
        name: user.lastName,
        email: user.email
    }, 'secret');
    user.token = token;
    await user.save();
    return token;
};

const User = mongoose.model('User', userSchema);
module.exports = User;