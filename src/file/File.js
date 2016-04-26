import mongoose, {Schema} from 'mongoose'
import Arrays from '../app/helpers/Arrays'

const fileSchema = new Schema({
    name: String,
    type: {type: String, default: 'txt'},
    content: String
})

fileSchema.methods.truncate = function(){
    this.content = Arrays.truncateByLines(this.content, 10)
    return this.content
}

export default mongoose.model('File', fileSchema)