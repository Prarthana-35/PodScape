import {useContext} from "react";
import { UserContext } from "../contexts/UserContext";

const Episode = ({title, pubDate, link, mp3}) => {
  const [user] = useContext(UserContext);
  return (
    <div className="max-w-3xl flex flex-row items-center border rounded-lg my-4">
        <div className="pl-2 mt-2 mb-4 w-3/4 max -w-lg py-2 px-5 mx-auto">
        <a href={link} target="_blank" rel="noopener noreferrer" className="underline hover:opacity-70">
        <p>{title}</p>
        </a>
      
        <audio src={mp3} className="my-4 px-2" controls />
        <p>{pubDate}</p>
        </div>
        <div className="w-1/2 flex flex-col gap-1 my-2 px-8">
            <label htmlFor="notes" className="text-gray-700 font-medium"></label>            
            <label>Add your notes here, {user.given_name}</label>
            <textarea className="border rounded-lg p-2" placeholder="Did you enjoy the episode ?" rows={5}></textarea>
        </div>
    </div>
  )
}

export default Episode
