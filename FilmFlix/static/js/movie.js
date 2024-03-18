
export default class Movie {
    constructor( id = undefined, title, yearReleased, rating, duration, genre ){
        this.id = id
        this.title = title
        this.yearReleased = yearReleased
        this.rating = rating
        this.duration = duration
        this.genre = genre
    }

    static getMovieTitle( movieElement ){
        if( movieElement.classList.contains('mv-row') ) var title = movieElement.querySelector('mv-title span').innerHTML
        else if( movieElement.classList.contains('mv-list-item') ) title = movieElement.querySelector('mv-item-title').innerHTML
        else if( movieElement.classList.contains('movie-reg-item') ) title = movieElement.querySelector('mv-reg-item-title').innerHTML
        return String( title )
    }

    static async fetchAllMoviesJson(){
        try {
            const movieData = await fetch('/api/movies')
            if (!movieData.ok) throw new Error(`HTTP error! Status: ${response.status}`);
            const movieJson = await movieData.json()
            return movieJson
        } catch ( err ){
            console.error('Error fetching movies:', err);
        }

    }
        
    static delete( movie ){
        console.log( movie)
        const xhttp = new XMLHttpRequest()
        xhttp.open( 'DELETE', `/movies/${ String( movie.filmID ) }`, true )
        xhttp.send()
    }

    static fetchParentMovie( btn, register ){
        const movieRow = btn.closest('.mv-row') || btn.closest('.mv-list-item')
        const movie = register.listContent.find( (movie) => movieRow.id == movie.filmID )
        return movie
    }

    _constructListItemHTML(){
        const row = document.createElement('tr')
        row.classList.add('mv-row')
        row.id = String(this.id)
        row.innerHTML = `
                <td class="mv-title"><span>${ this.title }</span></td>
                <td class="mv-release">${ this.yearReleased }</td>
                <td class="mv-rating">${ this.rating }</td>
                <td class="mv-duration" class="tbl-key">${ this.duration }</td>
                <td class="mv-genre" class="tbl-key">${ this.genre }</td>
                <td class="tbl-row-opt">
                    <i class="bi bi-three-dots"></i>
                    <ul class="row-opt-menu">
                        <a href="/movies/${ String( this.id ) }"><li class="row-option flex"><span>Update</span></li></a>
                        <li class="row-option delete-btn flex"><span>Delete</span></li>
                    </ul>
                </td>
            `
        this.HTMLElement = row
        return row
    }

    _constructCardItemHTML(){
        const li = document.createElement('li')
        li.classList.add('mv-list-item', 'flex')
        li.id = String(this.id)
        li.innerHTML = `
                <div class="main-item-content flex">
                    <h3 class="mv-item-title">${ this.title }</h3>
                    <div class="mv-item-details flex">
                        <span class="mv-item-release">${ this.yearReleased }</span><span class="item-details-divider">•</span>
                        <span class="mv-item-duration">${ this.duration } mins</span><span class="item-details-divider">•</span>
                        <span class="mv-item-rating">${ this.rating }</span><span class="item-details-divider">•</span>
                        <span class="mv-item-genre">${ this.genre }</span>
                    </div>
                </div>
                <div class="mv-item-opt">
                    <i class="bi bi-three-dots"></i>
                    <ul class="row-opt-menu">
                        <a href="/movies/${ String( this.id ) }"><li class="row-option flex"><span>Update</span></li></a>
                        <li class="row-option delete-btn flex"><span>Delete</span></li>
                    </ul>
                </div>
            `
        this.HTMLElement = li
        return li
    }

    _constructSelectorRegItem(){
        const li = document.createElement('li')
        li.classList.add('movie-reg-item', 'flex')
        li.id = String(this.id)
        li.innerHTML = `
                <h3 class="mv-reg-item-title">${ this.title }</h3>
                <div class="mv-reg-item-details flex">
                    <span class="mv-reg-item-release">${ this.yearReleased }</span><span class="item-details-divider">•</span>
                    <span class="mv-reg-item-duration">${ this.duration } mins</span><span class="item-details-divider">•</span>
                    <span class="mv-reg-item-rating">${ this.rating }</span><span class="item-details-divider">•</span>
                    <span class="mv-reg-item-genre">${ this.genre }</span>
                </div>
                `
        this.HTMLElement = li
        return li
    }

    _addNew(){
        const xhttp = new XMLHttpRequest()
        xhttp.open( 'POST', '/movies/add-movie', true )
        xhttp.setRequestHeader( 'Content-type', 'application/json; charset=UTF-8' )
        xhttp.send( JSON.stringify(this) )
    }
    
    _updateMovieDetails(){
        const xhttp = new XMLHttpRequest()
        xhttp.open( 'PUT', `/movies/${ String( this.id ) }`, true )
        xhttp.setRequestHeader( 'Content-type', 'application/json; charset=UTF-8' )
        xhttp.send( JSON.stringify(this) )
    }
}

export const getTitleFromElement = Movie.getMovieTitle
export const fetchAllMovies = Movie.fetchAllMoviesJson