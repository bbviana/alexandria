import mongoose, {Schema} from 'mongoose'
import {fileSchema} from './File'
import {userSchema} from './User'

const snippetSchema = new Schema({
    created: {type: Date, 'default': Date.now},
    description: String,
    files: [fileSchema],
    updated: Date,
    user: userSchema // TODO mudar para population
})

export default {
    Snippet: mongoose.model('Snippet', snippetSchema),
    snippetSchema: snippetSchema
}
