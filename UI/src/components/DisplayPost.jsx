const PostingUser = { name: "Abijith Murugan" };

export default function DisplayPost({ postMessage, taggedUser }) {
  return (
    <div className="text-slate-500  p-7 bg-slate-300  rounded-md">
      <p>
        {postMessage}{" "}
        {taggedUser && (
          <span className="text-fuchsia-500 font-bold">{taggedUser}</span>
        )}
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
