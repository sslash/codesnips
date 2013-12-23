// Populate test db
for (var i = 0; i < 100; i++){

	var usr = db.users.findOne({});

	db.snippets.save({
		owner : usr._id,
		title: 'Le Swag Title #' + i,
		description: 'Ey yo lo this is le crackin snip yo. Sup liek cray neat stuff yeah bud thats wazzup yo num ' + i,
			code: 'function CatMaker(name) {\n' + 
			    'return {\n' +
			        'speak: function () {\n'+
			            'console.log("Miaow my name is " + name);\n' + 
			        '}\n'+
			    '};\n'+
			'}\n'+
			'var catNames = ["Charlie", "Fluffy", "Mouse"];\n'+
			'var cats = _.map(catNames, function (name) {\n'+
			    'return CatMaker(name);\n'+
			'});\n'+
			'_.each(cats, function (cat) {\n'+
			    'cat.speak();\n'+
			'});',
		tags: ['Underscore','Functional Programming', 'Map'],
		category: 'JavaScript',
		timeCreated: new Date(),
	});
}