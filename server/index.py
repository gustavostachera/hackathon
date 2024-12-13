from flask import Flask, request, jsonify, make_response
from flask_cors import CORS
import joblib
import pandas as pd

app = Flask(__name__)
CORS(app)

# Load the trained model
model = joblib.load('model/delayedFlights.pkl')
X = joblib.load('model/delayedFlightsColumns.pkl')


# Define the API endpoint
@app.route('/predict_delay', methods=['POST'])
def predict_delay():
    data = request.get_json()
    day_of_week = data['day_of_week']
    origin = data['origin']
    dest = data['dest']

    print(data)
    
    # Prepare the input data
    input_data = pd.DataFrame({'DayOfWeek': [day_of_week], 'Origin': [origin], 'Dest': [dest]})
    input_data = pd.get_dummies(input_data, columns=['Origin', 'Dest'], drop_first=True)
    input_data = input_data.reindex(columns=X.columns, fill_value=0)
    
    # Predict the probability of delay
    probability = model.predict_proba(input_data)[0][1]

    response = make_response(jsonify({'probability_of_delay': probability}))    
    response.headers['Access-Control-Allow-Origin'] = '*'
    response.headers['Access-Control-Allow-Methods'] = 'GET, POST, PUT, OPTIONS'
    
    
    return response

# creating an endpoint which returns the list of airport names and IDs, sorted in alphabetical order
@app.route('/airports', methods=['GET'])
def airports():
    airports = pd.read_csv('data/airports.csv')
    airports = airports.sort_values('AirportName')
    response = make_response(jsonify(airports.to_dict(orient='records')))
    response.headers['Access-Control-Allow-Origin'] = '*'
    response.headers['Access-Control-Allow-Methods'] = 'GET, POST, PUT, OPTIONS'

    return response

if __name__ == '__main__':
    app.run(debug=True)