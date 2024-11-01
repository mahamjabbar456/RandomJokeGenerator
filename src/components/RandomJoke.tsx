'use client'

import { useEffect, useState } from "react"
import { Button } from "./ui/button"

interface jokeData {
  setup : "string",
  punchline : "string";
}

const RandomJoke = () => {
   const [joke,setjoke] = useState<string>("");

   useEffect(()=>{
      getJoke();
   },[])

   const getJoke = async ():Promise<void> => {
      try {
        const response = await fetch("https://official-joke-api.appspot.com/random_joke");
        if(!response.ok){
          throw new Error("Failed to fetch joke. Please try again.");
        }

        const data:jokeData = await response.json();
        setjoke(`${data.setup} - ${data.punchline}`);
      } catch (error) {
        console.error("Error fetching joke:",error);
        setjoke("Failed to fetch joke. Please try again.");
      }
   }

  return (
    <div className="bg-gradient-to-tr from-yellow-400 to-orange-400 h-screen flex items-center justify-center">
      <div className="bg-white shadow-lg p-6 rounded-2xl max-w-md w-full">
        <h1 className="text-3xl font-bold ">😂 Random Joke 👈</h1>
        <div className="bg-gray-100 rounded-2xl p-6 my-5 text-lg text-gray-600">{joke || "Loading.."}</div>
        <Button className="bg-green-600 rounded-[50px] font-bold hover:bg-green-700"
        onClick={getJoke}
        >
        😂 Get new joke 😂
        </Button>
      </div>
    </div>
  )
}

export default RandomJoke
