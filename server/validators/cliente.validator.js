(function() {
'use strict';
	  exports.validateCliente = (req, res, next) => {
        req.checkBody('email', 'email is required').isEmail();
        req.checkBody('phone', 'phone is required').isInt();
        req.getValidationResult().then((result) => {
            if (!result.isEmpty()) {
                return res.status(400).json({errors: result.array()});       
            }
        return next();
        });
    };

}());