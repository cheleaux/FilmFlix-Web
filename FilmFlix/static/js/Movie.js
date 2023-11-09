
export default class Movie {
    constructor( id, title, yearReleased, rating, duration, genre ){
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
        row.innerHTML = `
            <tr class="mv-row">
                <td class="mv-title">${ this.title }</td>
                <td class="mv-release">${ this.yearReleased }</td>
                <td class="mv-duration">${ this.rating }</td>
                <td class="mv-rating" class="tbl-key">${ this.duration }</td>
                <td class="mv-genre" class="tbl-key">${ this.genre }</td>
                <td class="tbl-row-opt">
                    <i class="bi bi-three-dots"></i>
                    <ul class="row-opt-menu">
                        <a href="#"><li class="row-option flex"><span>Update</span></li></a>
                        <a href="#"><li class="row-option flex"><span>Delete</span></li></a>
                    </ul>
                </td>
            </tr>
            `
        return row
    }
}