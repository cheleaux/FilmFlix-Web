from flask import Blueprint, render_template

views = Blueprint('views', __name__)

@views.route( '/' )
def home():
    return render_template('home2.html')

@views.route( '/movie-list' )
def movieList():
    return render_template('movieList2.html')

@views.route( '/add-movie', methods=['GET', 'POST'] )
def AddMovie():
    return render_template('addMovie2.html')