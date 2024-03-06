
export default class MovieSelector {
    constructor( domElement ){
        this.domElement = domElement
        this.searchbar = this.domElement.querySelector('#movie-title-search')
        this.register = this.domElement.querySelector('.movie-selector-register')
        this.collection = []
    }

    searchRegister(){
        // RETREIVE THE FITLERED LIST OF ELEMENTS FOR TITLE FILTER FUNCTION AND DISPLAY RENDER THEM
    }

    handleMovieSelection(){
        // WHEN CLICKED ON HIGHLIGHT THE CHOSEN MOVIE ELEMENT
        // THEN CHECK ALL 'selected' MOVIE ELEMENTS AND ADD THEM TO THE COLLECTION
    }
}