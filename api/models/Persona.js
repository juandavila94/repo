/**
 * Persona.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
	nombre:{
        type:'string',required:true,defaultsTo:'Sin nombre'
        
      },
      
      apellido:{
        
         type:'string',required:true,defaultsTo:'Sin apellido'
      },
      
      usuario:{
        type:'string',required:true,unique:true
      },
      
      contrasena:{
         type:'string',required:true
      },
      
      email:{
        type:'email',required:true
      },

     password:{
        type:'string',required:true
      },

      passwordConfirmation:{
        type:'string',required:true
      },

      encryptedPassword:{
        type:'string'
      },

      toJSON: function(){
        var obj= this.toObject();
        delete obj.password;
        delete obj._csrf;
        delete obj.passwordConfirmation;
        return obj;
      }

  },

  beforeCreate: function (values,next){
    console.log('before created')
    var password = values.password;
    var passwordConfirmation=values.passwordConfirmation;
    console.log(password+ "+"+passwordConfirmation);
    if(!password || !passwordConfirmation || password != values.passwordConfirmation){
    var passwordNotMatchError= [{
        name: 'passwordNotMatch',
        message: 'Las contraseñas deben ser iguales'
    }]
      return next
      ({
        err:passwordNotMatchError
      });
    }

      require( 'bcryptjs').hash(values.password, 10, function passwordEncrypted(err, encryptedPassword){
        values.encryptedPassword=encryptedPassword;
       
        next();
      });

  }



};

