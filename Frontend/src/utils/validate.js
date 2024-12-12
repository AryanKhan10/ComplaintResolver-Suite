const Validate = (email ,password ,firstName, lastName)=>{
        
    const firstNameRegex = /^[A-Za-z]+(?: [A-Za-z]+)*$/.test(firstName)
    const lastNameRegex = /^[A-Za-z]+(?: [A-Za-z]+)*$/.test(lastName)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/.test(password);;

     if(!firstNameRegex) return "Name is invalid"
     if(!lastNameRegex) return "Name is invalid"
    if(!emailRegex) return "Email is invalid";
    if(!passwordRegex) return "Password is invalid";

    return null;

}

export default Validate;