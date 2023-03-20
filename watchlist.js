const movieWatchlist = document.getElementById("movie-watchlist")
const addMovieDetail = document.getElementById("add-movie-detail")
let myWatchlist = JSON.parse(localStorage.getItem("myMovie")) 

document.addEventListener("click", e => {
    if(e.target.dataset.add) {
        handleAddClick(e.target.dataset.add)   
    } else if(e.target.dataset.minus) {
        handleRemoveClick(e.target.dataset.minus)
    }
}) 

function handleRemoveClick(removedMovieId) {
    const removeIndex = myWatchlist.findIndex(movie => movie.imdbID === removedMovieId)
    myWatchlist.splice(removeIndex, 1)
    localStorage.setItem("myMovie", JSON.stringify(myWatchlist))
    getWatchlistHtml()
}

function getWatchlistHtml() {
   if(myWatchlist.length > 0) {
        let movieWatchlistHtml = ""
        myWatchlist.forEach(movie => {
            movieWatchlistHtml += `
                <div class="movie-list">
                <img src="${movie.Poster}" class="movie-img" />
                <div>
                    <div class="movie-title-detail">
                        <h3 class="movie-title">${movie.Title}</h3>
                        <i class="fa-sharp fa-solid fa-star"></i>
                        <p class="movie-rating">${movie.imdbRating}</p>
                    </div>
                    <div class="movie-other-detail">
                        <p>${movie.Runtime}</p>
                        <p>${movie.Genre}</p>
                        <button class="addbtn" data-minus="${movie.imdbID}">
                            <i class="fa-solid fa-circle-minus"></i>
                            Remove
                        </button>
                    </div>
                    <p class="movie-plot">${movie.Plot}</p>
                </div>
            </div>
            `
        })
        movieWatchlist.innerHTML = movieWatchlistHtml
    } else {
        movieWatchlist.innerHTML = `
            <div id="add-movie-detail">
                <h3 class="empty-text">Your watchlist is looking a little empty...</h3>
                <a href="index.html" class="add-movie">
                    <i class="fa-solid fa-circle-plus"></i>
                    <h4 class="add">Let’s add some movies!</h4>
                </a>
            </div>
        `
    }
}      
getWatchlistHtml()


