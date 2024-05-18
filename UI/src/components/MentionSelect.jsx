import { useState } from "react";

// Sample Users Array
const users = ["Tommy", "Steve", "Danny", "Alex", "Jones", "Charlie", "Alexis"];

export default function MentionSelect({
  setTaggedUsers,
  setIsAtSymbol,
  cursorPosition,
  setMessage,
}) {
  const [filteredUsers, setFilteredUsers] = useState([]);

  const handleInputChange = (e) => {
    // Getting the Input Value
    const inputValue = e.target.value;

    if (inputValue !== "") {
      const result = users.filter((user) =>
        user.toLowerCase().includes(inputValue.toLowerCase())
      );
      setFilteredUsers([...result]);
    } else {
      setFilteredUsers([]);
    }
  };

  function HandleTag(e) {
    setMessage((current) => current.split("@")[0].concat(e.target.value));
    setTaggedUsers(e.target.value);
    setIsAtSymbol(false);
  }

  // Going to change
  function HandleTag(e) {
    setMessage((current) => current.split("@")[0].concat(e.target.value));
    setTaggedUsers((current) => [e]);
    setIsAtSymbol(false);
  }

  // Code
  // function HandleTag(e) {
  //   const taggedUser = e.target.value;
  //   setTaggedUsers(taggedUser);
  //   setIsAtSymbol(false);

  //   // Update the message state by concatenating the tagged user value
  //   setMessage((current) => {
  //     // Find the position of the '@' symbol
  //     const atSymbolIndex = current.lastIndexOf("@");
  //     if (atSymbolIndex !== -1) {
  //       // Concatenate the message before the '@' symbol with the tagged user and the message after the '@' symbol
  //       return (
  //         current.slice(0, atSymbolIndex + 1) +
  //         taggedUser +
  //         current.slice(atSymbolIndex + 1)
  //       );
  //     }
  //     return current + taggedUser;
  //   });

  //   setIsAtSymbol(false);
  // }

  return (
    <div
      className="w-auto h-auto max-h-48 border-solid border-2 border-black absolute  z-20 top-1 p-2 bg-white overflow-y-auto overflow-x-hidden"
      style={{ left: `${cursorPosition.left}rem` }}
    >
      <input
        type="text"
        className="rounded-md p-1"
        onChange={handleInputChange}
      />
      {filteredUsers.length > 0 && (
        <div className="mt-2 z-20">
          {filteredUsers.map((user) => (
            <div
              className="flex justify-center items-center gap-7 p-2 text-black hover:bg-slate-600 hover:text-white"
              key={user}
            >
              <span className="bg-red-600  rounded-full w-9 h-9 text-center font-semibold p-1">
                {user.at(0)}
              </span>
              <option
                className="font-semibold hover:cursor-pointer mt-1"
                value={user}
                onClick={HandleTag}
              >
                {user}
              </option>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
