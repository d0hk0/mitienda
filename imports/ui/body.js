import { Template } from 'meteor/templating';
 
import { Productos } from '../api/productos.js';
 
import './body.html';
 
Template.body.helpers({
  productos() {
  	//console.log(Productos.find({}).count());
  	//console.log(Productos.find({}));
    return Productos.find({});
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
});