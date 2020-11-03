
const indexCtrl = {};

indexCtrl.renderIndex = (req, res) => {
	console.log('Controller');
	res.render('index');
};

module.exports = indexCtrl;
