const url = "../samples.json";

// Default function to be shown
function buildAllcharts (id) {

    // Call data
    d3.json(url).then((raw) => {
        // Sample values
        console.log(raw)

        data = raw.samples.filter(d => d.id === id)
        demoData = raw.metadata.filter(d => d.id == id)
        console.log(demoData)

        // Slice 10 sampleValues for bar chart
        var sampleValues = data.map(x => x.sample_values.slice(0,10))[0];
    
        // Slice 10 otuIds for bar chart
        var otuIds = data.map(x=>x.otu_ids.slice(0,10))[0];

        // Slice 10 otuLabels for plots
        var otuLabels = data.map(x=>x.otu_labels.slice(0,10))[0];

        
        var ylabels = []

        // Convert OTU IDs to string
        for (let i =0; i < otuIds.length; i++) {
            otuString = otuIds[i].toString()
            ylabels.push(`OTU ${otuString}`)
        }

        // Sample values for bubble chart
        var sampleValues1 = data.map(x => x.sample_values)[0];
    
        // otuIds for bubble chart
        var otuIds1 = data.map(x=>x.otu_ids)[0];

        // otuLabels for bubble chart
        var otuLabels1 = data.map(x=>x.otu_labels)[0]


        var washFreq = demoData.map(x=>x.wfreq)[0]


        buildBarChart(sampleValues, ylabels, otuLabels)
        buildBubbleCharts(otuIds1, sampleValues1, sampleValues1, otuIds1, otuLabels1)
        demoInfo(demoData)
        gaugeChart(washFreq)
        
    })
};

// Event listener updates dashboard based on user selection
function optionChanged (id) {
    buildAllcharts(id);

};

// Function for drop down menu
function init(){
     var html = ""
     d3.json(url).then(function(d){
        d.names.map(function(each){
            html += "<option value = "+each+" > "+each+"</option>"
        })
        //  console.log(html);
         document.getElementById("selDataset").innerHTML = html;
         optionChanged(d.names[0]);
     });
    }

// Function for bar chart
function buildBarChart (xvalues, yvalues, textvalues) {
    var trace = {
        x: xvalues,
        y: yvalues,
        type: "bar",
        orientation: "h",
        text: textvalues
    };
    var layout = {
        xaxis: {tick0: 0, dtick: 50},
        yaxis: {autorange: "reversed"}
        
    }

    data = [trace]
    Plotly.newPlot("bar", data, layout)
};

// Function for bubble chart
function buildBubbleCharts (xvalues, yvalues, markerSize, markerColors, textValues) {
    var trace = {
        x: xvalues,
        y: yvalues,
        mode: "markers",
        marker: {
            size: markerSize,
            color: markerColors,
        },
        text: textValues,
    };

    var data = [trace]

    var layout = {
        xaxis: {
            title: "OTU ID"
        },
        showlegend: false,
        height: 500,
        width: 1200
    }
    Plotly.newPlot("bubble", data, layout)
};

// Function for demographic info / metadata
function demoInfo (filteredData) {
    var div = d3.select("#sample-metadata").html("")
    filteredData.forEach(d => {
        Object.entries(d).forEach(([k,v]) => {
            var row = div.append("div")
            row.text(`${k}: ${v}`)
            console.log(k, v)
        })
    })

};

// Function for Gauge Chart
function gaugeChart (value) {
    var data = [
        {
        type: "indicator",
        mode: "gauge+number",
        value: value,
        title: { text: "Scrubs Per Week", font: { size: 18 } },
        delta: { reference: 400, increasing: { color: "RebeccaPurple" } },
        gauge: {
            axis: { range: [null, 10]},
            bar: { color: "darkred" },
            bgcolor: "white",
            borderwidth: 2,
            bordercolor: "gray",
            steps: [
            { range: [0, 1], color: "#FBFBEF" },
            { range: [1, 2], color: "#F9F9E3" },
            { range: [2, 3], color: "#F1FDCC" },
            { range: [3, 4], color: "#DDF5C8" },
            { range: [4, 5], color: "#CAF998" },
            { range: [5, 6], color: "#9CDF55" },
            { range: [6, 7], color: "#7FC436" },
            { range: [7, 8], color: "#63AF4F" },
            { range: [8, 9], color: "#3B9622" },
            { range: [9, 10], color: "darkgreen" },
        
            ],
        }
        }
    ];
    
    var layout = {
        width: 450,
        height: 200,
        margin: { t: 40, r: 25, l: 25, b: 25 },
    };
    
    Plotly.newPlot('gauge', data, layout);
};

    
// Initialize
init();

