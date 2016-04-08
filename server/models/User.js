import mongoose, {Schema} from 'mongoose'

const userSchema = new Schema({
    login: String
})

export default {
    User: mongoose.model('User', userSchema),
    userSchema: userSchema
}