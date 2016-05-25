/**
 * PersonaController
 *
 * @description :: Server-side logic for managing personas
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	
	new:function (req, res){
		console.log('entre al formulario');
		res.view()
	},
	create:function(req, res){
		var personaObj={
			nombre:req.param('txtNombre'),
			apellido:req.param('txtApellido'),
			usuario:req.param('txtUsuario'),
			contrasena:req.param('txtContrasenia'),
			email:req.param('txtEmail'),
			password:req.param('password'),
			passwordConfirmation: req.param('passwordConfirmation')
		/*txtNombre:req.param('nombre'),
			txtApellido:req.param('apellido'),
			txtUsuario:req.param('usuario'),
			txtContrasenia:req.param('contrasena'),
			txtEmail:req.param('email')*/
		}

		Persona.create(personaObj,function(err,persona){
			if(err){ 
				console.log(JSON.stringify(err));
				req.session.flash={
					err:err
				}
				return res.redirect('persona/new');
			}
				res.redirect('persona/show/'+persona.id);
		});
	},
	show: function(req, res, next){
		Persona.findOne(req.param('id'),function personaFounded(err,persona){
			if(err)
				return next(err);
			res.view({
				persona:persona
			});
		});

	},
	edit: function(req, res, next){
		Persona.findOne(req.param('id'),function personaFounded(err,persona){
			if(err)
				return next(err);
			if(!persona)
				return next();
			res.view({
				persona:persona
			});
		});

	},


	update:function(req, res, next){
		var personaObj={
			nombre:req.param('txtNombre'),
			apellido:req.param('txtApellido'),
			usuario:req.param('txtUsuario'),
			contrasena:req.param('txtContrasenia'),
			email:req.param('txtEmail')
		}

		Persona.update(req.param('id'),personaObj,function personaUpdated(err,persona){
			if(err){ 
				req.session.flash={err: err}
				console.log(err);
				return res.redirect('persona/edit' +req.param('id'));
			}
				res.redirect('persona/show/'+req.param('id'));
		});
	},

	index:function(req,res,next){
		Persona.find(function personaFounded(err,personas){
			if(err){
				console.log(err);
				return next (err);
			}
			res.view({
				personas:personas
			});
		});
	},

	destroy:function (req, res, next){
		Persona.destroy(req.param('id'), function personaDestroyed (err){
			if(err){
				console.log(err);
				return next(err);
			}
			res.redirect('/persona/index');
		});
	}/*,

	goAdmin : function(req,res,next){
		if(!req.user){
			res.redirect()ñ
		}else if(req.user.rol !== "1"){

		}*/


};

