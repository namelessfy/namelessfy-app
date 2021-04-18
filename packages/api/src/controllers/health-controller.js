const checkServerStatus = async (req, res) => {
	const healthcheck = {
		uptime: process.uptime(),
		message: 'OK',
		timestamp: Date.now()
	};
	try {
		res.send(healthcheck);
	} catch (e) {
		healthcheck.message = `${e}`;
		res.status(503).send(healthcheck.message);
	}
}

module.exports = { checkServerStatus };
