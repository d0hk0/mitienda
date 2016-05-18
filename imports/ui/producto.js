import { Template } from 'meteor/templating';
 
import { Productos } from '../api/producto.js';
 
import './producto.html';
 
Template.producto.events({
  'click .toggle-checked'() {
    // Set the checked property to the opposite of its current value
    Productos.update(this._id, {
      $set: { checked: ! this.checked },
    });
  },
  'click .delete'() {
    Productos.remove(this._id);
  },
});