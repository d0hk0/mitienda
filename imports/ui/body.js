import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';

import { Productos } from '../api/productos.js';

import './producto.js'; 
import './body.html';
 

Template.body.onCreated(function bodyOnCreated() {
  this.state = new ReactiveDict();
});
 
Template.body.helpers({
  productos() {
  	//console.log(Productos.find({}).count());
  	//console.log(Productos.find({}));
    const instance = Template.instance();
    if (instance.state.get('hideDisable')) {
      // If hide disable is checked, filter tasks
      return Productos.find({ checked: { $ne: true } }, { sort: { nombre: 1 } });
    }
    // Otherwise, return all of the tasks

    return Productos.find({}, { sort: { nombre: 1 } });
  },

  incompleteCount() {
    return Productos.find({ checked: { $ne: true } }).count();
  },
});


Template.body.events({
  'submit .new-producto'(event) {
    // Prevent default browser form submit
    event.preventDefault();
 
    // Get value from form element
    const target = event.target;
    const nombre = target.nombre.value;
    const unidad = target.unidad.value;
    const precio = target.precio.value;
 
    // Insert a producto into the collection
    Productos.insert({
      nombre,
      unidad,
      precio,
      createdAt: new Date(), // current time
    });
 
    // Clear form
    target.nombre.value = '';
    target.unidad.value = '';
    target.precio.value = '';
  },

  'change .hide-disable input'(event, instance) {
    instance.state.set('hideDisable', event.target.checked);
  },
});