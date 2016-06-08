import mongoose, { Schema } from 'mongoose'

const { ObjectId } = Schema.Types

const schema = new Schema({
    name: String,
    login: {type: String, unique: true},
    email: {type: String, unique: true},
    avatarURL: String,
    admin: {type: Boolean, default: false},
    stars: [{type: ObjectId, ref: 'Star'}],
    google: {
        id: String,
        token: String
    }
})

export default mongoose.model('User', schema)