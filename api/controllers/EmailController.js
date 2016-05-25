/**
 * EmailController
 *
 * @description :: Server-side logic for managing emails
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	sendEmail: function(req, res) {

		// sails.hooks.email.send(template, data, options, cb)
		sails.hooks.email.send(
		  "testEmail",
		  {
		    recipientName: "",
		    senderName: "Lucia Restaurant ®",
		  	dia: "x",
		    hora:"x",
		    personas:"x",
		    mesas:"x"
		  },
		  {
		    from: "Lucia Restaurant",
		    to: "jadavila@udlanet.ec",
		    subject: "Informacion de la reservación"

		  },
		  function(err) {console.log(err || "Email is sent");}
		)		
		
		
	}
};

