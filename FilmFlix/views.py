from flask import Blueprint, render_template, request
from .Routes import *


views = Blueprint("views", __name__, template_folder='./templates')


@views.route("/")
def home():
    return render_template("home.html")


@views.route("/api/movies")
def allMovies():
    query = request.args.get("query") if request.args.get("query") else None
    listName = request.args.get("list") if request.args.get("list") else 'all'
    return render_template("movieList.html", movies=fetchMovieList( listName, query ))


@views.route("/api/movies/<movieId>", methods=["GET", "DELETE", "PUT"])
def selectMovie(movieId):
    if request.method == "GET":
        return render_template("addMovie.html", details=fetchMovieDetails(movieId))
    elif request.method == "PUT":
        return respondToPUT(request.json)
    elif request.method == "DELETE":
        return respondToDELETE(movieId)


@views.route("/api/add-movie", methods=["GET", "POST"])
def AddMovie():
    if request.method == "GET":
        return render_template("addMovie.html")
    elif request.method == "POST":
        return respondToPOST(request.json)
