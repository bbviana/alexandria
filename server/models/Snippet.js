import mongoose, {Schema} from 'mongoose'

const fileSchema = new Schema({
    name: String,
    type: String,
    content: String
})

const snippetSchema  = new Schema({
    description: String,
    files: [fileSchema]
})

export default mongoose.model('Snippet', snippetSchema)
