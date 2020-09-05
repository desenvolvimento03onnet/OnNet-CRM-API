'use strict'

const Env = use('Env')

module.exports = {

  authenticator: 'jwt',

  session: {
    serializer: 'lucid',
    model: 'App/Models/User',
    scheme: 'session',
    uid: 'username',
    password: 'password'
  },

  basic: {
    serializer: 'lucid',
    model: 'App/Models/User',
    scheme: 'basic',
    uid: 'username',
    password: 'password'
  },

  jwt: {
    serializer: 'lucid',
    model: 'App/Models/User',
    scheme: 'jwt',
    uid: 'username',
    password: 'password',
    options: {
      secret: Env.get('APP_KEY')
    }
  },

  api: {
    serializer: 'lucid',
    model: 'App/Models/User',
    scheme: 'api',
    uid: 'username',
    password: 'password'
  }
}
