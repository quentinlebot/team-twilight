var mongoose =  require('mongoose');
var crypto =    require('crypto');
var Schema =    mongoose.Schema;

var config = require('../../config/environment');

var UserSchema = new Schema({
    login: { type: String, lowercase: true },
    role: { type: String, default: config.userRoles[config.defaultRoleIndex] },
    hashedPassword: String,
    salt: String
});

UserSchema
  .virtual('password')
  .set(function (password) {
    this._password = password;
    this.salt = this.makeSalt();
    this.hashedPassword = this.encryptPassword(password);
})
  .get(function () {
    return this._password;
});

UserSchema
  .path('login')
  .validate(function (login) {
    return login.length;
}, 'Le nom ne peux pas être vide');

UserSchema
  .path('hashedPassword')
  .validate(function (hashedPassword) {
    return hashedPassword.length;
}, 'Le mot de passe ne peux pas être vide.');

UserSchema
  .path('role')
  .validate(function (role) {
    if (config.userRoles.indexOf(role) < 0) return false;
    else return true;
}, 'Le niveau d\'authorisation n\'est pas valide.');

UserSchema
  .path('login')
  .validate(function (value, respond) {
    var self = this;
    this.constructor.findOne({ login: value }, function (err, user) {
        if (err) throw err;
        if (user) {
            if (self.id === user.id) return respond(true);
            return respond(false);
        }
        respond(true);
    });
}, 'Cet identifiant est déjà utilisè.');

UserSchema.methods = {
    
    authenticate: function (plainText) {
        return this.encryptPassword(plainText) === this.hashedPassword;
    },
    makeSalt: function () {
        return crypto.randomBytes(16).toString('base64');
    },
    encryptPassword: function (password) {
        if (!password || !this.salt) return '';
        var salt = new Buffer(this.salt, 'base64');
        return crypto.pbkdf2Sync(password, salt, 10000, 64).toString('base64');
    }
};

UserSchema.statics = {
    
};

module.exports = mongoose.model('User', UserSchema);
