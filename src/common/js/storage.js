function put (col, key, val) {
	var collection = (window.localStorage[col] && JSON.parse(window.localStorage[col])) || {};
	collection[key] = val;
	window.localStorage[col] = JSON.stringify(collection);
}
function out (col, key) {
	if(!window.localStorage[col]) return undefined;
	var collection = JSON.parse(window.localStorage[col]);
	return collection[key];
}

function collection_put (col, sel, key, val) {
	var collection = (window.localStorage[col] && JSON.parse(window.localStorage[col])) || {};
	var seller = collection[sel] || {};
	seller[key] = val;
	collection[sel] = seller;
	window.localStorage[col] = JSON.stringify(collection);
}

function collection_out (col, seller, key) {
	if(!window.localStorage[col]) return undefined;
	var collection = JSON.parse(window.localStorage[col]);
	if(!collection[seller]) return undefined;
	var seller = collection[seller];
	return seller[key];
}

export {put, out, collection_put, collection_out}