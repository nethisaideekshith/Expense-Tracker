const validator = {}

const errfun=(msg)=>{
    const error=new Error(msg);
    throw error;
}

// Email Validation

validator.validateEmail = (email) => {
    const emailRegex=/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
    if(!emailRegex.test(email)){
        errfun("Invalid Email");
    }
}

// Password Validation

validator.validatePassword = (password) => {
    const upperCase=/[A-Z]/;
    const lowerCase=/[a-z]/;
    const number=/[0-9]/;
    const specialCharacter=/[^A-Za-z0-9]/;
    if(password.length<6){
        errfun("Password should be atleast 6 characters length");
    }
    if(!upperCase.test(password)){
        errfun("Password should contain atleast one uppercase letter");
    }
    if(!lowerCase.test(password)){
        errfun("Password should contain atleast one lowercase letter");
    }
    if(!number.test(password)){
        errfun("Password should contain atleast one digit");
    }
    if(!specialCharacter.test(password)){
        errfun("Password should contain atleast one special character");
    }
}

module.exports = validator