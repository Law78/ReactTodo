import firebase from 'firebase';

// Initialize Firebase
var config = {
  apiKey: "AIzaSyDhee-7D2NzSwkHe2W-APssSyr_CufO6hY",
  authDomain: "mead-todo-app-f33bb.firebaseapp.com",
  databaseURL: "https://mead-todo-app-f33bb.firebaseio.com",
  storageBucket: "mead-todo-app-f33bb.appspot.com",
  messagingSenderId: "740474476112"
};
firebase.initializeApp(config);

// Ottengo la reference del database e uso il set per aggiungere dei dati
/*firebase.database().ref().set({
  appName: 'Todo App',
  isRunning: true,
  user: {
    name: 'Lorenzo',
    age: 38
  }
});
*/
// Attenzione: set cancella completamente i dati
/*firebase.database().ref().set({
  appName: 'Todo Application'
});*/

var firebaseRef = firebase.database().ref();

/*firebaseRef.set({
  appName: 'Todo App',
  isRunning: true,
  user: {
    name: 'Lorenzo',
    age: 38
  }
}).then(()=>{
  console.log('Set worked!');
}, (e) => {
  console.log('Set failed');
})*/

/*firebaseRef.set({
  appName: 'Todo Application'
});*/

/*firebaseRef.child('user').child('name').set('Federico');

firebaseRef.child('appName').set({
  appName: 'Todo App',
  version: '1.0.0'
});
*/

/*firebaseRef.set({
  app: {
    name: 'Todo App',
    version: '1.0.0'
  },
  isRunning: true,
  user: {
    name: 'Federico',
    age: 38
  }
});*/

// UPDATING DATA

/*firebaseRef.update({
  isRunning:false
});

firebaseRef.child('app').update({
  name: 'Todo Application'
});*/

// Multi Path Update
/*firebaseRef.update({
  isRunning: false,
  'app/name': 'Todo Application'
});*/

/*firebaseRef.update({
  'app/name': 'Todo Application',
  'user/name': 'Federico'
});*/
/*
firebaseRef.child('app').update({
  name: 'Todo Application'
});

firebaseRef.child('user').update({
  name: 'Federico'
});
*/
// REMOVING DATA

//firebaseRef.remove();

//firebaseRef.child('user/age').remove();

/*firebaseRef.child('app').update({
  version: '2.0',
  name: null
});
*/
// FETCHING DATA

/*firebaseRef.once('value').then( (snapshot) => {
  console.log('Preso l\'intero db', snapshot.val());
}, (e) => {
  console.log('Impossibile fare il fetch dei dati.')
});*/

// Prendo un sotto insieme dei dati (con snapshot.key stampo l'etichetta della proprietà che prelevo)
/*firebaseRef.child('app').once('value').then( (snapshot) => {
  console.log('Dati prelevati', snapshot.key, snapshot.val());
}, (e) => {
  console.log('Impossibile fare il fetch dei dati', e);
});*/

// Ascoltiamo i cambiamenti

/*firebaseRef.on('value', (snapshot) => {
  console.log('Dati cambiati', snapshot.val());
});*/

// se passo una variabile ad off, posso "spegnere" quel particolare listener e non tutti i listener
//firebaseRef.off();

/*firebaseRef.update({
  isRunning: false
});*/

/*var userChangeLog =  (snapshot) => {
  console.log('User name changed', snapshot.val());
};

firebaseRef.child('user').on('value', userChangeLog);

firebaseRef.child('app').update({'name': 'TodoApp'});

firebaseRef.child('user').update({'name':'Lorenzo'});
*/

// ARRAY

firebaseRef.set({
  app: {
    name: 'Todo App',
    version: '1.0.0'
  },
  isRunning: true,
  user: {
    name: 'Federico',
    age: 38
  }
});

// Creo il nodo notes
var notesRef = firebaseRef.child('notes');

notesRef.on('child_added', (snapshot) => {
  console.log('Event child_added:', snapshot.key, snapshot.val());
});

notesRef.on('child_changed', (snapshot) => {
  console.log('Event child_changed:', snapshot.key, snapshot.val());
});

notesRef.on('child_removed', (snapshot) => {
  console.log('Event child_removed:', snapshot.key, snapshot.val());
});
// Prelevo il riferimento all'oggetto che creo nei notes e inserisco il dato
// Anzichè fare i due step classici push e set in due istruzioni separate
// posso concatenarle push().set(...) ma in realtà posso fare solo la push
var newNoteRef = notesRef.push({
  text: 'Walk the dog!'
});
// Stampo l'id
console.log('Todo id:', newNoteRef.key);

var todosRef = firebaseRef.child('todos');
todosRef.on('child_added', (snapshot) => {
  console.log('Added Child', snapshot.key, snapshot.val());
});
todosRef.on('child_changed', (snapshot) => {
  console.log('Changed Child', snapshot.key, snapshot.val());
});
todosRef.on('child_removed', (snapshot) => {
  console.log('Removed Child', snapshot.key, snapshot.val());
});
var todo = todosRef.push({
  text: 'Nuova todo'
}); 
var todo2 = todosRef.push({
  text: 'Altra todo'
});
console.log('Todo 1 Key:', todo.key, 'Todo 2 Key:', todo2.key);