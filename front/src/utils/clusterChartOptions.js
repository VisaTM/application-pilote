const clusterChartOptions = (clusterData, linksData, selectedCluster, selectedRange) => {
  let somme = 0;
  Object.keys(clusterData).forEach(c => {
      somme += clusterData[c]["Inertia"]
    });
    const formattedData = clusterData.map(c => {
      console.log(somme + " inertia " + c["Inertia"]);
        return {
            name: c["Name"],
            x: c["Coordinates"].x,
            y: c["Coordinates"].y,
            symbolSize: c["Inertia"]/somme *100,
            itemStyle: {
                color: (selectedCluster && c["Id"] === selectedCluster["Id"]) ? '#1F77B4' : '#D62728'
            },
            label: {
                color: '#000',
                show: true,
                formatter: c["Name"],
                position: 'inside'
            },
            id: c["Id"]
        }
    });

    const formattedLinks = linksData.filter(l => l.strength < selectedRange).map(l => {
        return {
            source: clusterData.findIndex(c => c["Id"] === l.source),
            target: clusterData.findIndex(c => c["Id"] === l.target),
            label: {
                emphasis: {
                    show: true,
                    formatter: `Strength : ${l.strength}`,
                    color: '#000'
                }
            },
            lineStyle: {
                normal: {
                    width: l.strength * 20
                }
            }
        }
    })


    return {
        title: {
            text: 'Kmeans'
        },
        animation: false,
        xAxis: {
            splitLine: {
                lineStyle: {
                    type: 'dashed'
                }
            }
        },
        yAxis: {
            splitLine: {
                lineStyle: {
                    type: 'dashed'
                }
            }
        },
        series: [{
            name: 'Clusters',
            type: 'graph',
            layout: 'none',
            coordinateSystem: 'cartesian2d',
            nodes: formattedData.map(d => [d.x, d.y, d.symbolSize, d.id, d.name, d.itemStyle.color]),
            links: formattedLinks,            
            symbolSize: function (data) {
                return data[2];
            },            
            label: {
                color: '#000',
                show: true,
                formatter: function (param) {
                    return param.data[4];
                },
                position: 'inside'
            },            
            itemStyle: {
                color: function (param) {
                    return param.data[5]
                },
                opacity: 0.7
 
            },
            roam: true,
            focusNodeAdjacency: true,
            emphasis: {
                lineStyle: {
                    width: 10
                }
            }
        }]
    };
}

export default clusterChartOptions;
