import mongoose, { Schema } from 'mongoose'
import File from './File'

const snippetSchema = new Schema({
    created: {type: Date, 'default': Date.now},
    description: String,
    files: [File.schema],
    updated: Date,
    user: {type: Schema.Types.ObjectId, ref: 'User'}
})

export default mongoose.model('Snippet', snippetSchema)
