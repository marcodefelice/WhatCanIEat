// ------------------------------------------------------------------
// APP CONFIGURATION
// ------------------------------------------------------------------

module.exports = {
    logging: true,

    intentMap: {
       'AMAZON.StopIntent': 'END',
    },

    db: {
         FileDb: {
             pathToFile: '../db/db.json',
         }
     },

     endpoint: {
        svuotafrigo: {
          url: "www.apphost.it",
          path: "/ricette/rest/genericQueryWeight/?page=0"
        }
     }
 };
