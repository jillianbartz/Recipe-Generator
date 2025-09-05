import { useState } from "react";
import "./App.css";

function App() {
  const [url, setUrl] = useState("");
  const [reply, setReply] = useState("nothing");

  //debounce set url
  // function handleChange(inputURL: string) {
  //   const handler = setTimeout(() => {
  //     console.log("set url");
  //     setUrl(inputURL);
  //   }, 200);
  //   return () => clearTimeout(handler);
  // }

  const sendURL = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Submitting URL:", url);

    try {
      const response = await fetch("http://localhost:3000/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
      });

      if (!response.ok) {
        console.error("Backend returned error:", response.status);
        return;
      }

      const recipeText = await response.json();

      if (recipeText.reply.ingredients && recipeText.reply.directions) {
        console.log("Ingredients:", recipeText.reply.ingredients);
        console.log("Directions:", recipeText.reply.directions);
        setReply(recipeText.reply.ingredients);
      }
    } catch (error) {
      console.error("Failed to fetch recipe:", error);
    }
  };

  return (
    <div>
      <form onSubmit={sendURL}>
        <label htmlFor="url">input url</label>
        <input
          type="text"
          id="url"
          name="url"
          onChange={(e) => {
            setUrl(e.target.value);
          }}
        />
      </form>
      <div>{reply}</div>
    </div>
  );
}

export default App;
