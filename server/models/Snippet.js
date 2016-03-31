import mongoose, {Schema} from 'mongoose'

const SnippetSchema  = new Schema({
    description: String
})

export default mongoose.model('Snippet', SnippetSchema)
