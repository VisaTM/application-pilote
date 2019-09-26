const barChartOptions = (dataList, listTitle, selectedCluster, selectedTermId = null) => {

    return {
        title: {
            text: listTitle,
            subtext: `Cluster '${selectedCluster ? selectedCluster["Name"] : ''}'`
        },
        animation: false,
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            }
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: {
            type: 'value'
        },
        yAxis: {
            type: 'category',
            data: dataList.map(t => t.label),
        },
        dataZoom: [
            {
                show: true,
                yAxisIndex: 0,
                start: 100 - (15 * 100 / dataList.length), // Display the first 15 elements
                end: 100
            }
        ],
        series: [
            {
                name: 'Total',
                type: 'bar',
                data: dataList.map(t => t["Frequency"].total),
                itemStyle: {
                    color: "#2f4554"

                }
            },
            {
                name: 'Frequency',
                type: 'bar',
                barGap: "-100%",
                data: dataList.map(t => t["Frequency"].current),
                itemStyle: {
                    color: function (param) {
                        if (selectedTermId && param.dataIndex === selectedTermId) {
                            return "#1F77B4"
                        } else {
                            return "#c23531"
                        }
                }
                }
            }
        ]
    };
}

export default barChartOptions;
