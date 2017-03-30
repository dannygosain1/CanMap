$('#run').click(function () {
    var geojson = $.parseJSON($('#geojson').val());

    // Initiate the chart
    $('#container').slideDown().highcharts('Map', {
        series: [{
            mapData: geojson
        }]
    });
});

// $(document).ready(function () {
//   console.log("running function");
//     var geojson = $.getJSON($("/data/canada.geo.json").val());
//     console.log(geojson);
//     // Initiate the chart
//     $('#container').highcharts('Map', {
//         series: [{
//             mapData: geojson
//         }]
//     });
// });
