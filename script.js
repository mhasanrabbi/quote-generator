const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

let apiQuotes = [];

// Show Loader
function showLoader() {
  loader.hidden = false;
  quoteContainer.hidden = true;
}

// Hide Loader
function removeLoader() {
    quoteContainer.hidden = false;
    loader.hidden = true;
}

//Show new quote
function newQuote() {
  showLoader();
  // Pick a random quote from apiQuotes array
  const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
  // If author field is blank and replace it with quote unknown
  if (!quote.author) {
    authorText.textContent = 'Unknown'
  } else {
    authorText.textContent = quote.author;
  }
  // Check quote length to determine styling
  if (quote.text.length > 100) {
    quoteText.classList.add('long-quote');
  } else {
    quoteText.classList.remove('long-quote');
  }
  // Set Quote, Hide Loader
  quoteText.textContent = quote.text;
  removeLoader();
}

// Get Quotes From API
async function getQuotes() {
  showLoader();
  const apiUrl = 'https://type.fit/api/quotes';
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
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
  window.open(twitterUrl, '_blank');
}

// Event Listeners
newQuoteBtn.addEventListener('click', newQuote);
twitterBtn.addEventListener('click', tweetQuote);

// OnLoad
getQuotes();
