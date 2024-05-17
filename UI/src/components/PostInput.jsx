import { useState, useEffect } from "react";
import MentionSelect from "./MentionSelect";
import DisplayPost from "./DisplayPost";

export default function PostInput() {
  const [message, setMessage] = useState("");
  const [postMessage, setPostMessage] = useState(null);
  const [isAtSymbol, setIsAtSymbol] = useState(false);
  const [taggedUser, setTaggedUser] = useState(null);
  const [postTaggedUser, setPostTaggedUser] = useState(null);
  const [cursorPosition, setCursorPosition] = useState({ left: 0 });

  function handleKeyUp(e) {
    if (!taggedUser)
      setCursorPosition({
        left: `${e.target.selectionEnd}`,
      });
  }

  useEffect(() => {
    // Checking for the '@' input
    if (message.includes("@")) {
      setIsAtSymbol(true);
    } else {
      setIsAtSymbol(false);
    }
  }, [message]);

  // To Handle Post Event
  function PostSubmit() {
    setPostMessage(message);
    setPostTaggedUser(taggedUser);
    setTaggedUser(null);
    setMessage("");
  }

  return (
    <div className=" p-3 flex flex-col items-center justify-center gap-5 h-auto">
      <div className="relative ">
        <textarea
          rows={4}
          cols={60}
          placeholder={taggedUser ? "" : "Create a post ..."}
          className="resize-none rounded-md text-gray-600 outline-none p-3 "
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyUp}
        ></textarea>
        {isAtSymbol && (
          <MentionSelect
            taggedUser={taggedUser}
            setTaggedUser={setTaggedUser}
            setIsAtSymbol={setIsAtSymbol}
            cursorPosition={cursorPosition}
            setMessage={setMessage}
          />
        )}
        {taggedUser && (
          <span
            className="text-fuchsia-500 font-semibold absolute top-3"
            style={{ left: `${cursorPosition.left}em` }}
          >
            {taggedUser}
          </span>
        )}
      </div>

      <div className="relative left-60 mb-10 ">
        <button
          className="bg-customPink px-10 py-2 rounded-md text-black font-bold absolute right-0"
          onClick={PostSubmit}
        >
          Post
        </button>
      </div>

      <div className="w-full max-w-xl">
        {postMessage && postTaggedUser && (
          <DisplayPost postMessage={postMessage} taggedUser={postTaggedUser} />
        )}
      </div>
    </div>
  );
}
