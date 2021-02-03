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

        // Slice 10 sampleValues for plots
        var sampleValues = data.map(x => x.sample_values.slice(0,10))[0];
    
        // Slice 10 otuIds for plots
        var otuIds = data.map(x=>x.otu_ids.slice(0,10))[0];

        // Slice 10 otuLabels for plots
        var otuLabels = data.map(x=>x.otu_labels.slice(0,10))[0];

        
        var ylabels = []

        // Convert OTU IDs to string
        for (let i =0; i < otuIds.length; i++) {
            otuString = otuIds[i].toString()
            ylabels.push(`OTU ${otuString}`)
        }

        buildBarCharts(sampleValues, ylabels, otuLabels)
        demoInfo(demoData)
        
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

// Function for bar charts
function buildBarCharts (xvalues, yvalues, textvalues) {
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

    


// Initialize
init();

