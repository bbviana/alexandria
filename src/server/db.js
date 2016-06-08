import mongoose from 'mongoose'
import settings from './settings'

const dbURL = settings.db[process.env.NODE_ENV].url

mongoose.connect(dbURL, function (err, res) {
    if (err) {
        console.log('Error connecting to the database. \n' + err)
    } else {
        console.log('Connected to Database: ' + dbURL + '\n')
    }
})

export default mongoose.connection.db