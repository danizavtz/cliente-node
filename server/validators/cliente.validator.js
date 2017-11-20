(function() {
'use strict';
	  exports.validateCliente = (req, res, next) => {
        req.checkBody('email', 'email is required').notEmpty();
        req.checkBody('phone', 'phone is required').notEmpty();
        req.getValidationResult().then((result) => {
            if (!result.isEmpty()) {
                return res.status(400).json({errors: result.array()});       
            }
        return next();
        });
    };

}());