// Create a constant for the URL.
const samples_url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

// Get all the json data and log it.
d3.json(samples_url).then(function(data) {
    console.log(data);
  });

function init() {

    // Using D3 library to select the dropdown menu.
    let subjectIDMenu = d3.select("#selDataset");

    // Using D3 library to get json data from the URL.
    d3.json(samples_url).then((sampleData) => {

        // Assign sample data name to a variable.
        let names = sampleData.names;

        // Loop through each sample data name and create a list of sample id for the dropdown menu.
        names.forEach((id) => {

            subjectIDMenu.append("option").text(id).property("value",id);
        
        });

        // Assign fisrt sample index to a variable.
        let init_sample = names[0];

        // Initiate all functions for the charts and metadata.
        createBarChart(init_sample);
        createBubbleChart(init_sample);
        displayMetadata(init_sample);

    });

};

// Create function to plot the bar chart.
function createBarChart(sample_id) {

    // Using D3 library to get json data from the URL.
    d3.json(samples_url).then((sampleData) => {
    
        // Filter the sample data based on the sample id.
        let filteredValue = sampleData.samples.filter(result => result.id == sample_id);

        // Assign first sample index to a variable.
        let init_DataValue = filteredValue[0];

        // Get the value for otu_ids, otu_labels and sample_values.
        let otu_ids = init_DataValue.otu_ids;
        let otu_labels = init_DataValue.otu_labels;
        let sample_values = init_DataValue.sample_values;

        // Sort value in descending order and get the first 10 results.
        let yvalues = otu_ids.slice(0,10).map(id => `OTU ${id}`).reverse();
        let xvalues = sample_values.slice(0,10).reverse();
        let chartlabels = otu_labels.slice(0,10).reverse();


        // Assign value to trace for our bar chart.
        let trace = {
            x: xvalues,
            y: yvalues,
            text: chartlabels,
            type: "bar",
            orientation: "h"
        };

        // Create the list
        let data = [trace];

        // Set the bar chart layout
        let layout = {
            title: "Top 10 OTUs"
        };

        //Plot the bar chart.
        Plotly.newPlot("bar", data, layout);

      });

};

// Create function to plot the bubble chart.
function createBubbleChart(sample_id) {

    // Using D3 library to get json data from the URL.
    d3.json(samples_url).then((sampleData) => {

        // Filter the sample data based on the sample id.
        let filteredValue = sampleData.samples.filter(result => result.id == sample_id);

        // Assign first sample index to a variable.
        let init_DataValue = filteredValue[0];

        // Get the value for otu_ids, otu_labels and sample_values.
        let otu_ids = init_DataValue.otu_ids;
        let otu_labels = init_DataValue.otu_labels;
        let sample_values = init_DataValue.sample_values;

        // Assign value to trace for our bubble chart.
        let trace = {
            x: otu_ids,
            y: sample_values,
            text: otu_labels,
            mode: "markers",
            marker: {
                size: sample_values,
                color: otu_ids,
                colorscale: "Earth"
            }
        };

        // Create the list
        let data = [trace]; 

        // Set the bubble chart layout
        let layout = {
            title: "Bacteria Per Sample Test",
            hovermode: "closest",
            xaxis: {title: "OTU ID"},
        };

        //Plot the bubble chart.
        Plotly.newPlot("bubble", data, layout)
    });
};

// Create function to display the metadata.
function displayMetadata(sample_id) {

    // Using D3 library to get json data from the URL.
    d3.json(samples_url).then((sampleData) => {

        // Filter the sample data based on the sample id.
        let filteredValue = sampleData.metadata.filter(result => result.id == sample_id);

        // Assign first sample index to a variable.
        let init_DataValue = filteredValue[0];

        // Using D3 library to select the sample metadata box and clear any value if any.
        d3.select("#sample-metadata").html("");

        // Loop though the filtered sample data and assign key to the value.
        Object.entries(init_DataValue).forEach(([key,value]) => {

            // Using D3 library to select the sample metadata box and dispaly value based on selected sample id.
            d3.select("#sample-metadata").append("h6").text(`${key}: ${value}`);
        
        });

    });

};

// Create function when the dropdown menu changed.
function optionChanged(sample_id) { 

    //Run all functions for the charts and metadata.
    createBarChart(sample_id);
    createBubbleChart(sample_id);
    displayMetadata(sample_id);

};

// Call the initialize function.
init();