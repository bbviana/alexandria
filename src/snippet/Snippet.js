import mongoose, {Schema} from 'mongoose'
import File from '../file/File'
import User from '../user/User'

const snippetSchema = new Schema({
    created: {type: Date, 'default': Date.now},
    description: String,
    files: [File.schema],
    updated: Date,
    user: User.schema // TODO mudar para population
})

export default mongoose.model('Snippet', snippetSchema)
