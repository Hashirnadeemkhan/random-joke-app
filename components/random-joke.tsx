"use client"; // Enables client-side rendering for this component

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";


interface jokeRespond{
  setup:string;
  punchline:string
}

export default function RandomJokeComponent() {
  const [joke, setJoke] = useState<string>("");   //const [joke, setJoke] = useState<string>("");
 
  
  useEffect(()=>{  // Effect hook to fetch a joke when the component mounts
    fetchJoke();
  },[])          // Empty dependency array ensures this runs once on mount




  // Async function to fetch a random joke from the API

  async function fetchJoke():Promise<void> {

    try{
       // Make a GET request to the joke API
       const response= await fetch("https://official-joke-api.appspot.com/random_joke")

       const data:jokeRespond = await response.json()

            // Update state with the fetched joke
            setJoke(`${data.setup} - ${data.punchline}`)
    }
    
    catch(error){
  console.log("Error fetching joke:",error)  // Log any errors
  setJoke("Failed to fetch joke. Please try again.")  
  }
}

return(
  <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-[#ffa500] to-[#ff6b6b] p-4">
    {/* Center the joke card within the screen */}
    <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md">
        {/* Header with title */}
        <h1 className="text-3xl font-bold mb-4 text-[#333]">
          😂 Random Joke 👈
        </h1>
         {/* Display the joke or a loading message */}
         <div className="bg-[#f5f5f5] rounded-lg p-6 mb-6 text-[#555] text-lg">
          {joke || "Loading..."}
        </div>
        {/* Button to fetch a new joke */}
        <Button
          onClick={fetchJoke}
          className="bg-[#4caf50] hover:bg-[#43a047] text-white font-bold py-2 px-4 rounded-full transition-colors duration-300">  😂 Get New Joke 😂</Button>
        </div>
    </div>
)

}