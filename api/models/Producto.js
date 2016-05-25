/**
 * Producto.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

  	nombre:{
        type:'string',required:true,defaultsTo:'Sin nombre'
        
      },
      
      grasa:{
        
         type:'int',required:true,defaultsTo:'-'
      },
      
      sal:{
        type:'int',required:true,defaultsTo:'-'
      },
      
      azucar:{
         type:'int',required:true,defaultsTo:'-'
      },

      platillos: {
      collection: 'platillo',
      via: 'productos'
    }
  }
};

