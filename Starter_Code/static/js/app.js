
  function buildCharts(sample) {
  
    // Use the D3 library to read in `samples.json`.
    var chartsURL = "/samples/" + sample;
    d3.json(chartsURL).then(function (data) {
  
    // Create a bubble chart that displays each sample.
   var trace1 = {
    x: data.otu_ids,
    y: data.sample_values,
    mode: 'markers',
    text: data.otu_labels,
    marker: {
      color: data.otu_ids,
      size: data.sample_values,
  
      colorscale: "Earth"
    }
  };
  var trace1 = [trace1];
  var layout = {
    showlegend: false,
    height: 600,
    width: 1500
  };
  
  Plotly.newPlot('bubble', trace1, layout);
  
  //  Create a horizontal bar chart with a dropdown menu to display the top 10 OTUs found in that individual.
      var data = [{
        values: data.sample_values.slice(0, 10),
        labels: data.otu_ids.slice(0, 10),
        hovertext: data.otu_labels.slice(0, 10),
        type: 'pie',
      }];
      var layout = {
        showlegend: true,
      };
      Plotly.newPlot('pie', data, layout);
  
    }
  )}
  
  function init() {
    // Grab a reference to the dropdown select element
    var selector = d3.select("#selDataset");
  
    // Use the list of sample names to populate the select options
    d3.json("/names").then((sampleNames) => {
      sampleNames.forEach((sample) => {
        selector
          .append("option")
          .text(sample)
          .property("value", sample);
      });
  
      // Use the first sample from the list to build the initial plots
      const firstSample = sampleNames[0];
      buildCharts(firstSample);
      buildMetadata(firstSample);
    });
  }
  
  function optionChanged(newSample) {
    // Fetch new data each time a new sample is selected
    buildCharts(newSample);
    buildMetadata(newSample);
  }
  
  // Initialize the dashboard
  init();