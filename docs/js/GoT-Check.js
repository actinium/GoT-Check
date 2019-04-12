var session = pl.create();
session.consult( "got.pl" );

session.query( "parent(rickard_stark, X)." );

var query = document.getElementById('query');
var result = document.getElementById('result');

query.addEventListener("keyup", function(event) {
	if (event.keyCode === 13) {
		event.preventDefault();
		run_query();
	}
});

function run_query(){
	while (result.firstChild) {
		result.removeChild(result.firstChild);
	}
	session.query( query.value );
	session.answer(callback);
}

var callback = function(x){
	if(!x){
		if(!result.firstChild){
			var element = document.createElement('p');
			element.innerText = pl.format_answer(x);
			result.appendChild(element);
		}
		return;
	}
	var element = document.createElement('p');
	element.innerText = pl.format_answer(x);
	result.appendChild(element);
	session.answer(callback);
}