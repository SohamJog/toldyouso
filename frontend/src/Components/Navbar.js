function Navbar (props) {
  return (
    <div className="bg-teal-200 flex justify-between items-center snap-start">
    <div className="flex items-center">
      <img className="w-64 h-20 mr-2" src={props.logo} alt="Toldyouso Logo"/>
    </div>
    <button onClick={()=>props.logout()} className="px-4 py-2 rounded-md font-bold bg-white text-cyan-600 mx-10 my-6 ">Logout</button>
  </div>
  )
}

export default Navbar;