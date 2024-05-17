const PostingUser = {name: "Abijith Murugan"};

import { useEffect, useState } from 'react';

export default function DisplayPost({ postMessage, taggedUser }) {
//   const [postContent, setPostContent] = useState([]);

//   useEffect(() => {
//     if (postMessage && taggedUser) {
//       setPostContent((current) => [
//         { message: {postMessage}, user: {taggedUser} },
//         ...current,
//       ]);
//     }
//   }, []);

//   console.log(postContent);

  // const postPresent = postMessage || taggedUser;

  return (

    // <div className='mt-5'>
    //     {postContent.length === 0 && <p className='text-white'>No Posts</p>}
    //   {postContent.map((post, index) => (
    //     <div key={index}>
    //       <p className='text-gray-600'>
    //         {post.message} <span className='text-fuchsia-600 font-semibold'>{post.user}</span>
    //       </p>
    //     </div> 
    //   ))}
    // </div>
  
   
    <div className="text-slate-500  p-7 bg-slate-300  rounded-md">
      <p>{postMessage} { taggedUser && <span className='text-fuchsia-500 font-bold'>{taggedUser}</span>}</p>
    
      <hr className="border-gray-700 mt-10"></hr>
      <div className="mt-2 flex p-4 gap-5">
        <span className='bg-red-600  rounded-full w-9 h-9 text-center font-semibold p-1 text-black'>{PostingUser.name.at(0)}</span>
        <div className='flex flex-col gap-2'>
          <span className='text-black'>{PostingUser.name}</span>
          <span>1 Hour Ago</span>
        </div>
      </div>
    </div>
);
}
