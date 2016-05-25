/**
 * PlatilloController
 *
 * @description :: Server-side logic for managing platilloes
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

	new:function (req, res){
		res.view()
	},
	create:function(req, res){
		var platilloObj={
			nombre:req.param('txtNombre'),
			precio:req.param('txtprecio')
		
			
		}

		Platillo.create(platilloObj,function(err,platillo){
			if(err){ 
				console.log(JSON.stringify(err));
				req.session.flash={
					err:err
				}
				return res.redirect('platillo/new');
			}
				res.redirect('platillo/show/'+platillo.id);
		});
	},
	show: function(req, res, next){
		Platillo.findOne(req.param('id'),function platilloFounded(err,platillo){
			if(err)
				return next(err);
			res.view({
				platillo:platillo
			});
		});

	},
	edit: function(req, res, next){
		Platillo.findOne(req.param('id'),function platilloFounded(err,platillo){
			if(err)
				return next(err);
			if(!platillo)
				return next();
			res.view({
				platillo:platillo
			});
		});

	},


	update:function(req, res, next){
		var platilloObj={
					nombre:req.param('txtNombre'),
			precio:req.param('txtprecio')
		
		}

		Platillo.update(req.param('id'),platilloObj,function platilloUpdated(err,platillo){
			if(err){ 
				req.session.flash={err: err}
				console.log(err);
				return res.redirect('platillo/edit' +req.param('id'));
			}
				res.redirect('platillo/show/'+req.param('id'));
		});
	},

	index:function(req,res,next){
		Platillo.find(function platilloFounded(err,platillos){
			if(err){
				console.log(err);
				return next (err);
			}
			res.view({
				platillos:platillos
			});
		});
	},

	destroy:function (req, res, next){
		Platillo.destroy(req.param('id'), function platilloDestroyed (err){
			if(err){
				console.log(err);
				return next(err);
			}
			res.redirect('/platillo/index');
		});
	}
	
};

