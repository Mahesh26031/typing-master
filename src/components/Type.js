import React, { useState, useEffect } from "react";
import { getQuotes } from "./Quotes";

function Type() {
  const [quotes, setQuotes] = useState([]);
  const [quoteIndex, setQuoteIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [totalTime, setTotalTime] = useState(0);
  const [startTime, setStartTime] = useState(null);
  const [userInput, setUserInput] = useState("");
  const [isCorrect, setIsCorrect] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const data = await getQuotes();
      const quotesArr = [];
      while (quotesArr.length < 10) {
        const randomIndex = Math.floor(Math.random() * data.length);
        const quote = data[randomIndex];

        if (!quotesArr.includes(quote.text)) {
          quotesArr.push(quote.text);
        }
      }
      setQuotes(quotesArr);
      setStartTime(new Date());
    }
    fetchData();
  }, []);

  function handleUserInput(event) {
    setIsCorrect(null);
    setUserInput(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();
    const isInputCorrect = userInput === quotes[quoteIndex];
    setIsCorrect(isInputCorrect);
    if (userInput === quotes[quoteIndex]) {
      setScore(score + 1);
    }
    setUserInput("");

    const endTime = new Date();
    const timeTaken = (endTime - startTime) / 1000;
    setTotalTime(totalTime + timeTaken);
    setQuoteIndex(quoteIndex + 1);
  }

  useEffect(() => {
    if (totalTime > 0) {
      console.log(totalTime);
      check();
    }
  }, [totalTime]);

  function check() {
    if (quoteIndex === quotes.length) {
      console.log("full");
      const averageTime = totalTime / quotes.length;
      localStorage.setItem("score", score);
      localStorage.setItem("time", totalTime);

      alert(
        "Score: " +
          score +
          "/" +
          quotes.length +
          "\nTime: " +
          totalTime +
          "s\nAverage time per quote: " +
          averageTime +
          "s"
      );
    } else {
      setStartTime(new Date());
    }
  }

  if (quotes.length === 0) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      {quoteIndex < quotes.length ? (
        <div>
          <div id="quote-container">
            {quoteIndex + 1}. {quotes[quoteIndex]}
          </div>
          <form onSubmit={handleSubmit}>
            <input
              id="input-box"
              type="text"
              value={userInput}
              onChange={handleUserInput}
              autoFocus
            />
            <button type="submit">Submit</button>
          </form>
          {isCorrect === false && (
            <div id="quote-container" style={{ color: "red" }}>
              Incorrect
            </div>
          )}
          {isCorrect === true && (
            <div id="quote-container" style={{ color: "green" }}>
              Correct!
            </div>
          )}
        </div>
      ) : (
        <div id="quote-container">Game over</div>
      )}
    </div>
  );
}

export default Type;
