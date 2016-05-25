var User = {
  // Enforce model schema in the case of schemaless databases
  schema: true,

  attributes: {
    username  : { type: 'string', unique: true },
    email     : { type: 'email',  unique: true },
    rol:{type:'string', defaultsTo:'0'},
    passports : { collection: 'Passport', via: 'user'},
    
    reserva:{
    	collection:'reserva',
    	via:'cliente'
    }
  }
};

module.exports = User;
