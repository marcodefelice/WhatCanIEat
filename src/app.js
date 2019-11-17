'use strict';

// ------------------------------------------------------------------
// APP INITIALIZATION
// ------------------------------------------------------------------

const { App } = require('jovo-framework');
const { Alexa } = require('jovo-platform-alexa');
const { GoogleAssistant } = require('jovo-platform-googleassistant');
const { JovoDebugger } = require('jovo-plugin-debugger');
const { FileDb } = require('jovo-db-filedb');

const { CheckRecipe } = require('./actions/CheckRecipe');

const app = new App();

app.use(
    new Alexa(),
    new GoogleAssistant(),
    new JovoDebugger(),
    new FileDb()
);


// ------------------------------------------------------------------
// APP LOGIC
// ------------------------------------------------------------------

app.setHandler({
    LAUNCH() {
          return this.toIntent('WhatCanIEatIntent');
    },

    WhatCanIEatIntent() {
        this.ask('Ciao, che ingredienti hai?', 'Dimmi gli ingredienti che desideri utilizzare.');
    },

    async IngredientsIntent() {
      let variable = this.$inputs.ingredients.value
      variable = variable.split(" ")
      let res = await doThese(variable);
      let message = checkMessage(res)
      this.tell(message)
    },
});


function doThese(variable) {
  return new Promise(
    function(resolve, reject) {
        var check = CheckRecipe(variable);
        resolve(check)
    }
  )
}

/**
* function for parse the object returned and create a message
*
*/
function checkMessage(object) {
  console.log("RESPONSE SVUOTAFRIGO:",object)
  let obj = JSON.parse(object)
  if(obj.status != 0) {
    return false;
  }
  let message = []
  obj = obj.results
  if(obj.length == 0) {
    return "Mi dispiace non ho trovato nulla"
  }
    let x = 0
    message = "Ho trovato in totale " + obj.length + " ricette "
    for(let i = 0; i < obj.length; i++) {
      let level = ""
      if(!!obj[i].difficolta) {
        level = " di difficoltà " + obj[i].difficolta
      }
      message = message + ", " + obj[i].nome + level
    }
  return message
}
module.exports.app = app;
