import mongoose, {Schema} from 'mongoose'
import bcrypt from 'bcrypt-nodejs'

const userSchema = new Schema({
    name: String,
    login: {type: String, unique: true},
    email: {type: String, unique: true},
    avatarURL: String,
    admin: {type: Boolean, default: false},

    google: {
        id: String,
        token: String
    }
})

// FIXME [LocalStrategy: remover]
// generating a hash
userSchema.methods.generateHash = function (password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null)
}

// checking if password is valid
userSchema.methods.validPassword = function (password) {
    return bcrypt.compareSync(password, this.password)
}

export default mongoose.model('User', userSchema)