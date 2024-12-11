const Validate = (email ,password ,name)=>{
        
    const nameRegex = /^[A-Za-z]+(?: [A-Za-z]+)*$/.test(name)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/.test(password);;

     if(!nameRegex) return "Name is invalid"
    if(!emailRegex) return "Email is invalid";
    if(!passwordRegex) return "Password is invalid";

    return null;

}

export default Validate;