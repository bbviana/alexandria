import mongoose, {Schema} from 'mongoose'
import Arrays from '../app/helpers/Arrays'

const fileSchema = new Schema({
    name: String,
    type: String,
    content: String
})

fileSchema.methods.truncate = function(){
    this.content = Arrays.truncateByLines(this.content, 10)
    return this.content
}

export default {
    File: mongoose.model('File', fileSchema),
    fileSchema: fileSchema
}