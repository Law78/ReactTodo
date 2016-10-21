Ho bisogno delle seguenti librerie inizialmente:

```bash
npm install --save axios express react react-dom react-router
npm install --save-dev webpack style-loader script-loader css-loader sass-loader
```

Qui l'elenco completo delle librerie, che installerò mano a mano che mi serviranno:

```
axios - per fare richieste HTTP (con promesse)
express - per avviare un server web in NodeJS
react - per usare la libreria React (e quindi il React.createElement necessario quando traduco il JSX)
react-dom - per fare il rendering sul DOM
react-router - per implementare il routing dell'app
jquery - per jquery
```

come dev-dipendenze:

```
babel-core - il core di babel
babel-loader - necessario per usare babel con webpack
babel-preset-es2015 - plugin babel per ES6
babel-preset-react - plugin babel per React e JSX
babel-preset-stage-0 - plugin per le features introdotte dallo stage 0
react-addons-test-utils - per fare il TEST di componenti React

karma - per lanciare i TEST
karma-chrome-launcher
karma-mocha - per integrare mocha nel test runner karma-mocha
karma-mocha-reporter - per avere i report in stile mocha
karma-sourcemap-loader - per avere il debug sul sourcemap
karma-webpack - per integrare la config di webpack in karma

mocha - il framework per TEST
expect - libreria di asserzioni per TEST
chai - libreria di asserzioni BDD/TDD

css-loader - per caricare asset css in webpack
node-sass - preprocessore sass per nodejs
sass-loader - per caricare sass in webpack
script-loader - per caricare gli script da webpack
style-loader - per caricare asset di stile in webpack

webpack - ovvio :)
```


### La configurazione di webpack

E' un oggetto con varie proprietà. La prima che vediamo è la entry, che può essere una singola stringa, un array  
oppure un OGGETTO. Avere un oggetto ci permette di avere BUNDLE diversi:

```js
entry:  {
  bundle1: ['./app/app.jsx']
},
```

l'output specifica dove avverrà la creazione del mio pacchetto bundle:

```js
output:{
  path: __dirname + '/public/bundle',
  filename: '[name].js'
}
```
con resolve, posso specificare dove cercare le dipendenze richieste con require. Di default il require verrà risolto o cercando nella cartella node_modules o nel path specificato nel require.

```js
resolve: {
  root: __dirname,
  modulesDirectories: [
    'node_modules',
    './app/components'
  ],
  alias: {


  },
  extensions: ['', '.js', '.jsx']
}
```

Infine vado ad inserire il modulo relativo ai loaders, cioè la parte che si occupa dell'esecuzione della creazione del bundle tramite l'uso di plugin di trasfromazione:

```js
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
        loaders:["style", "css","sass"],
        test: /\.scss$/
      }
    ]
  },
}
```

Lanciando webpack, dovrò risolvere il problema che non trova il file app/app.jsx

Successivamente la mancanza di babel-loader a cui devo installare babel-core e node-sass e ovviamente babel-preset-react e babel-preset-es2015:

```bash
npm install --save-dev babel-core babel-loader babel-preset-react babel-preset-es2015 node-sass
```

Creo il file index.html, il file server.js e il file app.jsx e, dopo aver lanciato webpack, lancio node server.

Il file index.html conterrà il tag HTML per caricare la mia app React e lo script bundle creato da webpack:

```html
<!DOCTYPE html>
<html>

<head>
  <meta charset="UTF-8"/>
</head>

<body>
  <div id="app"></div>

  <script src="./bundle/bundle1.js"></script>
</body>

</html>
```

Adesso installo tutto il necessario per i test, creando nella root la cartella test\components:

```shell
npm install --save-dev react-addons-test-utils karma karma-chrome-launcher karma-mocha karma-mocha-reporter karma-sourcemap-loader karma-webpack mocha expect chai
```

Inserisco in package.json i comandi per avviare il server e l'ambiente di test:

```
"test": "karma start",
"start": "node server.js"
```

Creo il file karma.conf.js ed inserisco un test per vedere se l'ambiente di Test funziona.

karma.conf.js:

```js
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
```

il file app.jsx in app:

```js
var React = require('react');
var ReactDOM = require('react-dom');
var {Route, Router, IndexRoute, hashHistory} = require('react-router');

ReactDOM.render(
  <p>Boilerplate Project</p>,
  document.getElementById('app')
);
```

ed il file di test app.test.jsx in /test:

```js
var expect = require('expect');

describe('App', () => {
  it('should properly run tests', () => {
    expect(1).toBe(1);
  });
});
```

Vado a creare un cartella fakeServer dove inserisco un file db.json:

```
{
  "todos": [
    { "id": 1, "text": "Chiama Tom" },
    { "id": 2, "text": "Avvia il server web" },
    { "id": 3, "text": "Vai in palestra" }
  ]
}
```

avrò installato globalmente il [json-server](https://github.com/typicode/json-server#add-routes):

```
npm install -g json-server
```

e aggiungo il seguente comando nella sezione script di package.json:

```
"fake": "json-server -p 4000 --watch ./fakeServer/db.json"
```

Avvio il fake server con npm run fake.

Mi creo i componenti: TodoApp - TodoList - Todo:

```js
var React = require('react');
var TodoList = require('TodoList');

var TodoApp = React.createClass({
  render: function(){
    return(
      <div>
        <TodoList />
      </div>
    )
  }
});

module.exports = TodoApp;
```

```js
var React = require('react');
var Todo = require('Todo');

var TodoList = React.createClass({
  render: function(){
    return(
      <div>
        TodoList
      </div>
    )
  }
});

module.exports = TodoList;
```

```js
var React = require('react');


var Todo = React.createClass({
  render: function(){
    return(
      <div>
        TodoList
      </div>
    )
  }
});

module.exports = Todo;
```

Step successivo per TodoApp:

```js
var React = require('react');

var TodoList = require('TodoList');

var TodoApp = React.createClass({
  getInitialState: function(){
    return {
      todos: []
    }
  },
  componentWillMount: function(){
    console.log('TodoApp will Mount');
  },
  render: function(){
    var {todos} = this.state;
    return(
      <div>
        <TodoList todos={todos} />
      </div>
    )
  }
});

module.exports = TodoApp;
```

Importo axios in TodoApp per fare la richiesta al fake server che ho settato.
Nel componentWillMount di TodoApp:

```js
componentWillMount: function(){
  var request = {
    method: 'GET',
    url: '/todos',
    baseURL: 'http://localhost:4000',
    headers: {'X-Requested-With': 'XMLHttpRequest'},
    timeout: 2000
  };
  var self = this;
  axios.request(request).then(function(res){
    self.setState({
      todos: res.data
    });
  }).catch(function(error){
    console.log('Axios Error:' + error);
  });
},
```

Lo spread operator prendere tutti gli attributi dell'oggeto e li passa. Lo userò per passare l'item Todo da TodoList a Todo.

I componenti saranno:

TodoApp:

```js
var React = require('react');
var axios = require('axios');

var TodoList = require('TodoList');

var TodoApp = React.createClass({
  getInitialState: function(){
    return {
      todos: []
    }
  },
  componentWillMount: function(){
    var request = {
      method: 'GET',
      url: '/todos',
      baseURL: 'http://localhost:4000',
      headers: {'X-Requested-With': 'XMLHttpRequest'},
      timeout: 2000
    };
    var self = this;
    axios.request(request).then(function(res){
      console.log('Axios Response:');
      console.log(res.data);
      self.setState({
        todos: res.data
      });
    }).catch(function(error){
      console.log('Axios Error:' + error);
    });
  },
  render: function(){
    var {todos} = this.state;
    return(
      <div>
        <TodoList todos={todos} />
      </div>
    )
  }
});

module.exports = TodoApp;
```

che passa (o no) i valori di todos a TodoList, da notare il settaggio del default per un componente functional:

```js
var React = require('react');
var Todo = require('Todo');

var TodoList = ({todos}) =>{

  var todo = {}
  var renderTodos = () => {
    return todos.map((todo) => {
      return(
        <li key={todo.id}><Todo {...todo} /></li>
      )
    });
  }
  return(
    <div>
      <ul>
        {renderTodos()}
      </ul>
    </div>
  );
}

TodoList.defaultProps = { todos: [] };

module.exports = TodoList;
```

ed infine il Todo:

```js
var React = require('react');

var Todo = (todo) => {
  var {id, text} = todo;
  return(
    <div>
      <p> <b>{text}</b> (id:{id})</p>
    </div>
  )
}

module.exports = Todo;
```

### TEST

Creiamo i test in test/components. Non passerò nulla tra i componenti in modo da verificare che comunque vengano renderizzati:

TodoApp.test.jsx:

```js
const React = require('react');
const TestUtils = require('react-addons-test-utils');

const expect = require('expect');

const TodoApp = require('TodoApp');

describe('TodoApp', () => {
  it('should exist', () => {
    const component = TestUtils.renderIntoDocument(<TodoApp />);
    expect(component).toExist();
  });
});
```

poi TodoList.test.jsx, dove il componente l'ho wrappato in un div in quanto è un functional component:

```js
const React = require('react');
const TestUtils = require('react-addons-test-utils');

const expect = require('expect');

const TodoList = require('TodoList');

describe('TodoList', () => {
  it('should exist', () => {
    const component = TestUtils.renderIntoDocument(<div><TodoList /></div>);
    expect(component).toExist();
  });
});
```

ed infine Todo.test.jsx, anche questo wrappato nel div in quanto funzionale:

```js
var React = require('react');

var TestUtils = require('react-addons-test-utils');
var expect = require('expect');

var Todo = require('Todo');

describe('Todo', () =>{
  it('should exist', () => {
    var component = TestUtils.renderIntoDocument(<div><Todo /></div>);
    expect(component).toExist();
  });
});
```

Ho inserito il supporto per Materialize CSS includendo in webpack il css di Materialize
e il requires dell'scss mio e di materialize. Ho dovuto inserire il loader file-loader per le fonts, che mi crea le risorse font statiche direttamente nella public.

#AddTodo

Per aggiungere un nuovo todo, vado ad usare un package di NodeJS per generare un Unique ID:

```
npm install --save node-uuid
```

e lo vado ad inserire in TodoApp:

```
var uuid  = require('node-uuid');
```

In TodoApp vado ad aggiornare lo stato. Il mio todos è un array. Per inserire un nuovo oggetto a questo array userò lo spread operator:

```
this.setState({
  todos: [
    ...this.state.todos, {
      id: uuid(),
      text
    }
  ]
});
```

in cui ho generato anche un ID univoco. Questo è il metodo con il POST al server:

```
handleAddTodo: function(text){
  var todoId = uuid();
  this.setState({
    todos: [
      ...this.state.todos, {
        id: todoId,
        text
      }
    ]
  });
  var request = {
    method: 'POST',
    url: '/todos',
    baseURL: 'http://localhost:4000',
    headers: {'X-Requested-With': 'XMLHttpRequest'},
    timeout: 2000,
    data: {
      id: todoId,
      text
    }
  };
  var self = this;
  axios.request(request).then(function(res){
    console.log('Axios Response:');
    console.log(res.data);

  }).catch(function(error){
    console.log('Axios Error:' + error);
  });
},
```

Ho cambiato la procedura di avvio, ora il server fake viene avviato da nodejs.
Adesso aggiungiamo il check per tenere traccia se una todo è completata o meno.

#LocalStorage

Nella console del browser, scrivendo localStorage. mi appaiono i metodi di questo oggetto che mi serve per scrivere in formato chiave-valore, ciò che voglio memorizzare all'interno dello storage del browser.
Ad esempio posso scrivere in console:

```
localStorage.setItem('searchText', 'cat');
localStorage.getItem('searchText');
localStorage.removeItem('searchText');
```
