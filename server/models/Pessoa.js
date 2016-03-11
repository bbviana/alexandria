import mongoose, {Schema} from 'mongoose'

const PessoaSchema  = new Schema({
    name: String

})

export default mongoose.model('Pessoa', PessoaSchema)
