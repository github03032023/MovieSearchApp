
const movieNameInput = document.getElementById("movieName");
const searchButton = document.getElementById("searchButton");

searchButton.addEventListener("click", function () {
    const movieName = movieNameInput.value.trim();
    alert(movieName);
    if (movieName) {
        const apiKey = '5a8066c7';
        const apiURL = `https://www.omdbapi.com/?apikey=${apiKey}&t=${encodeURIComponent(movieName)}`;

        // Invoke a request based on a movie name
        axios.get(apiURL)
            .then(function (response) {
                if (response.data.Response === 'True') {
                    console.log('Movie Data:', response.data);
                    // Display Movie Data in the page
                    loadDataIntoDOM(response.data);
                    
                } else {
                    console.log('Movie not found:', response.data.Error);
                    hideMovieDetails();
                    // Handle the case where the movie is not found
                }
            })
            .catch(function (error) {
                // handle error
                console.log('Error Fetching Data:',error);
            });
        } else {
            alert('Please enter a movie name.');
        }

});

// Load HTML DOM elements with response data
function loadDataIntoDOM(data){
    document.getElementById("movieDetails").style.display= "block";
    document.querySelector("#title").innerHTML = data.Title;
    document.querySelector("#releasedYear").innerHTML = data.Released;
    document.querySelector("#plot").innerHTML = data.Plot;
    const imgElement = document.querySelector("#posterImage");
    imgElement.src = data.Poster;
    // document.querySelector("#posterImage").innerHTML = data.Poster;

}

function hideMovieDetails(){
    document.getElementById("movieDetails").style.display= "none";
    const movieMsgDiv= document.querySelector("#movieMsg");
    movieMsgDiv.style.display="block";
    movieMsgDiv.style.color="red";
    movieMsgDiv.innerHTML="Movie Not Found!"


    

}