/**
 * SessionController
 *
 * @description :: Server-side logic for managing sessions
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var bcryptjs=require('bcryptjs');
module.exports = {
	
	new:function (req,res){
	res.view();
	},

	create:function(req,res,next){
		var	usuario=req.param('txtusuario');
		var	contrasena=req.param('txtpassword');
			if(!usuario || !contrasena){
				var UserNameOrPassword=[{message:'Debe inbresar usuarios y contrasena'}]
				req.session.flash={
					err:UserNameOrPassword
					
				}
				console.log('aa');
				return res.redirect('/session/new');

			}

			Persona.findOneByUsuario(usuario, function personaFounded (err, persona){
				if(err){
					req.session.flash={
						err:err
					}
					return res.redirect( '/persona/show');
				}

				if(!persona){
					var noUserError=[{message:'no existe'}]
				req.session.flash={
					err:noUserError
				}
				return res.redirect('/session/new');
			}

 			bcryptjs.compare(contrasena, persona.encryptedPassword, function passwordsMatch(err,valid){
 					if(err){
 						req.session.flash={
 							err:err
 						}
 						return res.redirect('/session/new');
 					}
 					if(!valid){
 					var passwrodNotMatchError=[{message:'no coinciden las contraseñas'}]
 					req.session.flash={	
					err:passwrodNotMatchError
							}
							return res.redirect('/session/new');
						}
						req.session.autheticated=true;
						req.session.Persona=persona;
						res.redirect('/persona/show/'+persona.id);
				});
		});
		}/*, destroy: function(req,res,next){
			req.session.destroy();
			res.redirect('/session/new');
		}*/
	};	

