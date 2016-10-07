// prelevo la configurazione di webpack. Questo perchè è un modulo che esporto.
var webpackConfig = require('./webpack.config.js');

// config è un oggetto che viene passato e che devo impostare con set:
module.exports = function (config){
  config.set({
    browsers: ['Chrome'],     // browser da utilizzare
    singleRun: false,         // a false rimane il browser aperto e lancia il test ogni volta che cambio i file di test
    frameworks: ['mocha'],    // mocha è il frameworks con cui scriverò i test. Posso usare ad es jasmine
    files: ['test/**/*.test.jsx','test/**/*.test.js'],  // Prendo tutti i file che sono sotto app/tests e relative sub-folder con estensione .test.jsx
    preprocessors: {  // impostazioni che si eseguono prima dei test
      'test/**/*.test.js': ['webpack', 'sourcemap'] ,
      'test/**/*.test.jsx': ['webpack', 'sourcemap'] // specifico il tipo di file e le azioni da effettuare prima del test
    },
    reporters: ['mocha'],     // i reporters che utilizzo per visualizzare i fails e i success
    client: { // alcune configurazioni che passo al framework di testing
      mocha: {
        timeout: '5000' // 5 sec. di timeout - altrimenti il test fallisce
      }
    },
    // Impostazioni per utilizzare Webpack
    webpack: webpackConfig, // nome della variabile che contiene il file di config di webpack
    webpackServer: {
      noInfo: true
    }
  });
};
