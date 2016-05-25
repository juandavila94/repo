/**
 * Platillo.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

  	 nombre:{
        
         type:'string',required:true,defaultsTo:'-'
      },
      
      precio:{
        type:'float',required:true,defaultsTo:'0.00'
      },

      productos: {
      collection: 'producto',
      via: 'platillos',
      dominant: true
  }
}
};

