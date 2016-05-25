/**
 * Reserva.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
  	fecha:{
        type:'date',required:true
        
      },
      
      hora:{
        
         type:'string',required:true,defaultsTo:'00:00'
      },

      cliente:{

      	model:'user'
      },

      numpersonas:{
        type:'int',required:true,defaultsTo:'1'
      },

      anombre:{
         type:'string',required:true
      },

      mesas:{
      	collection:'mesa',
      	via:'reservas',
         dominant: true

      }
  }
};

