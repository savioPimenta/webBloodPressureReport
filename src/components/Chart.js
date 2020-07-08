import React, { useEffect, useState, useContext } from 'react';
import Select from 'react-select'
import CanvasJSReact from '../assets/canvasjs/canvasjs.react'

import InfoContext from '../providers/InfoProvider'

import './Chart.css'

var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;


function Chart() {
    const [dateArray, setDateArray] = useState([])
    const [data, setData] = useState([])
    const [data2, setData2] = useState([])
    const [optionsSelect, setOpts] = useState([])
    const [dateSelected, setDate] = useState()
    const [data3, setData3] = useState([])
    const [data3line, setData3line] = useState([])
    const [data4, setData4] = useState([])
    const [data4line, setData4line] = useState([])
    const [data5line, setData5line] = useState([])
    const [data6, setData6] = useState([])
    const [data7, setData7] = useState([])
    const { dados } = useContext(InfoContext);

    useEffect(() => {
        const recebido = dados.user ? dados.user.valor : []
        const dias = []

        recebido.map(item => {
            let dataAtual = dateConverter(item.date)

            if (dias.length > 0) {
                let hasDate = false;
                dias.forEach(item2 => {
                    if (dateConverter(item2[0].date) === dataAtual) {
                        item2.push(item)
                        hasDate = true;
                    }
                })
                if (hasDate === false)
                    dias.push([item])
            } else {
                dias.push([item])
            }
        })
        setDateArray(dias)
        const optionsSelectLocal = []
        dias.map(date => { optionsSelectLocal.push({ value: dateConverter(date[0].date), label: dateConverter(date[0].date) }); });
        setOpts(optionsSelectLocal)
    }, [dados, dateSelected])
    useEffect(() => {
        const newData = []
        const newData2 = []
        const newData3 = []
        for (var i = 0; i < 96; i++) {
            var min3 = (i * 1440) / 96 // don't forget the second param
            var hours = Math.floor((min3) / 60);

            var nextData = {};
            var indexLabel = '';
            switch (hours) {
                case (7):
                    indexLabel = 'Levantou-se'
                    break;
                case (9):
                    indexLabel = 'Medicação manual'
                    break;
                case (12):
                    indexLabel = 'Almoçou'
                    break;
                case (18):
                    indexLabel = 'Lanchou'
                    break;
                case (21):
                    indexLabel = 'Jantou'
                    break;
                case (23):
                    indexLabel = 'Dormiu'
                    break;
                default:
                    indexLabel = ''
                    break;

            }

            if (hours >= 22 || hours < 6) {
                nextData = { x: hours, y: 125, indexLabel: indexLabel };
            } else {
                nextData = { x: hours, y: 135, indexLabel: indexLabel }
            }
            newData.push(nextData)
        }
        for (var i = 0; i < 96; i++) {
            var min3 = ((i * 1440)) / 96 // don't forget the second param
            var hours = Math.floor((min3) / 60);

            var nextData = {};
            var indexLabel = '';

            if (hours >= 22 || hours < 6) {
                nextData = { x: hours, y: 75 };
            } else {
                nextData = { x: hours, y: 85 }
            }
            newData2.push(nextData)
        }
        setData(newData.flat(1))
        setData2(newData2.flat(1))
        setData3(newData3.flat(1))

    }, [optionsSelect])
    useEffect(() => {
        var dataContext = []
        dateArray.map(data => {
            if (data.length > 0) {
                let atualDate = dateConverter(data[0].date)
                if (atualDate === dateSelected) {
                    dataContext = data
                }
            }
        })
        //Pa Max
        var finalData = []
        var finalDataLine = []

        //Pa Min
        var finalData2 = []
        var finalData2Line = []

        //Pa Min
        var finalData5Line = []

        //RNI
        var newData6 = []

        //Glicemia
        var newData7 = []

        dataContext.map((data, i) => {
            let atualTime = timeConverter(data.date)
            let maxTimeParam = 135
            let minTimeParam = 85
            if (((atualTime * 24) / 1440) < 6 || ((atualTime * 24) / 1440) >= 22) {
                maxTimeParam = 125
                minTimeParam = 75
            }
            var xValue = (atualTime * 24) / 1440
            if (dataContext.length > i + 1) {
                let nextTime = timeConverter(dataContext[i + 1].date)
                xValue = mathSystem(parseInt(data.pMax), (atualTime * 24) / 1440, parseInt(dataContext[i + 1].pMax), (nextTime * 24) / 1440, maxTimeParam)

            }
            if (parseInt(data.pMax) > maxTimeParam)
                finalData.push({ x: (atualTime * 24) / 1440, y: [maxTimeParam, parseInt(data.pMax)] })

            var xValue2 = (atualTime * 24) / 1440
            if (dataContext.length > i + 1) {
                let nextTime = timeConverter(dataContext[i + 1].date)
                xValue2 = mathSystem(parseInt(data.pMin), (atualTime * 24) / 1440, parseInt(dataContext[i + 1].pMin), (nextTime * 24) / 1440, minTimeParam)
            }
            if (parseInt(data.pMin) > minTimeParam)
                finalData2.push({ x: (atualTime * 24) / 1440, y: [minTimeParam, parseInt(data.pMin)] })

            finalDataLine.push({ x: (atualTime * 24) / 1440, y: parseInt(data.pMax) })
            finalData2Line.push({ x: (atualTime * 24) / 1440, y: parseInt(data.pMin) })
            if (data.rni)
                newData6.push({ x: (atualTime * 24) / 1440, y: parseFloat(data.rni) })
            if (data.glicemia)
                newData7.push({ x: (atualTime * 24) / 1440, y: parseInt(data.glicemia) })

            if (finalData.length > 0 && i > 0) {
                if (xValue >= finalData[i - 1].x)
                    finalData.push({ x: xValue, y: [maxTimeParam, maxTimeParam] })//deadline
            } else {
                finalData.push({ x: xValue, y: [maxTimeParam, maxTimeParam] })//deadline
            }

            if (finalData2.length > 0 && i > 0) {
                if (xValue >= finalData2[i - 1].x)
                    finalData2.push({ x: xValue2, y: [minTimeParam, minTimeParam] })//deadline
            } else {
                finalData2.push({ x: xValue2, y: [minTimeParam, minTimeParam] })//deadline
            }

            finalData5Line.push({ x: (atualTime * 24) / 1440, y: parseInt(data.fc) })
        })
        setData3(finalData)
        setData3line(finalDataLine)

        setData4(finalData2)
        setData4line(finalData2Line)

        setData6(newData6)
        setData7(newData7)

        setData5line(finalData5Line)
    }, [optionsSelect])
    function dateConverter(dateTime) {
        let date = dateTime
        let x = new Date(date.seconds * 1000);
        let dd = x.getDate();
        let mm = x.getMonth() + 1;
        let yy = x.getFullYear();
        let finalDate = dd + "/" + mm + "/" + yy;
        return finalDate
    }
    function timeConverter(dateTime) {
        var start = new Date(dateTime.seconds * 1000);
        start.setHours(0, 0, 0, 0);

        var atual = new Date(dateTime.seconds * 1000)

        var minutes = Math.ceil(((Math.abs(atual - start) / 1000) / 60) / 15) * 15

        return minutes
    }
    function handleSelect(event) {
        const dateSelected = event.value
        setDate(dateSelected)
    }
    function mathSystem(mmhg1, hrs1, mmhg2, hrs2, eixoX) {
        const a = (mmhg2 - mmhg1) / ((hrs2 - hrs1) === 0 ? 1 : (hrs2 - hrs1))
        const b = mmhg1 - (hrs1 * a)
        var c = (eixoX - b) / (a === 0 ? 1 : a)
        if (c < 0)
            c = c * (-1)
        if (c > 24)
            c = c - 24
        return c
    }
    const options = {
        theme: "light2",
        animationEnabled: true,
        interactivityEnabled: false,
        exportEnabled: true,
        title: {
            text: ""
        },
        axisY: {
            title: "",
            includeZero: false,
        },
        axisX: {
            zoomEnabled: true,
            interval: 2,
        },
        data: [{
            type: "rangeArea",
            markerSize: 0,
            color: "pink",
            lineThickness: 1,
            dataPoints: data3.length > 0 ? data3 : [{ x: 0, y: 0 }]
        }, {
            indexLabelOrientation: "vertical",
            indexLabelPlacement: "outside",
            type: "stepArea",
            color: "white",
            fillOpacity: 0,
            lineThickness: 1,
            lineColor: "black",
            xValueFormatString: "   ",
            markerSize: 0,
            dataPoints: data.length > 0 ? data : [{ x: 0, y: 0 }],
            indexLabelWrap: true
        }, {
            name: "paMax",
            type: "rangeArea",
            markerSize: 0,
            color: "pink",
            lineThickness: 1,
            dataPoints: data4.length > 0 ? data4 : [{ x: 0, y: 0 }]
        }, {
            indexLabelOrientation: "vertical",
            indexLabelPlacement: "outside",
            type: "stepArea",
            color: "white",
            lineColor: "black",
            fillOpacity: 0,
            lineThickness: 1,
            xValueFormatString: "   ",
            markerSize: 0,
            dataPoints: data2.length > 0 ? data2 : [{ x: 0, y: 0 }]
        }, {
            type: "line",
            color: '#d26b7d',
            legendText: "Pa. Máx e Min",
            showInLegend: true,
            dataPoints: data3line.length > 0 ? data3line : [{ x: 0, y: 0 }]
        }, {
            type: "line",
            color: '#d26b7d',
            dataPoints: data4line.length > 0 ? data4line : [{ x: 0, y: 0 }]
        },
        {
            type: "line",
            color: 'yellow',
            legendText: "FC",
            showInLegend: true,
            dataPoints: data5line.length > 0 ? data5line : [{ x: 0, y: 0 }]
        },]
    }
    const options2 = {
        theme: "light2",
        animationEnabled: true,
        interactivityEnabled: true,
        exportEnabled: true,
        title: {
            text: ""
        },
        axisY: {
            title: "",
            includeZero: false,
        },
        axisX: {
            interval: 2,
        },
        data: [{
            type: "line",
            color: '#d26b7d',
            dataPoints: data6.length > 0 ? data6 : [{ x: 0, y: 0 }]
        },
        {
            type: "line",
            color: 'yellow',
            legendText: "FC",
            showInLegend: true,
            dataPoints: data5line.length > 0 ? data5line : [{ x: 0, y: 0 }]
        },]
    }
    const options3 = {
        theme: "light2",
        animationEnabled: true,
        interactivityEnabled: false,
        exportEnabled: true,
        title: {
            text: ""
        },
        axisY: {
            title: "",
            includeZero: false,
        },
        axisX: {
            interval: 2,
        },
        data: [{
            type: "line",
            color: '#d26b7d',
            dataPoints: data7.length > 0 ? data7 : [{ x: 0, y: 0 }]
        },
        {
            type: "line",
            color: 'yellow',
            legendText: "FC",
            showInLegend: true,
            dataPoints: data5line.length > 0 ? data5line : [{ x: 0, y: 0 }]
        },]
    }
    return (
        <div className="chart-wrapper" >
            {/*<button onClick={() => console.log(data3)}></button>*/}
            <div className="header-content-chart">
                <span onClick={() => console.log(data3)}>{dados.user ? dados.user.email : ''}</span>
            </div>
            <Select options={optionsSelect} onChange={handleSelect} className="select-box" />
            <div className="header-content-chart">
                <span>Pressão arterial</span>
            </div>
            <div className="chart-container"><CanvasJSChart options={options} /></div>
            <div className="header-content-chart">
                <span>RNI</span>
            </div>
            <div className="chart-container chart-2"><CanvasJSChart options={options2} /></div>
            <div className="header-content-chart">
                <span>Glicemia</span>
            </div>
            <div className="chart-container chart-2"><CanvasJSChart options={options3} /></div>
        </div>
    );
}

export default Chart;
