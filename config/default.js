module.exports = {
  port: 3001,
  session: {
    secret: 'myblog',
    key: 'myblog',
    maxAge: 2592000000
  },
  mongodb: 'mongodb://mooji:starts999@ds117590.mlab.com:17590/node-collection'
}
