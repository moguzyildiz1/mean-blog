const crypto = require('crypto').randomBytes(256).toString('hex');//special method to create crypted token

//to expose whole module to outside
module.exports= {
    uri: 'mongodb://localhost:27017/mean-blog', //this.db doesn't work
    /*that's for how gonna server can decrypt something and know that
     it's ours.This will be attached to all of them.*/
    secret: crypto,
    db: 'mean-blog'
}