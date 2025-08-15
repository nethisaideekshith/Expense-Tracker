const fs = require('fs')

const requestLogger = (req, res, next) => {
    fs.appendFile('RequestLogger.txt',`${new Date().toDateString()} - ${req.method} - ${req.url}\n`, (err) => {
        if (err) {
            console.log("Unable to write into request logger");
        }
        else{
            next()
        }
    })
}
module.exports=requestLogger