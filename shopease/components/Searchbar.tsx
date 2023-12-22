"use client";

import { FormEvent, useState } from "react";

const isValidAmazonProductURL = (url: string) => {
  try {
    const parsedURL = new URL(url);
    const hostname = parsedURL.hostname;
    if (
      hostname.includes("amazon.com") ||
      hostname.includes("amazon." || hostname.endsWith("amazon"))
    ) {
      return true;
    }
  } catch (error) {
    return false;
  }
  return false;
};
function Searchbar() {
  const [searchPrompt, setsearchPrompt] = useState("");
  const [isLoading, setLoding] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const isValidLink = isValidAmazonProductURL(searchPrompt);
    //alert(isValidLink ?'Valid link' : 'Invalid link')
    if (!isValidLink) {
      return alert("Please enter a valid amazon product url");
    }
    try {
      setLoding(true);
      //scrape the product
      
    } catch (error) {
      console.log(error);
    } finally {
      setLoding(false);
    }
  };
  return (
    <form className="flex flex-wrap gap-4 mt-12" onSubmit={handleSubmit}>
      <input
        type="text"
        value={searchPrompt}
        onChange={(e) => setsearchPrompt(e.target.value)}
        placeholder="Enter product link"
        className="searchbar-input"
      />
      <button
        type="submit"
        className="searchbar-btn"
        disabled={searchPrompt === ""}
      >
        {isLoading ? "Searching..." : "Search"}
      </button>
    </form>
  );
}

export default Searchbar;
