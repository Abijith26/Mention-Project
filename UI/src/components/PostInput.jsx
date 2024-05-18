import { useState, useEffect, useRef } from "react";
import MentionSelect from "./MentionSelect";
import DisplayPost from "./DisplayPost";

export default function PostInput() {
  const [message, setMessage] = useState("");
  const [postMessage, setPostMessage] = useState(null);
  const [isAtSymbol, setIsAtSymbol] = useState(false);
  const [taggedUsers, setTaggedUsers] = useState(null);
  const [postTaggedUser, setPostTaggedUser] = useState(null);
  const [count, setCount] = useState(1);
  // const [cursorPosition, setCursorPosition] = useState({ left: 0 });

  function handleKeyUp(e) {
    if (!taggedUsers)
      setCursorPosition({
        left: `${e.target.selectionEnd}`,
      });
  }
  // New
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0 });
  const inputRef = useRef(null);
  const atPositionRef = useRef(null);
  const atPositionRef1 = useRef(null);
  const [positionOfAt, setPositionOfAt] = useState(null);
  const [spanPos, setSpanPos] = useState({ top: 0, left: 0, width: 0 });
  const [spanPos1, setSpanPos1] = useState({ top: 0, left: 0, width: 0 });

  console.log(message);

  // New Function
  // const handleInputChange = (event) => {
  //   // set to initial
  //   setDropdownPosition({ top: 0, left: 0 });

  //   // fetch value and set
  //   const { value } = event.target;
  //   setMessage(value);

  //   // set value to span to get width
  //   const measureSpan = document.getElementById("measure");
  //   measureSpan.textContent = value;
  //   const valueWidth = measureSpan.offsetWidth;

  //   // find the input rectref and '@' index
  //   const inputRect = inputRef.current.getBoundingClientRect();
  //   setSpanPos({ top: inputRect.top, left: inputRect.left });
  //   // setSpanPos1({ width: inputRect.width });

  //   // const dropdownRect = dropdownRef.current.getBoundingClientRect();
  //   const atIndex = value.lastIndexOf("@");
  //   console.log("at index outside: ", atIndex);

  //   // if there is an '@' entered
  //   if (atIndex !== -1) {
  //     // fetch the '@' coordinates
  //     const atPosition = atPositionRef.current.getBoundingClientRect();
  //     // const atPosition1 = atPositionRef1.current.getBoundingClientRect();

  //     var dropdownTop, dropdownLeft;
  //     if (value.charAt(value.length - 1) === "@") {
  //       dropdownTop = atPosition.height;
  //       dropdownLeft =
  //         valueWidth - inputRect < 0
  //           ? inputRect - valueWidth
  //           : valueWidth - inputRect;
  //     }
  //     setDropdownPosition({ top: dropdownTop, left: dropdownLeft });

  //     console.log("value.length: ", valueWidth);
  //     console.log("input rect: ", inputRect);
  //     console.log("at position rect: ", atPosition);
  //     console.log("dropdownLeft value: ", dropdownLeft);
  //     console.log("dropdown position: ", dropdownPosition);

  //     if (dropdownLeft > inputRect.right) {
  //       console.log("inside else > : ");
  //       // dropdownTop = atPosition.top + atPosition.height;
  //       // multiply by * 2 for second line
  //       dropdownTop = atPosition.height * 2 + inputRect.top + 10;
  //       dropdownLeft =
  //         inputRect.left + (valueWidth - inputRect.width) + atPosition.y;
  //     }

  //     setDropdownPosition({ top: dropdownTop, left: dropdownLeft });

  //     setIsAtSymbol(true);
  //   } else {
  //     setIsAtSymbol(false);
  //   }
  // };

  const handleInputChange = (event) => {
    // set to initial
    setDropdownPosition({ top: 0, left: 0 });

    // fetch value and set
    var { value } = event.target;
    setMessage(value);

    // set value to span to get width
    const measureSpan = document.getElementById("measure");
    measureSpan.textContent = value;
    const valueWidth = measureSpan.offsetWidth;

    // find the input rectref and '@' index
    const inputRect = inputRef.current.getBoundingClientRect();
    setSpanPos({ top: inputRect.top, left: inputRect.left + 10 });
    setSpanPos1({
      top: inputRect.top,
      left: inputRect.left + 10,
      width: inputRect.width,
    });

    // const dropdownRect = dropdownRef.current.getBoundingClientRect();
    const atIndex = value.lastIndexOf("@");
    console.log("at index outside: ", atIndex);

    // if there is an '@' entered
    if (atIndex !== -1) {
      // fetch the '@' coordinates
      const atPosition = atPositionRef.current.getBoundingClientRect();
      const atPosition1 = atPositionRef1.current.getBoundingClientRect();

      var dropdownTop, dropdownLeft;
      if (value.charAt(value.length - 1) === "@") {
        dropdownTop = atPosition.height + 10;
        dropdownLeft = valueWidth;
      }
      setDropdownPosition({ top: 0, left: 0 });

      console.log("value.length: ", valueWidth);
      console.log("input rect: ", inputRect);
      console.log("at position rect: ", atPosition);
      console.log("dropdownLeft value: ", dropdownLeft);
      console.log("dropdown position: ", dropdownPosition);

      if (dropdownLeft === inputRect.width) {
        setCount((c) => (c = c + 1));
      }
      if (dropdownLeft > inputRect.width) {
        dropdownTop = atPosition.height * 2 + 10;
        dropdownLeft = valueWidth - inputRect.width + 30;
      }
      setDropdownPosition({ top: dropdownTop, left: dropdownLeft });
      setIsAtSymbol(true);
    } else {
      setIsAtSymbol(false);
    }
  };
  // useEffect(() => {
  //   // Checking for the '@' input
  //   if (message.includes("@")) {
  //     setIsAtSymbol(true);
  //   } else {
  //     setIsAtSymbol(false);
  //   }
  // }, [message]);

  // To Handle Post Event
  function PostSubmit() {
    setPostMessage(message);
    setPostTaggedUser(taggedUsers);
    setTaggedUsers(null);
    setMessage("");
  }

  return (
    <div className=" p-3 flex flex-col items-center justify-center gap-5 h-auto">
      {/* Span element to refer the cursor position */}
      <span
        ref={atPositionRef}
        id="measure"
        style={{
          visibility: "hidden",
          zIndex: "-1",
          position: "absolute",
          left: spanPos.left,
          top: spanPos.top,
        }}
      ></span>
      <br />
      <div className="relative ">
        <textarea
          rows={4}
          cols={60}
          placeholder={taggedUsers ? "" : "Create a post ..."}
          className="resize-none rounded-md text-gray-600 outline-none p-3 "
          value={message}
          onChange={handleInputChange}
          ref={inputRef}
        ></textarea>
        {isAtSymbol && (
          <MentionSelect
            taggedUsers={taggedUsers}
            setTaggedUsers={setTaggedUsers}
            setIsAtSymbol={setIsAtSymbol}
            cursorPosition={dropdownPosition}
            setMessage={setMessage}
          />
        )}
        <span
          ref={atPositionRef1}
          id="measure1"
          style={{
            visibility: "hidden",
            zIndex: "-1",
            position: "absolute",
            left: spanPos1.left,
            top: spanPos1.top,
            width: spanPos1.width,
          }}
        ></span>
        {/* {taggedUsers && (
          <span
            className="text-fuchsia-500 font-semibold absolute top-3"
            style={{ left: `${cursorPosition.left}em` }}
          >
            {taggedUsers}
          </span>
        )} */}
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
        {postMessage && (
          <DisplayPost postMessage={postMessage} taggedUsers={postTaggedUser} />
        )}
      </div>
    </div>
  );
}
