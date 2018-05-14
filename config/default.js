module.exports = function(){
  switch(process.env.NODE_ENV){
      case 'development':
          return {
            port: 3001,
            session: {
              secret: 'myblog',
              key: 'myblog',
              maxAge: 2592000000
            },
            cloudary:{
                CLOUD_NAME:'hqa0ftnmu', 
                CLOUD_KEY:'724457381865382',
                CLOUD_SECRET:'VGNcz4VNRN8yKqJUltbHf_ZD_q4'
              },
            
            mongodb: 'mongodb://localhost:27017/localhost'
          };

      case 'production':
          return {
            port: 3001,
            session: {
              secret: 'node-collection',
              key: 'node-collection',
              maxAge: 2592000000
            },
            cloudary:{
              CLOUD_NAME:'hqa0ftnmu', 
              CLOUD_KEY:'724457381865382',
              CLOUD_SECRET:'VGNcz4VNRN8yKqJUltbHf_ZD_q4'
            },
            mongodb: 'mongodb://mooji:starts999@ds117590.mlab.com:17590/node-collection'
          };

      default:
          return 'ENV is undefined , please check the config ';
  }
};









