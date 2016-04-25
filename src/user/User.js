import mongoose, {Schema} from 'mongoose'

const userSchema = new Schema({
    login: String
})

export default mongoose.model('User', userSchema)