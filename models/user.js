const mongoose = require('mongoose');
mongoose.Promise = global.Promise; //
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');

//Email icin schema uzerinde validation yapalim
let emailLengthChecker = (email) => {
    if (!email) {
        return false;
    } else {
        if (email.length < 5 || email.length > 35) {
            return false;
        } else {
            return true;
        }
    }
}

let emailRegexChecker = (email) => {
    if (!email) {
        return false;
    } else {
        const regExp = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
        return regExp.test(email);
    }
};

const emailValidators = [
    {
        validator: emailLengthChecker,
        message: 'Email length must be between 5 and 35'
    },
    {
        validator: emailRegexChecker,
        message: 'This is not a valid email'
    }
];

const userSchema = new Schema({
    email: { type: String, required: true, unique: true, lowercase: true, validator: emailValidators },
    username: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true },
    /*title: String,
    author: String,
    body: String,
    comments: [{ body: String, date: Date}],
    date: {type:Date, default: Date.now},
    hidden: Boolean,*/
    meta: {
        votes: Number,
        favs: Number
    }
});

//userSchema kaydetmeden once encryption icin bir middleware olusturulur
userSchema.pre('save', function (next) { //save() yapmadan once
    if (!this.isModified('password'))
        return next();
    bcrypt.hash(this.password, null, null, (err, hash) => {
        if (err) return next(err);
        this.password = hash;
        next();
    });
});

//bcrypt's decrypt method returns true/false
userSchema.methods.comparePassword = function (password) {
    return bcrypt.compareSync(password, this.password);
}

//Burada ilk parametre disaridakiler bu modeli nasil kullanacak onu belirtir.
//Ikinci parametre ise olusturdugumuz classi belirtir.
module.exports = mongoose.model('User', userSchema);