import mongoose, { Schema } from 'mongoose'
import { truncateByLines } from '../../utils/arrays'

const schema = new Schema({
    name: String,
    type: {type: String, default: 'txt'},
    content: String
})

schema.methods.truncate = function () {
    this.content = truncateByLines(this.content, 10)
    return this.content
}

export default mongoose.model('File', schema)