const quoteContainer = document.getElementById('quote-container')
const quoteText = document.getElementById('quote')
const authorText = document.getElementById('author')
const twitterBtn = document.getElementById('twitter')
const newQuoteBtn = document.getElementById('new-quote')
const loader = document.getElementById('loader')

let apiQuotes = [];

// Show Loading
function loading() {
    quoteContainer.hidden = true
    loader.hidden = false
}

// Hide Loading
function  complete() {
    quoteContainer.hidden = false
    loader.hidden = true
}

// Show new quote
function newQuote() {
    loading()
    // Get quotes from API
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)]
    if (quote.author == null) {
        authorText.textContent = "Unknown"
    } else {
        authorText.textContent = quote.author 
    }

    // Check quote length to determine styling
    if (quote.text.length > 140) {
        quoteText.classList.add('long-quote')
    } else {
        quoteText.classList.remove('long-quote')
    }
    // Set quote, Hide Loader
    quoteText.textContent = quote.text
    complete()
}

// Get quotes from API
async function getQuotes() {
    loading()
    const apiUrl ="https://type.fit/api/quotes"
    try {
        const response = await fetch(apiUrl);
        apiQuotes = await response.json();
        newQuote();
    } catch (error) {
        // Catch error here
    }
}

// Tweet Quote
function tweetQuote() {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`
    window.open(twitterUrl, '_blank')
}

// Event Listeners
newQuoteBtn.addEventListener('click', newQuote)
twitterBtn.addEventListener('click', tweetQuote)

// On Load
getQuotes()
