let quotes = [];
const quoteContainer = document.querySelector("#quote-container");
const quoteText = document.querySelector("#quote");
const authorText = document.querySelector("#author");
const twitterBtn = document.querySelector("#twitter");
const newQuoteBtn = document.querySelector("#new-quote");
const loader = document.querySelector("#loader");

function loading() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}

function complete() {
    loader.hidden = true;
    quoteContainer.hidden = false;
}

async function getQuotes() {
    loading();
    const apiUrl = 'https://type.fit/api/quotes';
    try {
        const res = await fetch(apiUrl);
        quotes = await res.json()
        getQuote()
    } catch (err) {
        console.log(err.message);
        alert(err.message)
    }
}

getQuotes()


function getQuote() {
    loading();
    const quote = quotes[Math.floor(Math.random() * quotes.length)];
    //check if author is null
    if(!quote.author){
        authorText.textContent = '- Unknown';
    } else {
        authorText.textContent = `- ${quote.author}`;
    }
    //check quote length to determine style
    if(quote.text.length > 100) {
        quoteText.classList.add('long-quote');
        console.log('big')
    } else {
        quoteText.classList.remove('long-quote')
    }
    //Set Quote, Hide Loader
    quoteText.textContent = quote.text;
    complete();
}

function tweetQuote() {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} ${authorText.textContent}`;
    window.open(twitterUrl, '_blank');
}

newQuoteBtn.addEventListener('click', getQuote);
twitterBtn.addEventListener('click', tweetQuote);

