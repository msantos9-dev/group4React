const valid = ({fullname, username, email, password, cf_password}) => {
    const err = {}

    if(!fullname) {
        err.fullname = "Please add your full name."
    }else if(fullname.length > 50){
        err.fullname = "Full name is limited to 50 characters long."
    }

    if(!username) {
        err.username = "Please add your user name."
    }else if(username.replace(/ /g, '').length < 5){
        err.username = "User name must be at least 5 characters long."
    }else if(username.replace(/ /g, '').length > 25){
        err.username = "User name is up to 25 characters long."
    }

    if(!email) {
        err.email = "Please add your email."
    }else if(!validateEmail(email)){
        err.email = "Email format is incorrect."
    }

    function checkWhiteSpace(str){var re = /^\S{6,20}$/;return re.test(str);}
    function checkLength(str){var re = /^.{6,20}$/;return re.test(str);}
    function checkSymbols(str){var re = /^(?=.*[@#$%^&-+=()!]).{6,20}$/;return re.test(str);}
    function checkUpperCase(str){var re = /^(?=.*[A-Z]).{6,20}$/;return re.test(str);}
    function checkLowerCase(str){var re = /^(?=.*[a-z]).{6,20}$/;return re.test(str);}
  
    if(!password) {
        err.password = "Please add your password."
    }else if(!checkLength(password)){
        err.password = "Password must be 6 to 20 characters long."
    }else if(!checkSymbols(password)){
        err.password = "Password must contain one of the ff. (@#$%^&-+=()!)."
    }else if(!checkUpperCase(password)){
        err.password = "Password must contain one Uppercase letter."
    }else if(!checkLowerCase(password)){
        err.password = "Password must contain one Lowercase letter."
    }else if(!checkWhiteSpace(password)){
        err.password = "White spaces not allowed."
    }

    if(password !== cf_password) {
        err.cf_password = "Confirm password did not match."
    }

    return {
        errMsg: err,
        errLength: Object.keys(err).length
    }
}



function validateEmail(email) {
    // eslint-disable-next-line
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}
  
export default valid