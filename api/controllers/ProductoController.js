

module.exports = {
	
	new:function (req, res){
		console.log('entre al formulario');
		res.view()
	},
	create:function(req, res){
		var productoObj={
			nombre:req.param('txtNombre'),
			grasa:req.param('txtgrasa'),
			sal:req.param('txtsal'),
			azucar:req.param('txtazucar')
			
		}

		Producto.create(productoObj,function(err,producto){
			if(err){ 
				console.log(JSON.stringify(err));
				req.session.flash={
					err:err
				}
				return res.redirect('producto/new');
			}
				res.redirect('producto/show/'+producto.id);
		});
	},
	show: function(req, res, next){
		Producto.findOne(req.param('id'),function productoFounded(err,producto){
			if(err)
				return next(err);
			res.view({
				producto:producto
			});
		});

	},
	edit: function(req, res, next){
		Producto.findOne(req.param('id'),function productoFounded(err,producto){
			if(err)
				return next(err);
			if(!producto)
				return next();
			res.view({
				producto:producto
			});
		});

	},


	update:function(req, res, next){
		var productoObj={
			nombre:req.param('txtNombre'),
			grasa:req.param('txtgrasa'),
			sal:req.param('txtsal'),
			azucar:req.param('txtazucar')
		}

		Producto.update(req.param('id'),productoObj,function productoUpdated(err,producto){
			if(err){ 
				req.session.flash={err: err}
				console.log(err);
				return res.redirect('producto/edit' +req.param('id'));
			}
				res.redirect('producto/show/'+req.param('id'));
		});
	},

	index:function(req,res,next){
		Producto.find(function productoFounded(err,productos){
			if(err){
				console.log(err);
				return next (err);
			}
			res.view({
				productos:productos
			});
		});
	},

	destroy:function (req, res, next){
		Producto.destroy(req.param('id'), function productoDestroyed (err){
			if(err){
				console.log(err);
				return next(err);
			}
			res.redirect('/producto/index');
		});
	}


};

