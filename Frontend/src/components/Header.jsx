

const Header = ()=>{

  
 
    const HandleSignin = ()=>{

    }
    return(
      <div>
          {/* Header */}
      <header className="bg-blue-900 text-white py-4 px-8 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-white">
          Reflex<span className="text-blue-400">CMS</span>
        </h1>
       <button onClick={HandleSignin} className="bg-transparent border border-white px-4 py-2 rounded-md text-white hover:bg-blue-700 transition">
          Sign in
        </button>
      </header>
      </div>
   
    
    )
}
export default Header