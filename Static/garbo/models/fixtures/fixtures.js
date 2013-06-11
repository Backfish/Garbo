// map fixtures for this application
steal("can/util/fixture", function(fixture) {
    alert('bajs')
	var store = fixture.store(1, function(i){
		return {
			name: "register "+i,
			description: "register " + i
		}
	});
	
	fixture({
		'POST /register' : store.create
	});

	return store;

	var store = fixture.store(5, function(i){
		return {
			name: "personaldetail "+i,
			description: "personaldetail " + i
		}
	});
	
	fixture({
		'GET /personaldetails' : store.findAll,
		'GET /personaldetails/{id}' : store.findOne,
		'POST /personaldetails' : store.create,
		'PUT /personaldetails/{id}' : store.update,
		'DELETE /personaldetails/{id}' : store.destroy
	});

	return store;

	var store = fixture.store(5, function(i){
		return {
			name: "changepassword "+i,
			description: "changepassword " + i
		}
	});
	
	fixture({
		'GET /changepasswords' : store.findAll,
		'GET /changepasswords/{id}' : store.findOne,
		'POST /changepasswords' : store.create,
		'PUT /changepasswords/{id}' : store.update,
		'DELETE /changepasswords/{id}' : store.destroy
	});

	return store;

	var store = fixture.store(5, function(i){
		return {
			name: "game "+i,
			description: "game " + i
		}
	});
	
	fixture({
		'GET /games' : store.findAll,
		'GET /games/{id}' : store.findOne,
		'POST /games' : store.create,
		'PUT /games/{id}' : store.update,
		'DELETE /games/{id}' : store.destroy
	});

	return store;

	var store = fixture.store(5, function(i){
		return {
			name: "deposit "+i,
			description: "deposit " + i
		}
	});
	
	fixture({
		'GET /deposits' : store.findAll,
		'GET /deposits/{id}' : store.findOne
	});

	return store;

	var store = fixture.store(5, function(i){
		return {
			name: "withdrawal "+i,
			description: "withdrawal " + i
		}
	});
	
	fixture({
		'GET /withdrawals' : store.findAll,
		'GET /withdrawals/{id}' : store.findOne
	});

	return store;
});