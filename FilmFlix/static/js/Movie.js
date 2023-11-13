
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
                <td class="mv-title">${ this.title }</td>
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

    _deleteMovie(){
        console.log( this.id )
        // const xhttp = new XMLHttpRequest()
        // xhttp.open( 'DELETE', `/api/movies/${ movie.id }`, true )
        // xhttp.send()
    }
}