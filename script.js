let apiQuotes = [];

const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterbtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

// display loader
function loading() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}

// complete loading and hide loader
function complete() {
    loader.hidden = true;
    quoteContainer.hidden = false;
}

// Get a new quote
function newQuote () {
    loading();
    const newQuote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
    //console.log(newQuote);
    quoteText.textContent = newQuote.text;
   
    if(newQuote.text.length > 50) {
        quoteText.classList.add('long-quote');
    } else {
        quoteText.classList.remove('long-quote');
    }


    if(!newQuote.author) {
        authorText.textContent = 'Unknown';
    } else {
        authorText.textContent = newQuote.author;
    }
    // set quote and hide loader
    complete();
}

// fetch quotes from api
async function getQuotes() {
    loading();
    const apiUrl = 'https://jacintodesign.github.io/quotes-api/data/quotes.json';

    try {
        const response = await fetch(apiUrl);
        apiQuotes = await response.json();
        //console.log(apiQuotes[12]);
        newQuote();
    }
    catch(error) {
        // catch error here
    }
}

// tweet button functionality
function tweetQuote() {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textcontent}`;
    window.open(twitterUrl, '_blank');
}

// Event Listeners
twitterbtn.addEventListener('click', tweetQuote);
newQuoteBtn.addEventListener('click', newQuote);

// on Load
getQuotes();
