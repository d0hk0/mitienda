import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const Productos = new Mongo.Collection('productos');

if (Meteor.isServer) {
  // This code only runs on the server
  // Only publish tasks that are public or belong to the current user
  Meteor.publish('productos', function productosPublication() {
    return Productos.find({
      $or: [
        { private: { $ne: true } },
        { owner: this.userId },
      ],
    });
  });
}

Meteor.methods({
  'productos.insert'(nombre, unidad, precio) {
    check(nombre, String);
    check(unidad, String);
    check(precio, String);
 
    // Make sure the user is logged in before inserting a task
    if (! this.userId) {
      throw new Meteor.Error('not-authorized');
    }
 
    Productos.insert({
      nombre,
      unidad,
      precio,
      createdAt: new Date(),
      owner: this.userId,
      username: Meteor.users.findOne(this.userId).username,
    });
  },
  'productos.remove'(Id) {
    check(Id, String);
 
    Productos.remove(Id);
  },
  'productos.setChecked'(Id, setChecked) {
    check(Id, String);
    check(setChecked, Boolean);
 
    Productos.update(Id, { $set: { checked: setChecked } });
  },
  'productos.setPrivate'(Id, setToPrivate) {
    check(Id, String);
    check(setToPrivate, Boolean);
 
    const producto = Productos.findOne(Id);
 
    // Make sure only the task owner can make a task private
    if (producto.owner !== this.userId) {
      throw new Meteor.Error('not-authorized');
    }
 
    Productos.update(Id, { $set: { private: setToPrivate } });
  },
});