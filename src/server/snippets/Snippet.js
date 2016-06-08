import mongoose, { Schema } from 'mongoose'
import File from './File'

const { ObjectId } = Schema.Types

const schema = new Schema({
    created: {type: Date, 'default': Date.now},
    description: String,
    files: [File.schema],
    stars: [{type: ObjectId, ref: 'Star'}],
    updated: Date,
    user: {type: ObjectId, ref: 'User'}
})

schema.statics.search = function (description, language, page, pageSize, callback) {
    this.find({
            description: description,
            'files.type': language
        })
        .populate('user')
        .sort({created: -1})
        .skip(pageSize * (page - 1))
        .limit(pageSize)
        .exec((err, snippets) => {
            snippets && snippets.forEach(snippet => snippet.files[0].truncate())

            callback(err, snippets)
        })
}

schema.statics.total = function (description, language, callback) {
    this.count({
            description: description,
            'files.type': language
        })
        .exec(callback)
}

schema.statics.totalByLanguages = function (description, language, callback) {
    this.aggregate([
            {
                $match: {
                    description: description,
                    'files.type': language
                }
            },
            {$unwind: "$files"},
            {
                $group: {
                    _id: '$files.type',
                    count: {$sum: 1}
                }
            },
            {$sort: {count: -1}}
        ],
        (err, languages) => {
            const totalFiles = languages.reduce((acc, language) => {
                return acc + language.count
            }, 0)

            languages = languages.map(result => ({
                name: result._id,
                count: result.count,
                percent: 100 * result.count / totalFiles
            }))

            callback(err, languages)
        })
}

export default mongoose.model('Snippet', schema)
