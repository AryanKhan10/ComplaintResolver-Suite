import { useNavigate } from "react-router";

const Card = ()=>{
 
    const nav = useNavigate()
   const view = ()=>{
    nav("/browse/complaints")
   }   
    const cards = [
        { title: "Complaints Submitted", description: "Posted 3 days ago", button: "View All" },
        { title: "Pending Complaints", description: "Posted 3 days ago", button: "View All" },
        { title: "Resolved Complaints", description: "Posted 3 days ago", button: "View All" },
      ];
    return(
        <div style={{transform:"translate(22% ,10%)"}} className="grid grid-cols-1 sm:grid-cols-4 gap-3 ">
        {cards.map((card, index) => (
          <div key={index} className="p-4 bg-gray-200 shadow rounded-lg">
            <h3 className="text-lg font-semibold">{card.title}</h3>
            <p className="text-gray-600 text-sm">{card.description}</p>
            <button className="mt-4 text-blue-500 font-medium" onClick={view}>{card.button}</button>
          </div>
        ))}
      </div>
    )
}

export default Card