window.$ = window.jQuery = require('jquery');
require('bootstrap');
var fn = require('./functions');
for(var i in fn) {
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

	$('#login-form').submit(function() {
		$.ajax({
			url: "/8100/",
			type: "POST",
			dataType: 'json',
			data: {
				username: $('#lmail').val(),
				password: $('#lpass').val(),
				rememberMe: $('#lremember').is(':checked')
			},
			success: function(responseText, status, xhr, $form) {
				error("login", "username", false);
				error("login", "password", false);
				alert("success");
				// TODO: CLEAR FORM
				$('#loginSignUpWindow').modal("hide");
				checkifLoggedIn();
			},
			error: function(e) {
				/*if(e.responseText == "ok") {
					error("login", "username", false);
					error("login", "password", false);
					alert("success");
					// TODO: CLEAR FORM
					$('#loginSignUpWindow').modal("hide");
					checkifLoggedIn();
					//$('.cd-user-modal').removeClass('is-visible');
					return;
				}*/
				
				var errors = e.responseText.replace(/[\[\]']+/g,'').match(/[^,]+,[^,]+/g);
				for(var i = 0; i < errors.length; i++){
					errors[i] = JSON.parse(errors[i]);
				}
				
				var errorTypes = "";
				for(var i = 0; i < errors.length; i++) {
					error("login", errors[i].field, true, errors[i].msg);
					errorTypes += errors[i].field;
				}
				if(errorTypes.indexOf("username") == -1) {
					error("login", "username", false);
				}
				if(errorTypes.indexOf("password") == -1) {
					error("login", "password", false);
				}
			}
		});
		return false;
	});
	$('#lmail').focus();
	
	
	
	
	$('#signup-form').submit(function() {
		$.ajax({
			url: "/8100/signup",
			type: "POST",
			dataType: 'json',
			data: {
				email: $('#smail').val(),
				username: $('#suser').val(),
				password: $('#spass').val()
			},
			success: function(responseText, status, xhr, $form) {
				error("signup", "email", false);
				error("signup", "username", false);
				error("signup", "password", false);
				// TODO: CLEAR FORM
				$('#loginSignUpWindow').modal("hide");
				alert("success");
				checkifLoggedIn();
			},
			error: function(e) {
				var errors = e.responseText.replace(/[\[\]']+/g,'').match(/[^,]+,[^,]+/g);
				if(errors == null) {
					this.success();
					//error("signup", "email", false);
					//error("signup", "username", false);
					//error("signup", "password", false);
					//alert("success");
					return;
				}
				alert(e);
				
				/*for(var i = 0; i < errors.length; i++){
					errors[i] = JSON.parse(errors[i]);
				}
				var errorTypes = "";
				for(var i = 0; i < errors.length; i++) {
					error("signup", errors[i].field, true, errors[i].msg);
					errorTypes += errors[i].field;
				}
				if(errorTypes.indexOf("email") == -1) {
					error("signup", "email", false);
				}
				if(errorTypes.indexOf("username") == -1) {
					error("signup", "username", false);
				}
				if(errorTypes.indexOf("password") == -1) {
					error("signup", "password", false);
				}*/
			}
		});
		return false;
	});

	$('#smail').focus();
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	function checkifLoggedIn() {
		if(typeof getCookie('user') !== "undefined" && typeof getCookie('pass') != "undefined") {
			console.log("logged in as: " + getCookie('user'));
			$("#ls").css('display', 'none');
			$("#playGuest").css('display', 'none');
			$("#playGuest").css('text-align', 'center');
			
			$("#guest-ls").html("logged in as: " + getCookie('user'));
			//$("#playBtn")[0].disabled = false;
			
			
			var logout = $('<input id="logout" type="button" style="float: right; margin-bottom: 4px;" value="logout" class="btn btn-info"/>');
			$("#guest-ls").append(logout);
			$("#logout").on('click', function(event) {
				$.ajax({
					url: "/8100/logout",
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
				data: {
				},
				success: function(responseText, status, xhr, $form) {
					//console.log(responseText);
					var characters = responseText;
					
					var charInfo = '';
					
					
					for(var i in characters) {
						
						var char = characters[i];
						
						
						charInfo += '\
									<div class="col-xs-6 col-md-4">\
										<label class="radio-thumbnail text-center">\
											<input class="whichChar" value="'+char.username+'" type="radio" name="radios">\
											<div class="thumbnail">\
												<img src="./img/snow1.jpg" alt="...">\
												<div class="caption">\
													<h5>'+char.username+'</h5>\
													<h5>Lvl '+char.level+' '+char.class+'</h5>\
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
					
					$('.whichChar').on('click', function(){
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

			
			
			
			
			if(typeof $('#char') != "undefined"){
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

				$("#addCharacter").on('click', function(){
					//$("#addCharacter").remove();
					$('#characterCreatorScreen').modal({
						//backdrop: "static",
						keyboard: false,
					});
				});
				
			}
			
			
		// NOT LOGGED IN
		} else {
			console.log('not logged in');
			$("#playBtn")[0].disabled = true;
			
			/*var character = $("#characterSelector").find(':input:checked')[0];
			if(typeof character == "undefined") {
				$("#playBtn")[0].disabled = true;
				console.log("test");
			}*/
			
		}
	}
	checkifLoggedIn();
	
	
	
	
	
	
	
	
	
	$('.whichChar').on('click', function(){
		$("#playBtn")[0].disabled = false;
	});
	
	
	
	
	
	
	//$(".btn-group").find(':input:checked')[0].value
	//$("#CCName")[0].value
	
	
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
				checkifLoggedIn();
			},
			error: function(e) {
				//if(e.responseText == "success") {
					//error("login", "username", false);
					//error("login", "password", false);
					/*alert("success");
					// TODO: CLEAR FORM
					$('#characterCreatorScreen').modal("hide");
					checkifLoggedIn();
					//$('.cd-user-modal').removeClass('is-visible');
					return;*/
				//}
			}
		});
		
		
		return false;
		
		
	});
	
	
	
	
	
	
	
	

	// login retrieval form via email //

	//var ev = new EmailValidator();

	/*$('#get-credentials-form').ajaxForm({
		url: '/lost-password',
		beforeSubmit : function(formData, jqForm, options){
			if (ev.validateEmail($('#email-tf').val())){
				ev.hideEmailAlert();
				return true;
			}	else{
				ev.showEmailAlert("<b> Error!</b> Please enter a valid email address");
				return false;
			}
		},
		success	: function(responseText, status, xhr, $form){
			ev.showEmailSuccess("Check your email on how to reset your password.");
		},
		error : function(){
			ev.showEmailAlert("Sorry. There was a problem, please try again later.");
		}
	});*/

	/*var $form_modal = $('.cd-user-modal'),
		$form_login = $('.cd-user-modal').find('#cd-login'),//$form_modal.find('#cd-login')
		$form_signup = $('.cd-user-modal').find('#cd-signup'),//$form_modal.find('#cd-signup')
		$form_csubd = $('.cd-user-modal').find('#cd-csubd'),//$form_modal
		$form_forgot_password = $('.cd-user-modal').find('#cd-reset-password'),//$form_modal
		$form_modal_tab = $('.cd-switcher'),
		$tab_login = $form_modal_tab.children('li').eq(0).children('a'),
		$tab_signup = $form_modal_tab.children('li').eq(1).children('a'),
		$forgot_password_link = $form_login.find('.cd-form-bottom-message a'),
		$back_to_login_link = $form_forgot_password.find('.cd-form-bottom-message a'),
		$main_nav = $('.main-nav'); // $('.main-nav');*/


	var $form_modal = $('.cd-user-modal'),
		$form_login = $form_modal.find('#cd-login'),
		$form_signup = $form_modal.find('#cd-signup'),
		$form_csubd = $form_modal.find('#cd-csubd'),
		$form_forgot_password = $form_modal.find('#cd-reset-password'),
		$form_modal_tab = $('.cd-switcher'),
		$tab_login = $form_modal_tab.children('li').eq(0).children('a'),
		$tab_signup = $form_modal_tab.children('li').eq(1).children('a'),
		$forgot_password_link = $form_login.find('.cd-form-bottom-message a'),
		$back_to_login_link = $form_forgot_password.find('.cd-form-bottom-message a'),
		$main_nav = $('.main-nav'); // $('.main-nav');

	//open modal
	/*$('.main-nav').on('click', function(event) { //$main_nav

		if ($(event.target).is($('.cd-signin')) || $(event.target).is($('.cd-signup')) || $(event.target).is($main_nav)) {
			if ($(event.target).is($main_nav)) {
				// on mobile open the submenu
				$('.main-nav').children('ul').toggleClass('is-visible'); //this
			} else {
				// on mobile close submenu
				$('.main-nav').children('ul').removeClass('is-visible'); //$main_nav
				//show modal layer
				$('.cd-user-modal').addClass('is-visible'); //$form_modal
				//show the selected form
				($(event.target).is('.cd-signup')) ? signup_selected(): login_selected();
			}
		}
	});*/
	
	/*function popup() {
		$('.main-nav').children('ul').removeClass('is-visible'); //$main_nav
		$('.cd-user-modal').addClass('is-visible'); //$form_modal
		
		$('.cd-user-modal').find('#cd-login').addClass('is-selected'); //$form_login
		$('.cd-user-modal').find('#cd-signup').removeClass('is-selected'); //$form_signup
		$('#cd-reset-password').removeClass('is-selected');
		$('#cd-new-password').removeClass('is-selected');
		
		$('.cd-switcher').children('li').eq(0).children('a').addClass('selected'); //$tab_login
		$('.cd-switcher').children('li').eq(1).children('a').removeClass('selected'); //$tab_signup
	}*/
	

	/*$('.main-nav').children('ul').removeClass('is-visible'); //$main_nav
	$('.cd-user-modal').addClass('is-visible'); //$form_modal
	$('.cd-user-modal').find('#cd-login').addClass('is-selected'); //$form_login
	$('.cd-user-modal').find('#cd-signup').removeClass('is-selected'); //$form_signup
	$('.cd-user-modal').find('#cd-login').find('.cd-form-bottom-message a').removeClass('is-selected'); //$form_forgot_password
	$('.cd-switcher').children('li').eq(0).children('a').addClass('selected'); //$tab_login
	$('.cd-switcher').children('li').eq(1).children('a').removeClass('selected'); //$tab_signup*/
	
	$('#ls').on('click', function() {
		$('.main-nav').children('ul').removeClass('is-visible'); //$main_nav
		$('.cd-user-modal').addClass('is-visible'); //$form_modal

		$('.cd-user-modal').find('#cd-login').addClass('is-selected'); //$form_login
		$('.cd-user-modal').find('#cd-signup').removeClass('is-selected'); //$form_signup
		$('#cd-reset-password').removeClass('is-selected');
		$('#cd-new-password').removeClass('is-selected');

		$('.cd-switcher').children('li').eq(0).children('a').addClass('selected'); //$tab_login
		$('.cd-switcher').children('li').eq(1).children('a').removeClass('selected'); //$tab_signup
	});



	// PREVENT FOLLOWING LINK
	$('.cd-signin, .cd-signup').click(function(event) {
		event.preventDefault();
	});

	//close modal
	$('.cd-user-modal').on('click', function(event) {
		if ($(event.target).is($form_modal) || $(event.target).is('.cd-close-form')) {
			$form_modal.removeClass('is-visible');
		}
	});
	//close modal when clicking the esc keyboard button
	$(document).keyup(function(event) {
		if (event.which == '27') {
			$form_modal.removeClass('is-visible');
		}
	});

	//switch from a tab to another
	$form_modal_tab.on('click', function(event) {
		event.preventDefault();
		($(event.target).is($tab_login)) ? login_selected(): signup_selected();
	});

	//hide or show password
	$('.hide-password').on('click', function(event) {
		event.preventDefault();
		var $this = $(this),
			$password_field = $this.prev('input');

		('password' == $password_field.attr('type')) ? $password_field.attr('type', 'text'): $password_field.attr('type', 'password');
		('Hide' == $this.text()) ? $this.text('Show'): $this.text('Hide');
		//focus and move cursor to the end of input field
		$password_field.putCursorAtEnd();
	});

	//show forgot-password form 
	$forgot_password_link.on('click', function(event) {
		event.preventDefault();
		forgot_password_selected();
	});

	//back to login from the forgot-password form
	$back_to_login_link.on('click', function(event) {
		event.preventDefault();
		login_selected();
	});

	function login_selected() {
		$('.cd-user-modal').find('#cd-login').addClass('is-selected'); //$form_login
		$('.cd-user-modal').find('#cd-signup').removeClass('is-selected'); //$form_signup
		$('#cd-reset-password').removeClass('is-selected');
		$('#cd-new-password').removeClass('is-selected');
		
		$('.cd-switcher').children('li').eq(0).children('a').addClass('selected'); //$tab_login
		$('.cd-switcher').children('li').eq(1).children('a').removeClass('selected'); //$tab_signup
	}

	function signup_selected() {
		$('.cd-user-modal').find('#cd-login').removeClass('is-selected'); //$form_login
		$('.cd-user-modal').find('#cd-signup').addClass('is-selected'); //$form_signup
		$('#cd-reset-password').removeClass('is-selected');
		$('#cd-new-password').removeClass('is-selected');
		$('.cd-switcher').children('li').eq(0).children('a').removeClass('selected'); //$tab_login
		$('.cd-switcher').children('li').eq(1).children('a').addClass('selected'); //$tab_signup
	}

	function forgot_password_selected() {
		//$('.cd-user-modal').find('#cd-login').removeClass('is-selected'); //$form_login
		//$('.cd-user-modal').find('#cd-signup').removeClass('is-selected'); //$form_signup
		//$('.cd-user-modal').find('#cd-login').find('.cd-form-bottom-message a').addClass('is-selected'); //$form_forgot_password
		//$('.cd-user-modal').addClass('is-visible');
		$('.cd-user-modal').find('#cd-login').removeClass('is-selected');
		$('.cd-user-modal').find('#cd-signup').removeClass('is-selected');
		$('#cd-reset-password').addClass('is-selected');
	}

	function error(form, field, add, msg) {

		var $form_modal = $('.cd-user-modal'),
			$form_login = $form_modal.find('#cd-login'),
			$form_signup = $form_modal.find('#cd-signup'),
			$form_csubd = $form_modal.find('#cd-csubd'),
			$form_forgot_password = $form_modal.find('#cd-reset-password'),
			$form_modal_tab = $('.cd-switcher'),
			$tab_login = $form_modal_tab.children('li').eq(0).children('a'),
			$tab_signup = $form_modal_tab.children('li').eq(1).children('a'),
			$forgot_password_link = $form_login.find('.cd-form-bottom-message a'),
			$back_to_login_link = $form_forgot_password.find('.cd-form-bottom-message a'),
			$main_nav = $('.main-nav');

		form = form || "signup";
		field = field || "email";
		$signup = $form_signup.find('input[type="' + field + '"]');
		$login = $form_login.find('input[type="' + field + '"]');
		$csubd = $('#cd-csubd').find('input[type="' + field + '"]');
		$resetp = $('#cd-reset-password').find('input[type="' + field + '"]');

		//event.preventDefault();
		//$form_signup.find('input[type="email"]').toggleClass('has-error').next('span').toggleClass('is-visible')
		if (add === true) {
			if (form === "signup") {
				if(field == "email") {
					$signup.addClass('has-error').next('span').html(msg);
					$signup.addClass('has-error').next('span').addClass('is-visible');
				} else if(field == "username") {
					$signup.addClass('has-error').next('span').html(msg);
					$signup.addClass('has-error').next('span').addClass('is-visible');
				} else if (field === "password") {
					$signup.addClass('has-error').next().next('span').html(msg);
					$signup.addClass('has-error').next().next('span').addClass('is-visible');
				}
			} else if (form === "login") {
				if(field == "username") {
					$login.addClass('has-error').next('span').html(msg);
					$login.addClass('has-error').next('span').addClass('is-visible');
				} else if (field === "password") {
					$login.addClass('has-error').next().next('span').html(msg);
					$login.addClass('has-error').next().next('span').addClass('is-visible');
				}
			} else if (form === "csubd") {
				$csubd.addClass('has-error').next('span').html(msg);
				$csubd.addClass('has-error').next('span').addClass('is-visible');
			} else if (form === "resetp") {
				$resetp.addClass('has-error').next('span').html(msg);
				$resetp.addClass('has-error').next('span').addClass('is-visible');
			}
		} else if (add === false) {
			if (form === "signup") {
				if(field == "email") {
					$signup.removeClass('has-error').next('span').removeClass('is-visible');
				} else if(field == "username") {
					$signup.removeClass('has-error').next('span').removeClass('is-visible');
				} else if (field === "password") {
					$signup.removeClass('has-error').next().next('span').removeClass('is-visible');
				}
			} else if (form === "login") {
				if(field == "username") {
					$login.removeClass('has-error').next('span').removeClass('is-visible');
				} else if (field === "password") {
					$login.removeClass('has-error').next().next('span').removeClass('is-visible');
				}
			} else if (form === "csubd") {
				$csubd.removeClass('has-error').next('span').removeClass('is-visible');
			} else if (form === "resetp") {
				$resetp.removeClass('has-error').next('span').removeClass('is-visible');
			}
		}
	}

});


//credits http://css-tricks.com/snippets/jquery/move-cursor-to-end-of-textarea-or-input/
$.fn.putCursorAtEnd = function() {
	return this.each(function() {
		// If this function exists...
		if (this.setSelectionRange) {
			// ... then use it (Doesn't work in IE)
			// Double the length because Opera is inconsistent about whether a carriage return is one character or two. Sigh.
			var len = $(this).val().length * 2;
			this.setSelectionRange(len, len);
		} else {
			// ... otherwise replace the contents with itself
			// (Doesn't work in Google Chrome)
			$(this).val($(this).val());
		}
	});
};

/*
		$.ajax({
			url: "/8100/autoLogin",
			type: "POST",
			dataType: 'json',
			data: {
			},
			success: function(responseText, status, xhr, $form) {
                          console.log(responseText);
			},
		});
*/