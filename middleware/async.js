'use strict';

// approach to try/catch errors on routes.
// it should be pass as an args

// router.get('/', asyncMiddleWare(async (req, res) => {
//  const genres = await Genre.find().sort('name');
//	res.send(genres);
// }));
module.exports = function asyncMiddleWare(handler) {
	return async (req, res, next) => {
		try {
			await handler(req, res);
		} catch (error) {
			next(error);
		}
	}
}