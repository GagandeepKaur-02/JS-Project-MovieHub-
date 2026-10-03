let movieDetail = document.querySelector("#Movie-detail")

const params = new URLSearchParams(location.search)
const imdbID = params.get("id");
console.log(params, imdbID);

if (imdbID) {
    searchMovie(imdbID.trim());
}

async function searchMovie(imdbID) {

    let response = await fetch(`https://www.omdbapi.com/?apikey=9c88e885&i=${imdbID}&plot=full`)
    let data = await response.json();
    console.log(data);

    if (data.Response === "True") {
        displayMovie(data);
    } else {
        console.log(data.Error);
    }
}

// searchMovie();  //ehnu upr cll krtii


function displayMovie(data){
    movieDetail.innerHTML = `
    <div class="flex flex-col gap-8 animate-fade-in">
    
    <!-- TOP SECTION: Poster on Left, Primary Details & Plot on Right -->
    <div class="flex flex-col md:flex-row gap-8 lg:gap-12 items-center md:items-start">
        <!-- Movie Poster -->
        <div class="w-full max-w-[320px] flex-shrink-0 group">
            <div class="relative rounded-2xl overflow-hidden border border-slate-800 bg-slate-900 neon-border transition-all duration-500 group-hover:scale-[1.01] shadow-2xl shadow-indigo-500/10">
                <img src="${data.Poster}" alt="Movie Poster" class="w-full h-auto object-cover">
            </div>
        </div>


        <div class="flex-1 text-center md:text-left flex flex-col pt-2">
            <div class="flex flex-wrap items-center justify-center md:justify-start gap-2.5 mb-4">
                <span class="bg-amber-500/10 text-amber-400 border border-amber-500/20 text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1">
                    ⭐ ${data.imdbRating} / 10
                </span>
                <span class="bg-slate-800 text-slate-300 text-xs font-semibold px-3 py-1 rounded-full">${data.Rated}</span>
                <span class="bg-slate-800 text-slate-300 text-xs font-semibold px-3 py-1 rounded-full">${data.Runtime}</span>
                <span class="bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 text-xs font-medium px-3 py-1 rounded-full">${data.Released}</span>
            </div>

            <h1 class="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight mb-2 text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-slate-400">${data.Title}</h1>
            <p class="text-cyan-400 font-semibold tracking-wide text-sm md:text-base mb-5">${data.Genre}</p>

     
            <div class="mb-6 border-t border-b border-slate-800/60 py-5 text-left">
                <h2 class="text-slate-400 uppercase tracking-widest text-xs font-bold mb-2">Plot Overview</h2>
                <p class="text-slate-300 leading-relaxed text-base font-light">${data.Plot}</p>
            </div>

            <button class="relative bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-white  hover:from-pink-600 hover:to-indigo-600 font-bold py-3 px-8 rounded-xl border border-white/40 shadow-[5px_5px_0px_0px_rgba(255,255,255,0.15)] hover:shadow-[2px_2px_0px_0px_rgba(255,255,255,0.3)] hover:translate-x-[3px] hover:translate-y-[3px] transition-all duration-200">
                <a href=https://www.imdb.com/title/${data.imdbID} target="_blank" >View on IMDB</a>
            </button>
        </div>
    </div>

    <div class="w-full flex flex-col gap-5 mt-4 text-left">
        
  
        <div class="grid grid-cols-1 md:grid-cols-2 gap-5 text-sm">
          
            <div class="p-5 rounded-xl border border-slate-800 bg-slate-900/40 backdrop-blur-sm shadow-[4px_4px_0px_0px_rgba(255,255,255,0.05)] hover:border-purple-500/30 transition-all duration-300">
                <p class="text-purple-400 font-semibold text-xs uppercase tracking-wider mb-1">Director</p>
                <p class="text-slate-200 font-light text-sm">${data.Director}</p>
            </div>
            
            <div class="p-5 rounded-xl border border-slate-800 bg-slate-900/40 backdrop-blur-sm shadow-[4px_4px_0px_0px_rgba(255,255,255,0.05)] hover:border-purple-500/30 transition-all duration-300">
                <p class="text-purple-400 font-semibold text-xs uppercase tracking-wider mb-1">Writer</p>
                <p class="text-slate-200 font-light text-sm">${data.Writer}</p>
            </div>
        </div>

        
        <div class="p-5 rounded-xl border border-slate-800 bg-slate-900/40 backdrop-blur-sm shadow-[4px_4px_0px_0px_rgba(255,255,255,0.05)] hover:border-purple-500/30 transition-all duration-300 text-sm">
            <p class="text-purple-400 font-semibold text-xs uppercase tracking-wider mb-1">Actors</p>
            <p class="text-slate-200 font-light text-sm">${data.Actors}</p>
        </div>

        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-5 text-sm">
            <!-- Language Box -->
            <div class="p-5 rounded-xl border border-slate-800 bg-slate-900/40 backdrop-blur-sm shadow-[4px_4px_0px_0px_rgba(255,255,255,0.05)] hover:border-purple-500/30 transition-all duration-300">
                <p class="text-purple-400 font-semibold text-xs uppercase tracking-wider mb-1">Language</p>
                <p class="text-slate-200 font-light text-sm">${data.Language}</p>
            </div>
            
            <div class="p-5 rounded-xl border border-slate-800 bg-slate-900/40 backdrop-blur-sm shadow-[4px_4px_0px_0px_rgba(255,255,255,0.05)] hover:border-purple-500/30 transition-all duration-300">
                <p class="text-purple-400 font-semibold text-xs uppercase tracking-wider mb-1">Country</p>
                <p class="text-slate-200 font-light text-sm">${data.Country}</p>
            </div>
        </div>

    </div>
    </div>`;
}

