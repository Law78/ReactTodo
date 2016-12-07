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


# Sezione Redux

Vado a creare la cartella actions in app e il relativo file actions.jsx e nella cartella test 
creo actions e il file action.test.jsx

Aggiungo l'alias 'actions' in webpack.config.js

Creiamo l'action generator per la prima action 'setSearchText' e relativo test in actions.test.jsx

```
export var setSearchText = (searchText) => {
  return {
    type: 'SET_SEARCH_TEXT',
    searchText
  };
};

export var addTodo = (text) => {
  return {
    type: 'ADD_TODO',
    text
  };
};

export var toggleShowCompleted = () => {
  return {
    type: 'TOGGLE_SHOW_COMPLETED'
  };
};

export var toggleTodo = (id) => {
  return {
    type: 'TOGGLE_TODO',
    id
  };
};
```

Per ora di fatto non abbiamo usato Redux :)

Creiamo la cartella reducers e relativo alias con la cartella ed il file per i test.

```
export const searchTextReducers = (state = '', action) => {
  switch(action.type){
    case 'SET_SEARCH_TEXT':
      return action.searchText;
    default:
      return state;
  };
};
```

Siamo andati a installare deep-freeze-strict per fare il freeze degli oggetti in maniera ricorsiva.
Usarlo è molto semplice, una volta importato (con import o require) passo l'oggetto da "freezare" a
deep freeze.
Prova ad inserire il seguente codice in un reducers e riavvia il test. Avrò un errore in cui l'object is
not extensible.

```
const reducers = require('reducers');
const expect = require('expect');
const freeze = require('deep-freeze-strict');

describe('Reducers', () => {
  describe('searchTextReducers', () => {
    it('should set searchText', () => {
      const action = {
        type: 'SET_SEARCH_TEXT',
        searchText: 'Some Text'
      },
        res = reducers.searchTextReducers(freeze(''), freeze(action));
      expect(res).toEqual(action.searchText);
    });
  });

  describe('showCompletedReducers', () => {
    it('should change show completed flag', () => {
      const state = false,
        action = {
          type: 'TOGGLE_SHOW_COMPLETED'
        },
        res = reducers.showCompletedReducers(freeze(state), freeze(action));
      expect(res).toBe(!state);
    });
  });

});
```

Iniziamo ora a creare lo store e ad installare redux:

```
npm install redux redux-logger --save-dev
```

Creo la cartella store e il file configureStore.jsx:

```

const {applyMiddleware, createStore, combineReducers, compose} = require('redux');
const {searchTextReducers, showCompletedReducers, todosReducers} = require('reducers');
const createLogger = require('redux-logger');

export const configure = () => {
  const reducer = combineReducers({searchText:searchTextReducers,
    showCompleted: showCompletedReducers,
    todos: todosReducers
  });
  const logger = createLogger();
  var store = createStore(reducer,
    compose(window.devToolsExtension ? window.devToolsExtension() : f => f),
    applyMiddleware(logger));
  return store;
};
```

e in app.jsx avrò:

```
var actions = require('actions');
var store = require('configureStore').configure();

store.subscribe(() => {
  console.log('New State', store.getState());
});

store.dispatch(actions.addTodo('Clean the yard'));
store.dispatch(actions.setSearchText('yard'));
store.dispatch(actions.toggleShowCompleted());
```

#Lettura 120

Adesso abbiamo i Reducers, le Actions e lo Store. Ora devo fare il refactor dei componenti per agganciarli
a Redux. Devo installare la libreria react-redux perchè userò il {Provider}:

```
npm install react-redux --save-dev
```

Prima di tutto dobbiamo aggiungere il Provider che abilita l'accesso allo store ai componenti a cui voglio
dare questo accesso, in questo caso a tutti i miei componenti TodoApp:

```
ReactDOM.render(
  <Provider store={store}>
    <TodoApp/>
  </Provider>,
  document.getElementById('app')
);
```

ovviamente in app.jsx ho fatto la require:

```
var {Provider} = require('react-redux');
```

Ora devo impostare i singoli componenti. L'idea è quella di non passare più le callback di handle
(handleAddTodo, handleToggle e handleSearch) di handle da TodoApp a AddTodo, TodoList e TodoSearch.
Quindi TodoList non ha più bisogno ne dell'handler ne della props dei todos, pertanto passa da:

```
<TodoList todos={filterTodos} onToggle={this.handleToggle}/>
```

a

```
<TodoList />
```

Questo fa si che la mia TodoList sia anche più riutilizzabile in quanto risulta un livello di accoppiamento
in meno rispetto a prima. Devo però cambiare il componente TodoList.
Devo importare la funzione connect da react-redux che mi permette di connettere il componente allo store.
Devo esportare il modulo in questa modalità:

```
module.exports = connect()(TodoList);
```

In questo caso passo la dispatch in maniera implicita al componente TodoList. Come in questo es.:

```
module.exports = connect()(Todo);
```

La funzione connect() ritorna un nuovo componente React, che non altera quello passato. Il nuovo componente wrappa il componente passatto alla connect, con lo stato/actions.
Mi permette di mappare lo stato alla props del componente e gli action creators per il componente e di includere automaticamente, nelle props, il dispatch.
Per questo motivo in Todo.jsx mi ritrovo il dispatch nell props a cui faccio il destructuring.

Posso specificare la parte dello stato che mi interessa. Posso prendere anche tutto lo stato ma
non ha senso:

```
module.exports = connect(
  (state) => {
    return {
      todos: state.todos
    };
  }
)(TodoList);
```

Tolgo dal Todo la props onToggle:

```
<li key={todo.id}><Todo todo={todo} onToggle={props.onToggle}/></li>
```

diventa:

```
<li key={todo.id}><Todo todo={todo}/></li>
```

Ovviamente i miei TEST falliranno perchè cambio il metodo di lavoro dei miei componenti. Ad esempio in Todo non ho più l'onToggle. Inoltre esporto un componente wrappato dalla connect e no più il componente originale:
```
module.exports = connect()(Todo);
```

vado a fare l'export della mia var Todo in modo da usarla nei test, e specifico il default dell'export che sarà il componente wrappato:
```
export var Todo = React.createClass({
  ...
export default connect()(Todo);
```

__In questo modo esporto sia il componente "classico", sia il componente wrappato.__
__Devo cambiare anche il modo di importare il componente__

L'export defaul è l'oggetto che esporto e ottengo semplicemente con il require.
L'export di una variabile (primitiva/oggetto) la ottengo esplicitando con il destructuring.
Quello che devo ottenere nei TEST è una funzione che rappresenta il mio componente e non l'oggetto wrappato con tanto di funzione connect.
Posso fare il require con il default oppure fare l'import.... La base da ricordarsi è: Devo importare il componente React puro? Oppure il componente wrappato con la funzione connect? Per quest'ultimo faro un require senza destructuring (al più scrivo default alla fine, oppure faccio descruturing, oppure uso import).

```
const {TodoList} = require('TodoList'); // componente REACT Puro come l'ultima import
const TodoList = require('TodoList'); // Se uso l'export default con la connect ottengo un oggetto che ha la funzione connect e la funzione del componente react, in questo caso non FUNZIONEREBBE, e per farla equivalente alla import TodoList devo usare il .default alla fine:
const TodoList = require('TodoList').default; // Equivalente alla import che segue
import TodoList from 'TodoList'; // function Connect(props, context) {...}
import {TodoList} from 'TodoList'; // componente REACT Puro - Non ho lo STORE! (props, context, updater)
```

Quindi non lavorano più con le proprietà ma con lo store. Torniamo ai TEST, nello specifico in TodoApp.test.jsx (it('should render TodoList', ()).


Attenzione: il mio render è diverso da quello di Andrew. Lui prende sempre TodoList, io invece faccio un controllo se ho dei todos da visualizzare. Pertanto io non riesco a fare il test come lo fa lui. In quanto il mio localStorage tra l'altro, è sempre vuoto in test e quindi non farò mai il render di <TodoList> (questo per il test 'it should render TodoList in TodoApp.test.jsx).
Il mio test dovrà inserire almeno un todo nel localStorage, per cui sarà: 

```
 it('should render TodoList', () => {
    var todos = [{
        id: 300,
        text: 'Test setTodos',
        completed: true
      }];
    localStorage.setItem('todos', JSON.stringify(todos));
    var store = configureStore.configure();
    var provider = TestUtils.renderIntoDocument(
      <Provider store={store}>
        <TodoApp />
      </Provider>
    );

    var todoApp = TestUtils.scryRenderedComponentsWithType(provider, TodoApp)[0];
    
    var todoList = TestUtils.scryRenderedComponentsWithType(todoApp, TodoList);


    expect(todoList.length).toEqual(1);
  });
```

Vediamo il test di TodoList.test.jsx:

Siccome il Todo ha bisogno dello STORE, devo importare sia il componente "classico" React con l'Import {}, sia il componente con la Connect() in modo da avere lo store, quindi importo la versione "Connected". Questo è necessario solo per il TEST del File, in quanto ho bisogno di avere l'istanza dello store.

```
import ConnectedTodoList, {TodoList} from 'TodoList';
import ConnectedTodo, {Todo} from 'Todo';

const configureStore = require('configureStore');
```

posso anche fare

```
import {configure} from 'configureStore';
```

Devo importare anche il PROVIDER per agganciare lo store:

```
const {Provider}= require('react-redux');
```

Creo il riferimento allo store e passo un initialStore (HO MODIFICATO il file del configureStore per accettare un initialStore!!! Pertanto nel configureStore.jsx avrò:

```
export const configure = (initialState = {}) => {
```

creo il render con il Provider che fornirà lo store, altrimenti riscontro un problema del tipo:

```
Invariant Violation: Could not find "store" in either the context or props of "Connect(Todo)". Either wrap the root component in a <Provider>, or explicitly pass "store" as a prop to "Connect(Todo)".
```

utilizzo scryRenderedComponentsWithType, che ritorna un ARRAY di tutti i componente REACT all'interno di un albero. In questo caso voglio i componenti ConnectedTodoList e ConnectedTodo rispettivamente nel tree Provider e nel tree todoList che ottengo dal primo.

```
var store = configureStore.configure({
  todos
});
var provider = TestUtils.renderIntoDocument(
  <Provider store={store}>
    <ConnectedTodoList />
  </Provider>
)
var todoList = TestUtils.scryRenderedComponentsWithType(provider, ConnectedTodoList)[0];
var todosComponents = TestUtils.scryRenderedComponentsWithType(todoList, ConnectedTodo);

expect(todosComponents.length).toBe(todos.length);
```

Però ancora non ho i veri valori dello STORE di Redux.

Cominciamo a modificare l'addTodo.jsx, in cui, tramite destructuring, inseriamo il connect di react-redux e le actions.
Poi facciamo l'export del componente, per fare i test, e notiamo che il this.props.onAddTodo(todoText) non ci servirà più in quanto sarà possibile effettuare il DISPATCH di una azione:

```
var {dispatch} = this.props;
...
dispatch(actions.addTodo(todoText));
```

in cui faccio il dispatch del testo inserito.

Ora devo importare AddTodo in TodoApp (anche con il require usando il default finale perchè devo prendere il componente wrappato con la connect):

```
import AddTodo from 'AddTodo';
```

e ovviamente nel test AddTodo.test.jsx, ottengo:

```
Invariant Violation: Element type is invalid: expected a string (for built-in components) or a class/function (for composite components) but got: object
```

perchè devo cambiare l'import del componente con (oppure con il destructuring e la require):

```
import {AddTodo} from 'AddTodo';
```

nel test devo togliere il riferimento onAddTodo e mettere il dispatch, creare una action con il type ad ADD_TODO ed il testo con il todoText. Ovviamente la expect si aspetta di essere chiamata con l'action.

Vediamo il refactoring del TodoSearch. Mi serve {connect} e le actions generator. Il componente lo esporto con export var TodoSearch. Mentre il componente wrappato dalla connect
diventa:

```
export default connect( (state) => {
  return {
    showCompleted: state.showCompleted,
    searchText: state.searchText
  }
})(TodoSearch);
```

Sono andato a specificare cosa mi interessa dello stato, in questo caso lo showCompleted e searchText. Adesso handleSubmit non mi serve più e vado a lavorare direttamente sui due componenti della form, in cui imposto i valori di onChange con una arrow function, che mi effettuano il dispatch:

```
<div className="container__header">
  <div>
    <input type="search" ref="searchText" placeholder="Cerca nei ToDo"
      value={searchText} onChange={ () =>{
        var searchText = this.refs.searchText.value;
        dispatch(actions.setSearchText(searchText));
      } } />
  </div>
  <div>
    <input type="checkbox" id="showCompleted" ref="showCompleted" checked={showCompleted} onChange={ () => {
      dispatch(actions.toggleShowCompleted());
    }}/>
    <label htmlFor="showCompleted">Visualizzi i task completi</label>
  </div>

</div>
```

Adesso devo caricare TodoSearch in TodoApp.
Inoltre in TodoList la map si basa sui todos che ricevo e non sente gli aggiornamenti del search o della checkbox. Devo prendere TodoAPI e aggiungerlo in TodoList in quanto devo utilizzare la funzione filterTodos. Inoltre l'export della connect deve prendere, altri dati che prendo:

```
var {todos, showCompleted, searchText} = this.props;
```

Invece di mappare direttamente i todos, faccio il map di TodoAPI.filterTodos in cui passo i todos, il booleano per visualizzare anche i completi ed il searchText.

Ora manca il LocalStorage a Redux.