function invalidInput() {
}

function validateForm(){
	// Password Validation
	if ($("#input_password").val() == $("#input_password_confirmation").val())
	{
		return true;
	}
	else
	{
		$('#error_password_confirmation').toggle();
	}
	return false;
}