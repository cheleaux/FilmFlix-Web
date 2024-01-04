from flask import Blueprint, render_template, request
from .Routes import *


views = Blueprint("views", __name__, template_folder='./templates')


@views.route("/")
def home():
    return render_template("home.html")


@views.route("/api/movies")
def ListMovies():
    query = request.args.get("query") if request.args.get("query") else None
    return render_template("movieList.html", movies=fetchMoviesJSON( { 'query': query } ))   


@views.route("/api/movies/<movieId>", methods=["GET", "DELETE", "PUT"])
def selectMovie(movieId):
    if request.method == "GET":
        return render_template("addMovie.html", details=fetchMovieDetails(movieId))
    elif request.method == "PUT":
        return respondToMovieUpdate(request.json)
    elif request.method == "DELETE":
        return respondToMovieDelete(movieId)
    

@views.route("/api/custom-list", methods=["GET", "POST"])
def addCustomList():
    if request.method == "GET":
        if request.args.get("list"):
            listId = request.args.get('list')
            return fetchMoviesJSON( { 'listID': listId } )
        else:
            return render_template( 'customLists.html', lists=fetchAllCustomListDetails )
    if request.method == "POST":
        listDetails = request.json
        return createCustomList( listDetails )


@views.route("/api/custom-list/all", methods=["GET", "POST"])
def fetchListData():
    customListDataRes = fetchAllCustomListDetails()
    return customListDataRes

@views.route("/api/add-movie", methods=["GET", "POST"])
def AddMovie():
    if request.method == "GET":
        return render_template("addMovie.html")
    elif request.method == "POST":
        return respondToMovieInsert(request.json)
