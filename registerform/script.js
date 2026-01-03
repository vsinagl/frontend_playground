const username = document.getElementById("username")
const email = document.getElementById("email")
const password = document.getElementById("password")
const passwordConfirm = document.getElementById("confirm-password")
const registerBtn = document.getElementById("btn-register")
const registrationForm = document.getElementById('form-register')

registrationForm.addEventListener("submit", function(event) {
    event.preventDefault() 
    checkInputs() 
})

function writeError(formGroup, text) {
    const small = formGroup.querySelector("small")	
    formGroup.querySelector("input").classList.add("active")
    small.innerText = text
}

function resetErrors() {
    document.querySelectorAll(".active").forEach(el => el.classList.remove("active"))
    document.querySelectorAll("small").forEach(el => el.innerText = "")
}

function checkInputs() {
    resetErrors()
    let isFormValid = true

    //check username
    if (!checkUsername(username.value.trim(), username.parentElement)) {
        isFormValid = false
    }

    //Check email
    if (!checkEmail(email.value.trim(), email.parentElement)) {
        isFormValid = false
    }

    //check password
    if (!checkPassword(password.value.trim(), password.parentElement)) {
        isFormValid = false
    }
    //check confirmation password
    if (!checkPassword(passwordConfirm.value.trim(), passwordConfirm.parentElement)) {
        isFormValid = false
    }

    if (password.value !== passwordConfirm.value) {
        writeError(passwordConfirm.parentElement, "Passwords do not match!")
        isFormValid = false
    }

    if (isFormValid) {
        alert("Registration completed successfully!")
		//handling data request
    }
}

function isAlphanumeric(str) {
    const regex = /^[a-z0-9]+$/i
    return regex.test(str)
}

function checkUsername(val, formGroup) {
    if (!val) {
        writeError(formGroup, "Please, fill username!")
        return false
    }
    if (val.length <= 3) {
        writeError(formGroup, "Username must be at least 3 characters long")
        return false
    }
    if (!isAlphanumeric(val)) {
        writeError(formGroup, "Username must contain only alphanumeric characters")
        return false
    }
    return true
}

function checkEmail(val, formGroup) {
    if (!val) {
        writeError(formGroup, "Please, fill email field")
        return false
    }
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    if (!(emailRegex.test(val))) {
        writeError(formGroup, "Email address not valid")
        return false
    }
    return true
}

function checkPassword(val, formGroup) {
    if (!val) {
        writeError(formGroup, "Please, write a password")
        return false
    }
    if (val.length < 6) {
        writeError(formGroup, "Password must be at least 6 characters long")
        return false
    }
    return true
}