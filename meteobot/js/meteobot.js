// Load the Visualization API and the corechart package.
google.charts.load('current', { packages: ['corechart', 'line'] });

// Set a callback to run when the Google Visualization API is loaded.
google.charts.setOnLoadCallback(drawBasic);

// Callback that creates and populates a data table,
// instantiates the chart,
// passes in the data and draws it.
function drawBasic() {

  var data = new google.visualization.DataTable();

  // Create the data table.
  data.addColumn('number', 'X');
  data.addColumn('number', 'Temp');

  // API data
  jQuery.get('http://fruskac/api/meteo/weekly', (response) => {
    fillDataTableAndDrawGraph(response, data);
  });

}

function fillDataTableAndDrawGraph(api_data, data) {

  // fill table with api data
  api_data.forEach(element => {
    data.addRow([parseInt(element.created), parseFloat(element.air_temperature)]);
  });

  // Set chart options
  var options = {
    'title': 'Erdevik, Serbia',
    hAxis: {
      title: 'Time'
    },
    vAxis: {
      title: 'Temperature'
    }
  };

  // Instantiate and draw our chart, passing in some options.
  var chart = new google.visualization.LineChart(document.getElementById('chart_div'));
  chart.draw(data, options);

}
