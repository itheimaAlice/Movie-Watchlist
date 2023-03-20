const searchMovie = document.getElementById("search-movie")
const searchSubmit = document.getElementById("search-submit")
const movie = document.getElementById("movie")
const explore = document.querySelector(".explore")
const exploreText = document.querySelector(".explore-text")
const watchlist = document.querySelector(".my-watchlist")
let myWatchlist = []
let myMovie = []
let searchMovieResult = []

if(!myWatchlist) {
    myWatchlist = []
}

if(searchSubmit) {
   searchSubmit.addEventListener("click", renderMovie) 
}

function renderMovie(e) {
    e.preventDefault()
    explore.style.display = "none"
    movie.innerHTML = ""
    fetch(`https://www.omdbapi.com/?s=${searchMovie.value}&apikey=ecb6c788`)
        .then(res => res.json())
        .then(data => {
            if(data.Search && searchMovie.value) {
                data.Search.map(movie => {
                    fetch( `https://www.omdbapi.com/?i=${movie.imdbID}&apikey=ecb6c788`)
                        .then(res => res.json())
                        .then(data => {
                            searchMovieResult.push(data)
                            getMovieHtml(data)
                    })   
                })    
            } else {
                explore.style.display = "block"
                explore.textContent = "Unable to find what you’re looking for. Please try another search."
            }
        searchMovie.value = "" 
    })
}

function getMovieHtml(data) {
    let movieHtml = ""
    movieHtml = `
        <div class="movie-list">
            <img src="${data.Poster}" class="movie-img" />
            <div>
                <div class="movie-title-detail">
                    <h3 class="movie-title">${data.Title}</h3>
                    <i class="fa-sharp fa-solid fa-star"></i>
                    <p class="movie-rating">${data.imdbRating}</p>
                </div>
                <div class="movie-other-detail">
                    <p>${data.Runtime}</p>
                    <p>${data.Genre}</p>
                    <button class="addbtn" data-add="${data.imdbID}">
                        <i class="fa-solid fa-circle-plus"></i>
                        Watchlist
                    </button>
                </div>
                <p class="movie-plot">${data.Plot}</p>
            </div>
        </div>
    `
    movie.innerHTML += movieHtml    
}

document.addEventListener("click", e => {
    if(e.target.dataset.add) {
        e.target.innerHTML = `<i class="fa-solid fa-circle-minus"></i> Remove`
        e.target.disabled = true
        handleAddClick(e.target.dataset.add)   
    } 
}) 

function handleAddClick(addedMovieId) {
    const targetMovieObj = searchMovieResult.filter(movie => movie.imdbID === addedMovieId)[0]
    myMovie.unshift(targetMovieObj)
    localStorage.setItem("myMovie", JSON.stringify(myMovie))
    let myWatchlist = JSON.parse(localStorage.getItem("myMovie"))    
} 













    

   




