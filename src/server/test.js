import mongoose from 'mongoose'
import mockgoose from 'mockgoose'
import settings from './settings'

const dbURL = settings.db['test'].url

mockgoose(mongoose).then(function () {
    mongoose.connect(dbURL, function (err, res) {
        if (err) {
            console.log('Error connecting to the [In Memory] database. \n' + err)
        } else {
            console.log('Connected to [In Memory] Database: ' + dbURL + '\n')
        }
    })
})

export default mongoose.connection.db