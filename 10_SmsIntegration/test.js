const Nexmo = require('nexmo');
const nexmo = new Nexmo({
  apiKey: 'dc60a6ee',
  apiSecret: 'p8iFenw59089wDzF'
})

const from = 'Nexmo'
const to = '919534138753'
const text = 'Hello from Nexmo'

nexmo.message.sendSms(from, to, text);