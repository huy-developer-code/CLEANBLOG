var db = require("mongoose");
var bcrypt = require("bcrypt");

db.connect("mongodb+srv://voquanghuy:123@cluster0.0cygz.mongodb.net/myFirstDatabase?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

var userSchema = db.Schema({
    username:
    {
        type: String,
        require: true
    },
    email:
    {
        type: String,
        require: true
    },
    password:
    {
        type: String,
        require:true
    }
})
userSchema.pre('save', function (next) {
    var user = this;
    bcrypt.hash(user.password, 10, function (error, encrypted) {
        user.password = encrypted;
        next()
    })
})
var User = db.model('User', userSchema)
module.exports = User