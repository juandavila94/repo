/**
 * MesaController
 *
 * @description :: Server-side logic for managing mesas
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {


	new:function (req, res){
		res.view()
	},
	create:function(req, res){
		var mesaObj={
			numero:req.param('txtnumero'),
			capacidad:req.param('txtcapacidad'),
			locacion:req.param('txtlocacion')
			
		}

		Mesa.create(mesaObj,function(err,mesa){
			if(err){ 
				console.log(JSON.stringify(err));
				req.session.flash={
					err:err
				}
				return res.redirect('mesa/new');
			}
				res.redirect('mesa/show/'+mesa.id);
		});
	},
	show: function(req, res, next){
		Mesa.findOne(req.param('id'),function mesaFounded(err,mesa){
			if(err)
				return next(err);
			res.view({
				mesa:mesa
			});
		});

	},
	edit: function(req, res, next){
		Mesa.findOne(req.param('id'),function mesaFounded(err,mesa){
			if(err)
				return next(err);
			if(!mesa)
				return next();
			res.view({
				mesa:mesa
			});
		});

	},


	update:function(req, res, next){
		var mesaObj={
					numero:req.param('txtnumero'),
			capacidad:req.param('txtcapacidad'),
			locacion:req.param('txtlocacion')
		
		}

		Mesa.update(req.param('id'),mesaObj,function mesaUpdated(err,mesa){
			if(err){ 
				req.session.flash={err: err}
				console.log(err);
				return res.redirect('mesa/edit' +req.param('id'));
			}
				res.redirect('mesa/show/'+req.param('id'));
		});
	},

	index:function(req,res,next){
		Mesa.find(function mesaFounded(err,mesas){
			if(err){
				console.log(err);
				return next (err);
			}
			res.view({
				mesas:mesas
			});
		});
	},

	destroy:function (req, res, next){
		Mesa.destroy(req.param('id'), function mesaDestroyed (err){
			if(err){
				console.log(err);
				return next(err);
			}
			res.redirect('/mesa/index');
		});
	}
	
};

