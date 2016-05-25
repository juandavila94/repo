/**
 * ReservaController
 *
 * @description :: Server-side logic for managing reservas
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	
new:function (req, res){
		console.log('entre al formulario');
		res.view()
	},
	create:function(req, res){
		var reservaObj={
			fecha:req.param('txtfecha'),
			hora:req.param('txthora'),
			anombre:req.param('txtanombre'),
			numpersonas:req.param('txtnumpersonas'),
			cliente:req.param('20')
			
		}

		Reserva.create(reservaObj,function(err,reserva){
			if(err){ 
				console.log(JSON.stringify(err));
				req.session.flash={
					err:err
				}
				return res.redirect('reserva/new');
			}
				res.redirect('reserva/show/'+reserva.id);
		});
	},

	createxcliente:function(req, res){
		var userObj={id:req.user.id}
		var mesaObj1={id:1}
		var mesaObj2={id:2}
		var mesaObj3={id:3}
		var mesaObj4={id:4}
		var mesaObj5={id:5}
		var mesaObj6={id:6}
		var mesasArray = [];
		var cantidad=req.param('txtnumpersonas');
		if(cantidad<=5){mesasArray=[mesaObj1];}
			else if(cantidad<=10&&cantidad>5){mesasArray=[mesaObj1,mesaObj2];}
			else if(cantidad<=15&&cantidad>10){mesasArray=[mesaObj1,mesaObj2,mesaObj3];}
			else if(cantidad<=20&&cantidad>15){mesasArray=[mesaObj1,mesaObj2,mesaObj3,mesaObj4];}
			else if(cantidad<=25&&cantidad>20){mesasArray=[mesaObj1,mesaObj2,mesaObj3,mesaObj4,mesaObj5];}
		var reservaObj={
			fecha:req.param('txtfecha'),
			hora:req.param('txthora'),
			anombre:req.param('txtanombre'),
			numpersonas:req.param('txtnumpersonas'),
			cliente:userObj,
			/*if(numpersonas<=5){mesasArray=[mesaObj1];}
			else if(numpersonas<=10&&numpersonas>5){mesasArray=[mesaObj1,mesaObj2];}
			else if(numpersonas<=15&&numpersonas>10){mesasArray=[mesaObj1,mesaObj2,mesaObj3];}
			else if(numpersonas<=20&&numpersonas>15){mesasArray=[mesaObj1,mesaObj2,mesaObj3,mesaObj4];}
			else if(numpersonas<=25&&numpersonas>20){mesasArray=[mesaObj1,mesaObj2,mesaObj3,mesaObj4,mesaObj5];}*/
			mesas:mesasArray
		}

		Reserva.create(reservaObj,function(err,reserva){
			if(err){ 
				console.log(JSON.stringify(err));
				req.session.flash={
					err:err
				}

				return res.redirect('reserva/new');
			}
			// Reserva.findOne(2).exec(function(err, reserva) {
 		// 		 if(err)
			// 	 reserva.mesas.add(1);
			// 	 reserva.save(function(err) {});
			// 	 });
			var names = mesasArray.map(function(item) {
   				 return item['id'];
					});
			sails.hooks.email.send("testEmail",{
		    recipientName: req.user.username,
		    senderName: "Lucia Restaurant ®",
		    dia: req.param('txtfecha'),
		    hora:req.param('txthora'),
		    personas:req.param('txtnumpersonas'),
		    mesas:names
		 
		  },
		  {
		    from: "Lucia Restaurant",
		    to: "jadavila@udlanet.ec",
		    subject: "Informacion de la reservación"
		  },
		  function(err) {console.log(err || "Email is sent");});
				res.redirect('reserva/exito/'+reserva.id);
		});

	
	},

	show: function(req, res, next){
		Reserva.findOne(req.param('id'),function reservaFounded(err,reserva){
			if(err)
				return next(err);
			res.view({
				reserva:reserva
			});
		});

	},
	exito: function(req, res, next){
		Reserva.findOne(req.param('id')).populate('mesas').exec(function reservaFounded(err,reserva){
			if(err)
				return next(err);
			console.log(reserva);
			res.view({
				reserva:reserva
			});
		});



	},
	edit: function(req, res, next){
		Reserva.findOne(req.param('id'),function reservaFounded(err,reserva){
			if(err)
				return next(err);
			if(!reserva)
				return next();
			res.view({
				reserva:reserva
			});
		});

	},


	update:function(req, res, next){
		var reservaObj={
		fecha:req.param('txtfecha'),
			hora:req.param('txthora'),
			anombre:req.param('txtanombre'),
			numpersonas:req.param('txtnumpersonas'),
			cliente:req.param.user.id
		}

		Reserva.update(req.param('id'),reservaObj,function reservaUpdated(err,reserva){
			if(err){ 
				req.session.flash={err: err}
				console.log(err);
				return res.redirect('reserva/edit' +req.param('id'));
			}
				res.redirect('reserva/show/'+req.param('id'));
		});
	},

	index:function(req,res,next){
		Reserva.find(function reservaFounded(err,reservas){
			if(err){
				console.log(err);
				return next (err);
			}
			res.view({
				reservas:reservas
			});
		});
	},

	destroy:function (req, res, next){
		Reserva.destroy(req.param('id'), function reservaDestroyed (err){
			if(err){
				console.log(err);
				return next(err);
			}
			res.redirect('/reserva/index');
		});
	}

};

