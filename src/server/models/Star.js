import mongoose, { Schema } from 'mongoose'

const StarSchema = new Schema({
    snippet: {type: Schema.Types.ObjectId, ref: 'Snippet'},
    user: {type: Schema.Types.ObjectId, ref: 'User'}
})

export default mongoose.model('Star', StarSchema)