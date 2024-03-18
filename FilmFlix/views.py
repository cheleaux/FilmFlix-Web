from flask import Blueprint, render_template, request
from .Routes import *


views = Blueprint("views", __name__, template_folder='./templates')


@views.route("/")
def home():
    return render_template("home.html")


@views.route("/movies")
def movieRegister():
    query = request.args.get("query") if request.args.get("query") else None
    return render_template( "movieList.html", movies=fetchMovies( { 'query': query } ) )

@views.route("/api/movies")
def fetchAllMovies():
    movies = fetchMovies( { 'query': None } )
    return movies

# FIX DELETE OPERATION:
# ROUTE NOT FOUND / ROUTE METHOD NOT PERMITTED
# CHECK REQUEST URL IN 'movie.js'
@views.route("/movies/<int:movieId>", methods=[ "GET", "PUT", "DELETE" ])
def movieDetails( movieId ):
    if request.method == "GET":
        return render_template( "addMovie.html", details=fetchMovieDetails( movieId ) )
    elif request.method == "PUT":
        return movieUpdateResponder( request.json )
    elif request.method == "DELETE":
        return movieDeletionResponder( movieId )


@views.route("/movies/add-movie", methods=[ "GET", "POST" ])
def addMovie():
    if request.method == "GET":
        return render_template("addMovie.html")
    elif request.method == "POST":
        return movieInsertResponder( request.json )


@views.route("/api/custom-list", methods=[ "GET", "POST" ])
def fetchCustomList():
    if request.method == "GET":
        if request.args.get("list"):
            listId = request.args.get('list')
            return fetchMovies( { 'listID': listId } )
        else:
            return errorResponse( 'Undefined listID', 400 )
    elif request.method == 'DELETE':
        if request.args.get("list"):
            listId = request.args.get('list')
            return customListDeleteResponder( listId )


@views.route("/api/custom-list/all", methods=["GET"])
def fetchListData():
    customListDataRes = fetchCustomListMenuDetails()
    return customListDataRes


@views.route("/custom-lists/add-list", methods=[ "GET", "POST" ])
def addCustomList():
    if request.method == 'GET':
        return render_template('addCustomList.html')
    elif request.method == 'POST':
        newListDetails = request.json
        return customListInsertResponder( newListDetails )