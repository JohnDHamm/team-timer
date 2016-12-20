"use strict";

app.factory("DisplayFactory", function($q) {

	const getDiscIcon = (disc) => {
		let discIcon;
		if (disc === 'run') {
			discIcon = 'directions_run';
		} else if (disc === 'bike') {
				discIcon = 'directions_bike';
			} else discIcon = 'pool';
		return discIcon
	}


return { getDiscIcon };

})
