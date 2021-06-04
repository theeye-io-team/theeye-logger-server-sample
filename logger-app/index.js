const path = require('path')
const debug = require('debug')('theeye:logger')
const express = require('express')
const cors = require('cors')

const bodyParser = require('body-parser')
const fs = require('fs')

const main = () => {

  const api = new Api()
  api.start()

}

class Api {
  constructor () {
  }

  start () {
    const app = express()
    const dataStream = fs.createWriteStream('./data.log', {flags:'a'})

    app.use(cors())

    // parse application/x-www-form-urlencoded
    app.use(bodyParser.urlencoded({ extended: false }))

    // parse application/json
    app.use(bodyParser.json())

    app.post('/*', (req, res) => {
      debug('Incomming %j', req.url)
      debug('Event payload %j', req.body)

      dataStream.write(JSON.stringify({
        url: req.url,
        headers: req.headers,
        body: req.body
      }) + '\n')

      res.status(200).json('ok')
    })

    const port = process.env.PORT || 8001
    app.listen(port, () => debug(`listening on port ${port}`))
  }
}

main ()
