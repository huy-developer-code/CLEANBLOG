var db = require("mongoose");
db.connect("mongodb+srv://voquanghuy:123@cluster0.0cygz.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",{
    useNewUrlParser: true,
    useUnifiedTopology: true
});
var postSchema = db.Schema({
    title: String,
    subtitle: String,
    content: String,
    username: String,
    image:String,
    createdAt: {
        type: Date,
        default: new Date()
    }
})

var Post = db.model('Post', postSchema)
module.exports = Post