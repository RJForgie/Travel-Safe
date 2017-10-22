var createPieChart = function () {
  var chart = new Highcharts.Chart({
    chart: {
      type: 'scatter',
      renderTo: document.querySelector('div#pie-chart')
    },
    title: {
      text: "Pokemon Types I've Caught"
    },
    series: [{
      name: 'Type',
      data: [
        {
          name: 'Fire',
          y: 4,
          color: '#FFAC33',
          sliced: true
        },
        {
          name: 'Water',
          y: 22,
          color: '#73B7FF'
        },
        {
          name: 'Grass',
          y: 10,
          color: '#00BA2F'
        }
      ]
    }]

  })

}
