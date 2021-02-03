const url = "../samples.json";

// Default function to be shown
function barChart () {

    // Call data
    d3.json(url).then((data) => {
        // Sample values
        console.log(data)
        var sampleValues = data.samples.map(x => x.sample_values.slice(0,10));
        // Test array
        var sampleValues1 = sampleValues[0]
        console.log(sampleValues1.slice(0,10))
        console.log(sampleValues1)


        var otuIds = data.samples.map(x=>x.otu_ids.slice(0,10));
        // Test array
        var otuIds1 = otuIds[0]

        var otuLabels = data.samples.map(x=>x.otu_labels.slice(0,10));
        // Test array
        var otuLabels1 = otuLabels[0]
        var ylabels = []
        // Convert OTU IDs to string
        for (let i =0; i < otuIds1.length; i++) {
            otuString = otuIds1[i].toString()
            ylabels.push(`OTU ${otuString}`)
        }
        
        var trace = {
            x: sampleValues1.slice(0,10),
            y: ylabels,
            type: "bar",
            orientation: "h",
            text: otuLabels1
        };

        var layout = {
            xaxis: {tick0: 0, dtick: 50},
            yaxis: {autorange: "reversed"}
            
        }

        data = [trace]
        Plotly.newPlot("bar", data, layout)
        
    });
}


// Already in index.html
function optionChanged (id) {
    filtered = data.filter(d => d.id ===id);
    buildCharts(filtered);

}

// Function to build charts, passed through in barChart function
function buildCharts () {

    var trace = {
        x: sampleValues1,
        y: ylabels,
        type: "bar",
        orientation: "h",
        text: otuLabels1
    };

    var layout = {
        xaxis: {tick0: 0, dtick: 50},
        yaxis: {autorange: "reversed"}
        
    }

    data = [trace]
    Plotly.newPlot("bar", data, layout)


};


barChart()
// Function to change plots based on dropdown

