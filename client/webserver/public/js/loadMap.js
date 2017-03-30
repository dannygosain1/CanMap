function load_map(geojson) {
  // Initiate the chart
  Highcharts.mapChart('container', {
      title: {
        text: 'Sample Title'
      },

      mapNavigation: {
          enabled: true,
          buttonOptions: {
              verticalAlign: 'top'
          }
      },
      series: [{
          name: 'Sample Data',
          mapData: geojson,
      }]
  });

}
$(document).ready(function() {
    $.getJSON('/data/canada.geo.json', load_map);
});
