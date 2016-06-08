/**
 * Mesa.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

      numero:{
        
         type:'int',required:true
      },
      
      capacidad:{
        type:'int',required:true,defaultsTo:2
      },

      locacion:{
        type:'string',required:true,defaultsTo:'salon central'
      }
      // ,

      // reservas:{
      // 	collection:'reserva',
      //   via:'mesas'
      // }
  }
};

