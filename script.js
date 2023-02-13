const inputBox = document.getElementById("input");
const form = document.getElementById("form");

let quoteIndex = 0;
let score = 0;
let totalTime=0;
let startTime;

fetch("https://type.fit/api/quotes")
    .then(response => response.json())
    .then(data => {

        const quotes = [];
        while (quotes.length < 10) {

        const randomIndex = Math.floor(Math.random() * data.length);
        const quote = data[randomIndex];

        if (!quotes.includes(quote.text)) {
            quotes.push(quote.text);
        }
        
        }

        form.addEventListener("submit", (event) => {

            event.preventDefault()
            updateQuote(quotes);   
            inputBox.addEventListener("keypress", submitHandler(quotes));

        })   
 
});

function updateQuote(quotes) {

    startTime = new Date();
    form.remove()
    document.getElementById("quote-container").innerHTML = quotes[quoteIndex];

    const input=`<input id="input-box" type="text" />`
    inputBox.innerHTML=input

}

var submitHandler = function(quotes){

    return function submit(event) {

        if (event.key === "Enter") {

            endTime = new Date();
            const timeTaken = (endTime - startTime) / 1000;
            totalTime += timeTaken;
            console.log(startTime)
            console.log(totalTime)

            const inputBox = document.getElementById("input-box");
            const messageContainer = document.getElementById("message-container");
            const userInput = inputBox.value;
                
            if (userInput === quotes[quoteIndex]) {

                score++;
                messageContainer.innerHTML = "<p style='color: green;'>Correct!</p>";

            } else {

                inputBox.style.borderColor = "red";
                messageContainer.innerHTML = "<p style='color: red;'>Incorrect</p>";

            }
            quoteIndex++;

            if (quoteIndex === quotes.length) {

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
                location.reload();

            } else {

                inputBox.value = "";
                inputBox.style.borderColor = "black";
                updateQuote(quotes);

            }

    }

    }

}


