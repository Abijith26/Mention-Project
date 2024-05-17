import {useState} from "react";

const users = ['Tommy','Steve','Danny','Alex','Jones','Charlie','Alexis','Cherie','Reagan','Lacy','Angela','Codi','Gia','Gianna','Luna','Dee'];


export default function MentionSelect({taggedUser, setTaggedUser, setIsAtSymbol, cursorPosition, setMessage}) {
  const [filteredUsers, setFilteredUsers] = useState([]);
  
  
  const handleInputChange = (e) => {
    // Getting the Input Value
    const inputValue = e.target.value;

    if(inputValue !== ''){

        const result = users.filter((user) =>
            user.toLowerCase().includes(inputValue.toLowerCase()));
        setFilteredUsers([...result]);
    }else{
        setFilteredUsers([]);
    }

}

function HandleTag(e){
    setMessage((current)=> current.split("@")[0])
    setTaggedUser(e.target.value);
    
    setIsAtSymbol(false);
}

  
  return (
    <div className="w-auto h-auto max-h-48 border-solid border-2 border-black absolute  z-20 top-1 p-2 bg-white overflow-y-auto overflow-x-hidden" style={{ left: `${cursorPosition.top}rem` }}>
    <input type="text" className="rounded-md p-1" onChange={handleInputChange} />
    { filteredUsers.length > 0 && <div className="mt-2 z-20">

    {filteredUsers.map((user)=>(
        <div className="flex justify-center items-center gap-7 p-2 text-black hover:bg-slate-600 hover:text-white" key={user}>
        <span className='bg-red-600  rounded-full w-9 h-9 text-center font-semibold p-1'>{user.at(0)}</span>
        <option className='font-semibold hover:cursor-pointer mt-1' value={user} onClick={HandleTag}>{user}</option>
        </div>
    ))}
    </div>}
  
</div>
)
  
}
