import mongoose, {Schema} from 'mongoose'
import bcrypt from 'bcrypt-nodejs'

const userSchema = new Schema({
    login: String,
    password: String,

    google: {
        id: String,
        token: String,
        email: String,
        name: String
    }
})

// generating a hash
userSchema.methods.generateHash = function (password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null)
}

// checking if password is valid
userSchema.methods.validPassword = function (password) {
    return bcrypt.compareSync(password, this.password)
}

export default mongoose.model('User', userSchema)