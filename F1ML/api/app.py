#Author: Patrick Horan 2021
#Code for flask application
#Currently deployed at https://f1ml.herokuapp.com/
import os
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import flask
import pickle
import time
import json
import io
from io import BytesIO
from datetime import datetime,timezone
from flask import Flask, render_template, request, jsonify
from flask_cors import CORS, cross_origin
from pandas import DataFrame
from base64 import encodebytes
from PIL import Image
from firebase import firebase
#from sklearn.linear_model import LinearRegression
#from sklearn.model_selection import train_test_split

#Configuration for FLask app, uses FLask CORS to enable communication with React Native front end
app = Flask(__name__)
app.host = '0.0.0.0'
CORS(app)
cors = CORS(app, resources={
    r"/*": {
        "origins":"*"
    }
})
firebase = firebase.FirebaseApplication('https://f1ml-c8d00-default-rtdb.firebaseio.com/')

#Run flask with host as 0.0.0.0:5000 Unable to work with android device otherwise
#Method that was previously used to send last race to front end, replaced by Firebase functionality
@app.route('/')
def get_last_Race():
    with open('lastRaceTable.json') as json_file:
        data = json.load(json_file)
        response = app.response_class(
            response=json.dumps(data),
            status=200,
            mimetype='application/json'
        )
        return response

#Method for uploading last race table to Realtime database
@app.route('/uploadLastRace', methods=['POST', 'GET'])
def upload_last_race():
    with open('lastRaceTable.json') as json_file:
        data = json.load((json_file))
        res = firebase.post('/lastRace', data)
        return res

#Function for uploading all race results to Firebase
#No longer utilised
@app.route('/results', methods=['POST', 'GET'])
def upload_results():
    path = 'raceResults'
    for filename in os.listdir(path):
        fName = path+ '/'+ filename
        with open(fName) as json_file:
            df = pd.read_json(json_file,orient='index')
            #data = json.load((json_file))
            output = df.to_dict()
            firebase.post('/results', output,{'print': 'pretty'})
            #return result
#Original implementation of uploading results, didnt work
#def upload_res():
 #   with open('results.json') as json_file:
 #       data = json.load((json_file))
 #       response = app.response_class(
 #           response=json.dumps(data),
 #           status=200,
 #           mimetype='application/json'
 #       )
  #      result = firebase.post('/results', data)
  #      return result

#Function for uploading table of future races to Firebase
@app.route('/uploadRaceTimes',methods=['GET'])
def send_raceTimes():
    with open('upcomingRaces.json') as json_file:
        data = json.load((json_file))
        res = firebase.post('/raceTimes',data)
        return res

#Function for deleting all data for future races
@app.route('/deleteRaceTimes',methods=['GET', 'POST'])
def del_raceTimes():
        output = firebase.delete('/', 'raceTimes')
        return output

#Function for uploading prediction table to Firebase
@app.route('/uploadPredict',methods=['GET'])
def send_pred():
    with open('finalPredTable.json') as json_file:
        data = json.load((json_file))
        res = firebase.post('/predict',data)
        return res

#Function for returning race results
@app.route('/res', methods=['GET', 'POST'])

#Original code for uploading race results to firebase, not used anymore
#def send_res():
#    with open('results.json') as json_file:
#        data = json.load((json_file))
#        res = firebase.post('/results', data)
#        return res
#function for returning specific race results
#data recieved from front end is compared with every file in the race results folder until the correct race is returned
def send_raceResult():
    if request.method == 'POST':
        #print(request.json['data']['race'])
        race = request.json['data']['race']
        path = 'raceResults'
        for filename in os.listdir(path):
            if race in filename:
                    fName = path + '/' + filename
                    with open(fName) as json_file:
                        data = json.load((json_file))
                        response = app.response_class(
                                             response=json.dumps(data),
                                             status=200,
                                             mimetype='application/json'
                                         )
        return response
if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(host = '0.0.0.0', port=port)

#Code for returning list of all F1 races
@app.route('/raceList', methods=['GET'])
def get_raceList():
    with open('raceList.json') as json_file:
        data = json.load((json_file))
        response = app.response_class(
            response=json.dumps(data),
            status=200,
            mimetype='application/json'
        )
        return response


#Code for deleting result data from firebase
@app.route('/deleteResults', methods=['POST','GET'])
def del_res():
    output = firebase.delete('/', 'results')
    return output


#Code for sending prediction graph image as stream
#No longer used due to time constraints
@app.route('/graph', methods= ['GET'])
def get_predict_graph():
    imagePath = 'images/finalTimeOverLaps.png'
    img = Image.open(imagePath, mode='r')
    byteArr = io.BytesIO()
    img.save(byteArr, format='PNG')
    encodedImg = encodebytes(byteArr.getvalue()).decode('ascii')
    response = {'Status': 'Success', 'ImageBytes': encodedImg}
    return response

#Function for sending race predictions to front end
#Replaced by Firebase solution
@app.route('/model', methods=['GET'])
def get_model():
    with open('finalPredTable.json') as json_file:
        data = json.load((json_file))
        response = app.response_class(
            response=json.dumps(data),
            status=200,
            mimetype='application/json'
        )
        return response



@app.route('/time', methods = ['GET'])
def get_race_time():
    raceTime = datetime(2021, 4, 18, 15, 00,)
    dif = raceTime - datetime.now()
    print(dif)
    rTime = raceTime.isoformat()
    diff = str(rTime)
    timeResult = {'data': 'Emilia Romagna', 'time': dif}
    return {
            "track": "Emilia Romagna",
            "time": diff
    }
if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(host = '0.0.0.0', port=port)

