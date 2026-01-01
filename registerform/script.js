
//check if string is alphanumeric
//if so, returns true, otherwise false
function isAlphanumeric(str) {
  const regex = /^[a-z0-9]+$/i;
  return regex.test(str);
}

function writeError(formGroup, text){
	const small = formGroup.querySelector("small")	
	small.innerText = text
}

function checkUsername(username, formGroup){
	if (!username){
		writeError(formGroup, "Please, fill username !")
		return false;
	}
	if (username.length <= 3){
		writeError(formGroup, "Username must be at least 3 characters long")
		return false;
	}
	if (!isAlphanumeric(username)){
		writeError(formGroup, "Username must contains only alphanumeric characters")
		return false;
	}
	return true;
}
