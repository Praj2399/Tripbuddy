from flask import Flask, request, jsonify
import requests

app = Flask(__name__)
@app.after_request
@app.after_request
def after_request(response):
    response.headers["Access-Control-Allow-Origin"] = "*"
    response.headers["Access-Control-Allow-Headers"] = "Content-Type,Authorization"
    response.headers["Access-Control-Allow-Methods"] = "GET"
    return response


# API Key (replace with your own)
OPENWEATHER_API_KEY = "cb6e8cc8e8a70c9da03903e2da5b85b8"

@app.route("/trip/<source>/<destination>")
def get_trip_details(source, destination):
  """
  Fetches weather data for a trip.

  Args:
      source: Source city name.
      destination: Destination city name.

  Returns:
      JSON response containing weather for both cities.
  """
  weather_data = get_weather(source, destination)

  response = {
      "source": source,
      "destination": destination,
      "weather": weather_data
  }
  return jsonify(response)

def get_weather(source, destination):
  """
  Fetches weather data for both cities using OpenWeatherMap API.

  Args:
      source: Source city name.
      destination: Destination city name.

  Returns:
      Dictionary containing weather data for both cities.
  """
  weather = {}
  for city in [source, destination]:
    url = f"https://api.openweathermap.org/data/2.5/weather?q={city}&appid={OPENWEATHER_API_KEY}"
    response = requests.get(url)
    if response.status_code == 200:
      weather[city] = response.json()
      print(response.json());
    else:
      weather[city] = {"error": "Failed to get weather data"}
  return weather

# Run the Flask application (usually on a server)
if __name__ == "__main__":
    app.run(debug=True, port=5000)

