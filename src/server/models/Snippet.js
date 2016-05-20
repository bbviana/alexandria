import mongoose, { Schema } from 'mongoose'
const { ObjectId } = Schema.Types
import File from './File'

const schema = new Schema({
    created: {type: Date, 'default': Date.now},
    description: String,
    files: [File.schema],
    stars: [{type: ObjectId, ref: 'Star'}],
    updated: Date,
    user: {type: ObjectId, ref: 'User'}
})

const model = mongoose.model('Snippet', schema)

export default model
