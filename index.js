

Api = "http://www.omdbapi.com/?apikey=9c88e885&s=avenger"

const movieForm = document.querySelector("#movieForm");
const movieInput = document.querySelector("#movieInput");
const movieHub = document.querySelector("#movieHub");


movieForm.addEventListener("submit" , (e) => {
    e.preventDefault();

    let query = movieInput.value.trim();

    if(!query){
        return;
    }
    console.log(query);

    // Ye line last search ko memory me save rakhegi
    sessionStorage.setItem('lastSearch', query);

    searchMovies(query);
});

// Page load hote hi purani search ko automatic dubara chalane ke liye
window.addEventListener('DOMContentLoaded', () => {
    const savedQuery = sessionStorage.getItem('lastSearch');
    if (savedQuery) {
        movieInput.value = savedQuery; // Input box me naam wapas dikhega
        searchMovies(savedQuery);      // Purana result screen par wapas aa jayega
    }
});


async function searchMovies(movieName){

    // movieHub.innerHTML = `<p>Searching Movie...</p>`
    // movieHub.innerHTML = `<div class="loader"></div>`       //ehde nl loading show honi one tym tkk jinna tym search krn te result show na hove
    movieHub.innerHTML = `
        <div class="col-span-full flex justify-center items-center py-12 w-full">
            <div class="loader"></div>
        </div>
        `;

    let response = await fetch(`https://www.omdbapi.com/?apikey=9c88e885&s=${encodeURIComponent(movieName)}`)
    let data = await response.json();
    console.log(data);

    if(data.Response === "True"){
        displayMovies(data.Search);
    }else{
        console.log(data.Error);
        movieHub.innerHTML = `<p>${data.Error}</p>`
    }


    // displayMovies(data.Search);
}

function displayMovies(movies){
    movieHub.innerHTML = ""

   movies.forEach((movie) => {
    const div = document.createElement("div")

    div.dataset.imdbID = movie.imdbID
    div.setAttribute("class" , "movie-card group relative bg-slate-900/40 border border-slate-800 rounded-2xl overflow-hidden backdrop-blur-sm hover:border-cyan-500/50 transition-all duration-500 hover:-translate-y-2 shadow-xl hover:shadow-cyan-500/10")

    // div.className = "group relative bg-slate-900/40 border border-slate-800 rounded-2xl overflow-hidden backdrop-blur-sm hover:border-cyan-500/50 transition-all duration-500 hover:-translate-y-2 shadow-xl hover:shadow-cyan-500/10"
    
    div.innerHTML = `
             <div class="relative overflow-hidden aspect-[2/3]">
                <img src=${movie.Poster} alt="Movie Poster" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500">
                <div class="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent opacity-90"></div>
            </div>

            <div class="p-5 relative">
                <span class="text-xs font-bold uppercase tracking-wider text-purple-400 mb-1 block">Movie...</span>
                <h3 class="font-bold text-xl text-white group-hover:text-cyan-400 transition-colors duration-300 truncate">${movie.Title}</h3>
                <p  class="text-xs text-slate-400 mt-2 flex items-center justify-between">${movie.Year}</p>
            </div>
        `
    movieHub.append(div)
   })

}

movieHub.addEventListener("click" , (e) => {
    e.stopPropagation();

    const movieCard = e.target.closest(".movie-card");
    const imdbID = movieCard.dataset.imdbID
    
    location.href = `movieDetails.html?id=${imdbID}`     //bar vich name change ho jana ....te movieDetails vali file khul jani image te click krn nl
})