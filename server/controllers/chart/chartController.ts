export const graphInformationOfActualData: Controller = async (req, res) => {
    try {
        res.json({
            series: [
                {
                    name: "Pending beyond wbrtps timeline",
                    data: [40000],
                },
                {
                    name: "Approved beoynd wbrtps timeline",
                    data: [76000],
                },
                {
                    name: "Pending within wbrtps timeline",
                    data: [55005],
                },
                {
                    name: "Approved within wbrtps timeline",
                    data: [21450],
                },
                {
                    name: "Total no of Application Received",
                    data: [4100],
                },
            ],
            options: {
                title: {
                    text: "Graph information of actual data",
                    align: "center",
                    offsetX: 110,
                },
                chart: {
                    type: "bar",
                    height: 350,
                },
                plotOptions: {
                    bar: {
                        horizontal: false,
                        columnWidth: "55%",
                        endingShape: "rounded",
                    },
                },
                dataLabels: {
                    enabled: true,
                },
                stroke: {
                    show: true,
                    width: 2,
                    colors: ["transparent"],
                },
                xaxis: {
                    categories: ["0"],
                },
                yaxis: {
                    title: {
                        text: "Service",
                    },
                },
                fill: {
                    opacity: 1,
                },
                tooltip: {
                    y: {
                        formatter: function (val) {
                            return val;
                        },
                    },
                },
            },
        });
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
};

export const graphInformationOfPercentageData: Controller = async (req, res) => {
    try {
        res.json({
            series: [44, 55, 13, 43, 22],
            options: {
                title: {
                    text: "XYZ - Stock Analysis (2009 - 2016)",
                    align: "left",
                    offsetX: 110,
                },
                chart: {
                    width: 380,
                    type: "pie",
                },
                labels: ["Team A", "Team B", "Team C", "Team D", "Team E"],
                responsive: [
                    {
                        breakpoint: 480,
                        options: {
                            chart: {
                                width: 200,
                            },
                            legend: {
                                position: "bottom",
                            },
                        },
                    },
                ],
            },
        });
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
};
