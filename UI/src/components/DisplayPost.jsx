import { useState, useEffect } from "react";

const PostingUser = { name: "Abijith Murugan" };

export default function DisplayPost({ postMessage, taggedUsers }) {
  // To split the message and store
  const [messageArray, setMessageArray] = useState([]);

  useEffect(() => {
    if (taggedUsers && postMessage.includes(taggedUsers)) {
      const taggedUserIndex = postMessage.indexOf(taggedUsers);
      const taggedUserLength = taggedUsers.length;
      const messagePreviousToTaggedUser = postMessage.slice(0, taggedUserIndex);
      const messageNextToTaggedUser = postMessage.slice(
        taggedUserIndex + taggedUserLength
      );
      setMessageArray([messagePreviousToTaggedUser, messageNextToTaggedUser]);
    } else {
      setMessageArray([postMessage]);
    }
  }, [postMessage, taggedUsers]);

  console.log(messageArray);
  return (
    <div className="text-slate-500  p-7 bg-slate-300  rounded-md">
      <p>
        <span>{messageArray[0]}</span>
        {taggedUsers && (
          <span className="text-fuchsia-500 font-bold">{taggedUsers}</span>
        )}
        <span>{messageArray[1]}</span>
      </p>

      <hr className="border-gray-700 mt-10"></hr>

      <div className="mt-2 flex p-4 gap-5">
        <span className="bg-red-600  rounded-full w-9 h-9 text-center font-semibold p-1 text-black">
          {PostingUser.name.at(0)}
        </span>
        <div className="flex flex-col gap-2">
          <span className="text-black">{PostingUser.name}</span>
          <span>1 Hour Ago</span>
        </div>
      </div>
    </div>
  );
}
