
export default class Movie {
    constructor( id = undefined, title, yearReleased, rating, duration, genre ){
        this.id = id
        this.title = title
        this.yearReleased = yearReleased
        this.rating = rating
        this.duration = duration
        this.genre = genre
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
                        <a href="/api/movies/${ String( this.id ) }"><li class="row-option flex"><span>Update</span></li></a>
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
                        <a href="/api/movies/${ String( this.id ) }"><li class="row-option flex"><span>Update</span></li></a>
                        <li class="row-option delete-btn flex"><span>Delete</span></li>
                    </ul>
                </div>
            `
        this.HTMLElement = li
        return li
    }

    _deleteMovie(){
        const xhttp = new XMLHttpRequest()
        xhttp.open( 'DELETE', `/api/movies/${ String( this.id ) }`, true )
        xhttp.send()
    }

    _addNew(){
        const xhttp = new XMLHttpRequest()
        xhttp.open( 'POST', '/api/add-movie', true )
        xhttp.setRequestHeader( 'Content-type', 'application/json; charset=UTF-8' )
        xhttp.send( JSON.stringify(this) )
    }

    _updateMovieDetails(){
        const xhttp = new XMLHttpRequest()
        xhttp.open( 'PUT', `/api/movies/${ String( this.id ) }`, true )
        xhttp.setRequestHeader( 'Content-type', 'application/json; charset=UTF-8' )
        xhttp.send( JSON.stringify(this) )
    }
}