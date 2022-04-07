var db = require("mongoose");
db.connect("mongodb://127.0.0.1:27017/mypost",{
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