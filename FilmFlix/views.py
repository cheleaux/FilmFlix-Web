from flask import Blueprint, render_template, request
from .Routes import *


views = Blueprint("views", __name__, template_folder='./templates')


@views.route("/")
def home():
    return render_template("home.html")


@views.route("/movies")
def listMovies():
    query = request.args.get("query") if request.args.get("query") else None
    return render_template( "movieList.html", movies=fetchMovies( { 'query': query } ) )

@views.route("/api/movies")
def fetchMovies():
    movies = fetchMovies( { 'query': None } )
    return movies


@views.route("/movies/<movieId>", methods=[ "GET", "DELETE", "PUT" ])
def selectMovie( movieId ):
    if request.method == "GET":
        return render_template( "addMovie.html", details=fetchMovieDetails( movieId ) )
    elif request.method == "PUT":
        return respondToMovieUpdate( request.json )
    elif request.method == "DELETE":
        return respondToMovieDelete( movieId )


@views.route("/movies/add-movie", methods=[ "GET", "POST" ])
def addMovie():
    if request.method == "GET":
        return render_template("addMovie.html")
    elif request.method == "POST":
        return respondToMovieInsert(request.json)


@views.route("/api/custom-list", methods=[ "GET", "POST" ])
def fetchCustomList():
    if request.method == "GET":
        if request.args.get("list"):
            listId = request.args.get('list')
            return fetchMovies( { 'listID': listId } )
        else:
            return errorResponse( 'Undefined listID', 400 )


@views.route("/api/custom-list/all", methods=[ "GET", "POST" ])
def fetchListData():
    customListDataRes = fetchCustomListMemuDetails()
    return customListDataRes


@views.route("/custom-list/add-list", methods=[ "GET", "POST" ])
def addCustomList():
    if request.method == 'GET':
        return render_template( 'addCustomList.html', lists=fetchCustomListMemuDetails )
    elif request.method == 'POST':
        newListDetails = request.json
        return createCustomList( newListDetails )