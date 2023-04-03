// Select the form, search input, and search results elements from the HTML
const form = document.querySelector('form');
const searchInput = document.querySelector('#searchInput');
const searchResults = document.querySelector('#searchResults');

// Add an event listener to the form to handle submission of search queries
form.addEventListener('submit', event => {
	// Prevent the default form submission behavior
	event.preventDefault();
	// Call the searchMovies function with the value of the search input as the argument
	searchMovies(searchInput.value);
});

// Define an asynchronous function to search for movies using the OMDb API
async function searchMovies(query) {
	// Send a request to the OMDb API with the search query and API key
	const response = await fetch(`https://www.omdbapi.com/?s=${query}&apikey=fe81bb55`);
	// Convert the response data to JSON format
	const data = await response.json();
	// If there are results in the data, call the showMovies function with the search results as the argument
	if (data.Search) {
		showMovies(data.Search);
	} else {
		// If there are no results, show an error message
		showError('No movies found');
	}
}

// Define a function to display search results in the HTML
function showMovies(movies) {
	// Clear any previous search results
	searchResults.innerHTML = "";
	// Loop through the array of movies and create a new HTML element for each one
	movies.forEach((movie) => {
		const movieElement = document.createElement("div");
		movieElement.classList.add("movie");
		movieElement.innerHTML = `
			<img src="${movie.Poster}">
			<h2>${movie.Title}</h2>
			<p>${movie.Year}</p>
			<p>${movie.Type}</p>
			<button onclick="showMovieDetails('${movie.imdbID}')">Details</button>
		`;
		// Add the new movie element to the search results section of the HTML
		searchResults.appendChild(movieElement);
	});
}

// Define an asynchronous function to show details for a selected movie
async function showMovieDetails(id) {
	// Send a request to the OMDb API with the movie ID and API key
	const response = await fetch(`https://www.omdbapi.com/?i=${id}&apikey=YOUR_API_KEY`);
	// Convert the response data to JSON format
	const data = await response.json();
	// Create a new HTML element to display the movie details
	const modalContent = `
		<h2>${data.Title}</h2>
		<p>${data.Year} | ${data.Runtime} | ${data.Genre}</p>
		<p>${data.Plot}</p>
		<p>Starring: ${data.Actors}</p>
		<p>Directed by: ${data.Director}</p>
		<p>Written by: ${data.Writer}</p>
		<button onclick="hideMovieDetails()">Close</button>
	`;
	// Select the modal dialog element from the HTML
	const modalDialog = document.querySelector('#modalDialog');
	// Set the content of the modal dialog to the movie details
	modalDialog.innerHTML = modalContent;
	// Display the modal dialog
	modalDialog.style.display = 'block';
}

// Define a function to hide the movie details modal dialog
function hideMovieDetails() {
	// Select the modal dialog element from the HTML
	const modalDialog = document.querySelector('#modalDialog');
	// Check if the modal dialog has any child nodes
	if (modalDialog.hasChildNodes()) {
        //Hide the modal dialog
        modalDialog.style.display = 'none';
    }    
}
// Define a function to show an error message in the HTML
function showError(message) {
	search}
