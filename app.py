import requests
import json
from flask import Flask, render_template, redirect, jsonify
from flask_pymongo import PyMongo

from bson import json_util
from bson.objectid import ObjectId
import geojson
from bson.json_util import loads


url = "https://api.weather.gov/alerts/active"
ca = requests.get(url).json()
app = Flask(__name__)
app.config["MONGO_URI"] = "mongodb://localhost:27017/firezones"
mongo = PyMongo(app)
db = mongo.db.zones
db.zones.drop()
db.zones.insert_one(ca)

# db2 = mongo.db.fires

with open("data.geojson") as f:
  gj = geojson.load(f)


# calling a file
# with open("data.geojson") as f:
#     gj = geojson.load(f)
# print(gj)

# db2.fires.drop()
# db2.fires.insert_one(gj)

@app.route("/")
def home():
    return render_template("index.html")

@app.route("/data", methods = ['GET'])
def index():
    data = list(db.zones.find())
    return json.dumps(data, default=json_util.default)

@app.route("/data2", methods = ['GET'])
def index2():
    return gj

@app.route("/chart", methods = ['GET'])
def index3():
    return render_template("chart.html")

@app.route("/map", methods = ['GET'])
def index4():
    return render_template("map.html")


if __name__ == "__main__":
    app.run(debug=True)
