$(document).ready(function() {
  $("#trip-form").submit(function(event) {
    event.preventDefault(); // Prevent default form submission

    var source = $("#source").val();
    var destination = $("#destination").val();

    // Send AJAX request to TripBuddy service
    $.ajax({
      url: "http://127.0.0.1:5000/trip/" + encodeURIComponent(source) + "/" + encodeURIComponent(destination),
      success: function(response) {
        displayWeather(response);
      },
      error: function(jqXHR, textStatus, errorThrown) {
        // Handle errors (optional)
        console.error("Error:", textStatus, errorThrown);
        $("#weather-info").html("prince ");
      }
    });
    console.log(source);
  });
});

function displayWeather(data) {
  // This function parses the JSON response and displays weather information
  var html = "";
  html += "<h2>Source City: " + data.source + "</h2>";
  
  // Add logic to check for errors in source city data
  if (data.weather && data.weather[data.source]) {
    html += "<p>Weather: " + data.weather[data.source].weather[0].main + " (" + data.weather[data.source].weather[0].description + ")</p>";
    html += "<p>Temperature: " + data.weather[data.source].main.temp + "°F</p>";
  } else {
    html += "<p>Weather data unavailable for source city.</p>";
  }
  
  // Add destination city weather information
  html += "<h2>Destination City: " + data.destination + "</h2>";
  if (data.weather && data.weather[data.destination]) {
    html += "<p>Weather: " + data.weather[data.destination].weather[0].main + " (" + data.weather[data.destination].weather[0].description + ")</p>";
    html += "<p>Temperature: " + data.weather[data.destination].main.temp + "°F</p>";
  } else {
    html += "<p>Weather data unavailable for destination city.</p>";
  }

  // Display the weather information
  $("#weather-info").html(html);
  return data;
}

