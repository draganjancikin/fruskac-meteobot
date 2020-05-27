// Load the Visualization API and the corechart package.
google.charts.load('47', { packages: ['corechart', 'line'] });

// Set a callback to run when the Google Visualization API is loaded.
google.charts.setOnLoadCallback(() => {
  // get API data
  jQuery.get('http://fruskac/api/meteo/weekly', (response) => {
    drawChart("temperature", response);
    drawChart("air_humidity", response);
    drawChart("wind", response);
  });

});

function drawChart(data_type, api_response) {

switch (data_type) {
  case "temperature":
    parametars = {
      column: "Temp",
      podatak: "air_temperature",
      title: "Temperature",
      vAxisMinValue: 'none',
      vAxisMaxValue: 'none',
      color: '#D21E3B',
      div: "chart_temperature_div"
    };
    break;
  case "air_humidity":
    parametars = {
      column: "Humi",
      podatak: "air_humidity",
      title: "Air Humidity",
      vAxisMinValue: 0,
      vAxisMaxValue: 100,
      color: '#0162B3',
      div: "chart_humidity_div"
    };
    break;
  case "wind":
    parametars = {
      column: "Wind",
      podatak: "wind_speed",
      title: "Wind speed",
      vAxisMinValue: 'none',
      vAxisMaxValue: 'none',
      color: '#9D9402',
      div: "chart_wind_div"
    };
    break;

  default:
    break;
}

  // Create data table and add columns
  var data = new google.visualization.DataTable();
  data.addColumn('date', 'X');
  data.addColumn('number', parametars.column);

  let date_time;
  // fill table with api data
  api_response.forEach(element => {
    // data.addRow([parseInt(element.created), parseFloat(element.air_temperature)]);
    date_time = new Date(parseInt(element.created)*1000);
    // console.log(date_time);
    data.addRow([date_time, parseFloat(element[parametars.podatak])]);
  });

  // Set chart options
  var options = {
    legend: 'none',
    height: 200,
    /*'title': 'Erdevik, Serbia',*/
    hAxis: {
      title: 'Time',
    },
    vAxis: {
      title: parametars.title,
      minValue: parametars.vAxisMinValue,
      maxValue: parametars.vAxisMaxValue,
    },
    colors: [parametars.color],
    chartArea: {width: '85%'}
  };

  // Instantiate and draw our chart, passing in some options.
  var chart = new google.visualization.LineChart(document.getElementById(parametars.div));
  chart.draw(data, options);

}
