window.$ = window.jQuery = require('jquery');
require('bootstrap');
var fn = require('./functions');
for (var i in fn) {
	window[i] = fn[i];
}

$(document).ready(function() {
	$('#titleScreen').modal({
		backdrop: "static",
		keyboard: false,
	});

	/*$('#characterCreatorScreen').modal({
		//backdrop: "static",
		keyboard: false,
	});*/
	//var lv = new LoginValidator();
	//var lc = new LoginController();

	// main login form //

	$('#signInForm').submit(function() {
		$.ajax({
			url: "/8100/signIn",
			type: "POST",
			dataType: 'json',
			data: {
				username: $('#signInUsername').val(),
				password: $('#signInPassword').val(),
				rememberMe: $('#signInRememberMe').is(':checked')
			},
			success: function(responseText) {
				alert("success");
				// TODO: CLEAR FORM
				$('#signInSignUpWindow').modal("hide");
				checkifSignedIn();
			},
			error: function(e) {
				console.log(e);
				alert(e);
			}
		});
		return false;
	});
	$('#signInUsername').focus();




	$('#signUpForm').submit(function() {
		$.ajax({
			url: "/8100/signUp",
			type: "POST",
			dataType: 'json',
			data: {
				email: $('#signUpEmail').val(),
				username: $('#signUpUsername').val(),
				password: $('#signUpPassword').val()
			},
			success: function(responseText) {
				alert("success");
				// TODO: CLEAR FORM
				$('#signInSignUpWindow').modal("hide");
				checkifSignedIn();
			},
			error: function(e) {
				var errors = e.responseText.replace(/[\[\]']+/g, '').match(/[^,]+,[^,]+/g);
				if (errors == null) {
					this.success();
					return;
				}
				alert(e);
			}
		});
		return false;
	});

	$('#signInEmail').focus();















	function checkifSignedIn() {
		if (typeof getCookie('username') !== "undefined" && typeof getCookie('password') != "undefined") {
			console.log("signed in as: " + getCookie('username'));
			$("#ls").css('display', 'none');
			$("#playGuest").css('display', 'none');
			$("#playGuest").css('text-align', 'center');

			$("#guest-ls").html("Signed in as: " + getCookie('username'));
			//$("#playBtn")[0].disabled = false;


			var signOut = $('<input id="signOut" type="button" style="float: right; margin-bottom: 4px;" value="signOut" class="btn btn-info"/>');
			$("#guest-ls").append(signOut);
			$("#signOut").on('click', function(event) {
				$.ajax({
					url: "/8100/signOut",
					type: "POST",
					dataType: 'json',
					complete: function() {
						window.location.reload();
					}
				});
			});

			$("#characterSelector").html('');




			$.ajax({
				url: "/8100/getCharacters",
				type: "POST",
				dataType: 'json',
				data: {},
				success: function(responseText, status, xhr, $form) {
					//console.log(responseText);
					var characters = responseText;

					var charInfo = '';


					for (var i in characters) {

						var char = characters[i];


						charInfo += '\
									<div class="col-xs-6 col-md-4">\
										<label class="radio-thumbnail text-center">\
											<input class="whichChar" value="' + char.username + '" type="radio" name="radios">\
											<div class="thumbnail">\
												<img src="./img/snow1.jpg" alt="...">\
												<div class="caption">\
													<h5>' + char.username + '</h5>\
													<h5>Lvl ' + char.level + ' ' + char.class + '</h5>\
												</div>\
											</div>\
										</label>\
									</div>\
						';
						//$("#guest-ls").after(charInfo);



					}

					var characterSel = $(charInfo);
					//$("#guest-ls").after(characterSel);
					$("#characterSelector").html(characterSel);

					$('.whichChar').on('click', function() {
						$("#playBtn")[0].disabled = false;
					});



				},
				error: function(error) {
					//console.log(error);
				}
			});

			/*$('.whichChar').on('click', function(){
				$("#playBtn")[0].disabled = false;
			});*/





			if (typeof $('#char') != "undefined") {
				//onclick="$('#settings, #instructions').toggle();return false;" class="btn btn-info btn-settings">
				var addButton = $('\
					<div id="char" class="form-group">\
						<button id="addCharacter" type="button" class="btn btn-lg btn-info">\
							<i class="glyphicon glyphicon-plus-sign"></i>\
						</button>\
					</div>\
				');
				//$("#guest-ls").after(addButton);
				$("#characterSelector").append(addButton);

				$("#addCharacter").on('click', function() {
					//$("#addCharacter").remove();
					$('#characterCreatorScreen').modal({
						//backdrop: "static",
						keyboard: false,
					});
				});

			}


			// NOT Signed IN
		} else {
			console.log('not signed in');
			$("#playBtn")[0].disabled = true;

			/*var character = $("#characterSelector").find(':input:checked')[0];
			if(typeof character == "undefined") {
				$("#playBtn")[0].disabled = true;
				console.log("test");
			}*/

		}
	}
	checkifSignedIn();









	$('.whichChar').on('click', function() {
		$("#playBtn")[0].disabled = false;
	});


	$('#characterCreatorForm').submit(function() {
		var CCClass = $("#classSelector").find(':input:checked')[0].value;
		var CCName = $("#CCName")[0].value;

		$.ajax({
			url: "/8100/createCharacter",
			type: "POST",
			dataType: 'json',
			data: {
				class: CCClass,
				name: CCName,
			},
			success: function(responseText, status, xhr, $form) {
				alert("success");
				$('#characterCreatorScreen').modal("hide");
				checkifSignedIn();
			},
			error: function(e) {
				
			}
		});


		return false;
	});
});