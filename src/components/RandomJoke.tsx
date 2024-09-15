'use client'; // Enables client-side rendering for this component

// Import necessary hooks from React
import { useState,useEffect } from "react";

// Import custom Button component from the UI directory
import { Button } from "./ui/button";

interface JokeResponse {
    setup : string;
    punchline : string;
}

// Default export of the RandomJokeComponent function
const RandomJoke = () => {
    // State hook for managing the current joke
    const [joke,setJoke] = useState<string>("");

    // Effect hook to fetch a joke when the component mounts
    useEffect(()=>{
        fetchJoke(); 
    },[]) // Empty dependency array ensures this runs once on mount

    // Async function to fetch a random joke from the API
    async function fetchJoke():Promise<void> {
        try{
            // Make a GET request to the joke API
            const response = await fetch('https://official-joke-api.appspot.com/random_joke');
            const data : JokeResponse= await response.json();
             // Update state with the fetched joke
             setJoke(`${data.setup}-${data.punchline}`)
        }catch(error){
            console.error("Error fetching joke.",error);  // Log any errors
            // Set an error message if the fetch fails
            setJoke("Failed to fetch joke. Please try again.");
        }
    }

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-br from-[#ffa500] to-[#ff6b6b]">
      {/* Center the joke card within the screen */}
      <div className="bg-white w-full max-w-md p-8 rounded-2xl shadow-lg">
        {/* Header with title */}
         <h1 className="text-3xl font-bold mb-4 text-[#333]">
            😂 Random Joke 👈
         </h1>
         {/* Display the joke or a loading message */}
         <div className="rounded-lg p-8 mb-6 bg-[#f5f5f5] text-[#555] text-lg">
            {joke || "Loading..."}
         </div>
         {/* Button to fetch a new joke */}
         <Button
         onClick={fetchJoke}
         className="rounded-full text-white font-bold text-sm bg-[#4caf50] hover:bg-[#43a047] transition-colors duration-300 py-2"
         >
            😂 Get New Joke 😂
         </Button>
      </div>
    </div>
  )
}

export default RandomJoke
