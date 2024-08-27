# EDGE CASES: what if user doesn't enter any data

# Import flask class so we can use it
# Flask is a framework for building web apps, i.e. a toolbox for building websites
from flask import Flask, flash, redirect, render_template, request, url_for
from dotenv import load_dotenv
import spotify
import os

# creates an instance of the class flask, calls it app
app = Flask(__name__)

app.secret_key = 'b#K@d+f6Qw!ZpT4x2V9&0mNlXrS$yC3'

@app.route('/')
# create function that executes when user visits the url
def home_page():
    return render_template('index.html')

@app.route('/find-twin', methods=['POST'])
def find_twin():

    song = request.form.get('song')
    artist = request.form.get('artist')

    token = spotify.get_token()
    search_results = spotify.search_for_song(token, song, artist)

    if search_results is None:
        pass
    else:
        track_id = search_results["id"]
        recommendations = spotify.get_recs(token, track_id)
        if recommendations is None:
            pass
        else:
            tracks = recommendations.get('tracks', [])     

    return f"Finding tunes similar to {song} by {artist}"




# @app.route("/<word>")
# def user(word):
#     return f"Where do you think you're going? {word} doesn't exist!"

# @app.route("/secret/")
# def secret():
#     return redirect(url_for("user", word="Secret"))

if __name__ == '__main__':
    app.run(debug=True)

# get method: not secure data, typically typed in thru url or link
# post method: secure data, typically form data that won't be seen on either end or stored by the webserver unless we send it to a database