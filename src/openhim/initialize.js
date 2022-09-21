// 'use strict'

// import express from 'express'
// import { registerMediator, activateHeartbeat } from 'openhim-mediator-utils'
// import mediatorConfig, { urn } from './mediatorConfig.json'
// import { fetchConfig } from 'openhim-mediator-utils`'

// const app = express()

// const openhimConfig = {
//   username: 'root@openhim.org',
//   password: 'password',
//   apiURL: 'https://openhim-core:8080',
//   trustSelfSigned: true,
//   urnr
// }

// app.all('*', (req, res) => {
//   res.send('Hello World')
// })

// app.listen(3000, () => {
//   console.log('Server listening on port 3000...')
//   activateHeartbeat(openhimConfig)
// })

// registerMediator(openhimConfig, mediatorConfig, err => {
//   if (err) {
//     throw new Error(`Failed to register mediator. Check your Config. ${err}`)
//   }
// })
// fetchConfig(openhimConfig, (err, initialConfig) => {
//   if (err) {
//     throw new Error(`Failed to fetch initial config. ${err}`)
//   }
//   console.log('Initial Config: ', JSON.stringify(initialConfig))
// })
