from flask import Blueprint, render_template, request
from .Routes import *


views = Blueprint("views", __name__, template_folder='./templates')


@views.route("/")
def home():
    return render_template("home.html")


@views.route("/api/movies")
def allMovies():
    query = request.args.get("query") if request.args.get("query") else None
    listID = request.args.get("list") if request.args.get("list") else None
    return render_template("movieList.html", movies=fetchMovies( listID, query ))


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
    # if request.method == "GET":
    #     return render_template("addList.html", movies=fetchMovies())
    # if request.method == "POST":
        # listDetails = request.json
    listDetails = {
        'name': 'Tom Cruise',
        'movieIDs': [2, 12, 19, 25]
    }
    return createCustomList( listDetails )

@views.route("/api/add-movie", methods=["GET", "POST"])
def AddMovie():
    if request.method == "GET":
        return render_template("addMovie.html")
    elif request.method == "POST":
        return respondToMovieInsert(request.json)
