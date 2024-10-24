const { body, validationResult } = require('express-validator')

const validateBookBody = [
    body('asin')
        .isString()
        .notEmpty()
        .withMessage('Asin is not valid, must be a string'),
    
    body('title')
        .isString()
        .notEmpty()
        .withMessage('Title is not valid. must be a string'),
    body('img')
        .isURL()
        .notEmpty()
        .withMessage('Img is not valid. must be a string'),
    body('price')
        .isDecimal()
        .notEmpty()
        .withMessage('Price is not valid. must be a number'),
    body('category')
        .isString()
        .notEmpty()
        .withMessage('Category is not valid. must be a string'),
    
    (req, res, next) => {
        const errors = validationResult(req)

        if (!errors.isEmpty()) {
            return res
                .status(400)
                .send({
                    statusCode: 400,
                    message: "validation failled",
                    errors: errors.array()
                })
        }

        next()
    }
    
    
]

module.exports = validateBookBody