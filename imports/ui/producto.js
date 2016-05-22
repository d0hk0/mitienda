import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
 
import { Productos } from '../api/productos.js';
 
import './producto.html';

Template.producto.helpers({
  isOwner() {
    return this.owner === Meteor.userId();
  },
});
 
Template.producto.events({
  'click .toggle-checked'() {
    // Set the checked property to the opposite of its current value
    Meteor.call('productos.setChecked', this._id, !this.checked);
  },
  'click .delete'() {
    Meteor.call('productos.remove', this._id);
  },
  'click .toggle-private'() {
    Meteor.call('productos.setPrivate', this._id, !this.private);
  },
});