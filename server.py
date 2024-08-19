# Import flask class so we can use it
# Flask is a framework for building web apps, i.e. a toolbox for building websites
from flask import Flask, render_template

# creates an instance of the class flask, calls it app
app = Flask(__name__)


@app.route('/')
# create function that executes when user visits the url
def home_page():
    return render_template('index.html')

if __name__ == '__main__':
    app.run(debug=True)