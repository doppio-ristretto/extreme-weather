import requests
import json
from flask import Flask, render_template, redirect, jsonify
from flask_pymongo import PyMongo

url = "https://api.weather.gov/alerts/active?area=CA"
ca = requests.get(url).json()


app = Flask(__name__)
app.config["MONGO_URI"] = "mongodb://localhost:27017/firezones"
mongo = PyMongo(app)

db = mongo.db.zones

db.zones.drop()

db.zones.insert_one(ca)


@app.route("/")
def home():
    return render_template("index.html", test = "hi")

@app.route("/data")
def index():
    data = list(db.zones.find())
    return render_template("index.html", fire=data)



if __name__ == "__main__":
    app.run(debug=True)


