// Webpack Utilities
var webpack = require('webpack');

module.exports = {
  entry: {
    bundle1: ['./app/app.jsx']
  },
  output:{
    path: __dirname + '/public/bundle',
    filename: '[name].js'
  },
  resolve: {
    // __dirname è una variabile disponibile nell'ambiente nodejs
    root: __dirname,
    // definisco un oggetto alias, in cui inserisco il path (dalla root) dei miei componenti
    modulesDirectories: [
      'node_modules',
      './app/components',
      './app/styles',
      './app/api'
    ],
    alias:{
      applicationStyles: 'app/styles/app.scss',
      materializeStyles: 'app/styles/sass/materialize.scss',
      actions: 'app/actions/actions.jsx',
      config: 'config.js'
    },
    // In questo modo mi evito di specificare l'estensione nei require ;)
    extensions: ['', '.js', '.jsx']
  },
  module: {
    loaders:[
      {
        loader:'babel-loader', // nome del loaders
        query: {
          presets: ['react', 'es2015'] // faccio il parse dei file con questi due presets
        },
        // con test indico cosa vado a prendere a cui faccio il parser
        // con il doppio // apro la regular expression, poi faccio l'escape del . con \. e metto l'estensione jsx ed infine $ per l'end del file
        // il punto interrogativo fa si che cerco sia i file js che jsx (rendono la x opzionale)
        test: /\.jsx?$/,
        // indico le cartelle da escludere, includo anche quella di bower che userò successivamente
        exclude: /(node_modules|bower_components)/
      },
      {
        // Eseguo il pre-loader su webpack
        loaders:["style", "css", "sass"],
        test: /\.scss$/
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2)$/,
        loader: 'file?name=../fonts/[name].[ext]'
      }
    ]
  },
  // Crea il source map per fare debugging
  devtool: 'eval-source-map'
};
