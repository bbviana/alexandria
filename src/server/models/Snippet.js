import mongoose, { Schema } from 'mongoose'
import File from './File'
import Star from './Star'

const snippetSchema = new Schema({
    created: {type: Date, 'default': Date.now},
    description: String,
    files: [File.schema],
    stars: [Star.schema],
    updated: Date,
    user: {type: Schema.Types.ObjectId, ref: 'User'}
})

export default mongoose.model('Snippet', snippetSchema)
