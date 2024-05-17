
import {useState, useEffect, useRef} from "react"
import MentionSelect from "./MentionSelect";
import DisplayPost from "./DisplayPost";


export default function PostInput()
{

  const [message, setMessage] = useState("")
  const [postMessage, setPostMessage] = useState(null)
  const [isAtSymbol, setIsAtSymbol] = useState(false)
  const [taggedUser, setTaggedUser]=useState(null);
  const [postTaggedUser, setPostTaggedUser] = useState(null);

  const [cursorPosition, setCursorPosition] = useState({left:0, top:0});
  const textareaRef = useRef(null);
  
  function handleKeyUp(e){

    // const { clientX, clientY } = e;
    // const boundingBox = textareaRef.current.getBoundingClientRect();
    // let x = clientX - boundingBox.left;
    // let y = clientY - boundingBox.top;
    // console.log(x,y);
    // setCursorPosition({left:`${clientX}`,top:`${clientY}` });
    

     if(!taggedUser)
      setCursorPosition({left:`${e.target.selectionStart}`,top:`${e.target.selectionEnd}` });
    
  }
  
  
  
  // const updateCursorPosition = (event) => {

  //   // setCursorPosition({top:event.target.selectionStart,end:event.target.selectionEnd});
  //   setCursorPosition({top:`${event.clientX}`,end:`${event.clientY}`});
  // };

  

  useEffect(()=>{
    if(message.includes('@')){
      setIsAtSymbol(true);
    }
    else{
      setIsAtSymbol(false);
    }
  },[message])

 
console.log(message);
console.log(taggedUser);
// console.log(cursorPosition);

function PostSubmit(){
  
  setPostMessage(message);
  setPostTaggedUser(taggedUser);
  setTaggedUser(null);
  setMessage("");
  

}
   
  return (
    <div className=' p-3 flex flex-col items-center justify-center gap-5 h-auto'  >
      <div className="relative" >
      <textarea rows={4} cols={60} placeholder={taggedUser ? "":"Create a post ..."} ref={textareaRef} className="resize-none rounded-md text-gray-600 outline-none p-3 " value={message} onChange={(e)=> setMessage(e.target.value)} onKeyDown={handleKeyUp}></textarea>
      {isAtSymbol && <MentionSelect taggedUser ={taggedUser} setTaggedUser={setTaggedUser} setIsAtSymbol={setIsAtSymbol} cursorPosition={cursorPosition} setMessage={setMessage}/>}
      {taggedUser && <span className='text-fuchsia-500 font-semibold absolute top-3' style={{ left: `${cursorPosition.top}em`}}>{taggedUser}</span> }
      </div>

      <div className="relative left-60 mb-10">
      <button className="bg-customPink px-10 py-2 rounded-md text-black font-bold absolute right-0" onClick={PostSubmit}>Post</button>
      </div>


  <div className="w-[50%]">
{
      postMessage && postTaggedUser &&
      <DisplayPost postMessage={postMessage} taggedUser={postTaggedUser}/>
}
    </div>
    </div>
  )
}
