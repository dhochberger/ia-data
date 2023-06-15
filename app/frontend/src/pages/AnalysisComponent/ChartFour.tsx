import axios from 'axios'
import randomColor from 'randomcolor'
import { FunctionComponent, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Bar } from 'src/components/Charts'
import { GET_REQUEST, SERVER_URL } from 'src/config/api'
import { Years } from 'src/types/Years'

/*
 * ChartFour : Number of films by years
 * GET localhost:5000/movies/years
 */

const ChartFour: FunctionComponent = () => {
    const { t } = useTranslation()

    const [chartLabels, setChartLabels] = useState<{ id: number; label: string }[]>([])
    const [dataChart, setDataChart] = useState([])
    const [totalCount, setTotalCount] = useState(0)
    useEffect(() => {
        axios.get(`${SERVER_URL}/movies/years`, GET_REQUEST).then(res => {
            setChartLabels(res.data.data.map((item: Years) => ({ label: item.year })))
            const totalMoviesCount = res.data.data.reduce(
                (previousValue: number, currentValue: Years) => (previousValue += currentValue.count),
                0
            )
            setTotalCount(totalMoviesCount)
            setDataChart(res.data.data.map((item: Years) => item.count))
        })
    }, [])

    const [labels, setLabels] = useState<string[]>([])
    useEffect(() => {
        setLabels(chartLabels.map(item => item.label))
    }, [chartLabels])

    const data = {
        labels: labels,
        datasets: [
            {
                data: dataChart.map(item => (item * 100) / totalCount),
                backgroundColor: randomColor({ hue: 'red', count: chartLabels.length }),
            },
        ],
    }

    const options = {
        plugins: {
            legend: {
                display: false,
            },
            tooltip: {
                callbacks: {
                    label: function (context: { dataset: { label: string }; parsed: { x: number; y: number } }) {
                        return `${context.parsed.y.toFixed(2)}% : ${Math.round((context.parsed.y * totalCount) / 100)}`
                    },
                },
            },
        },
    }

    return <Bar data={data} options={options} title={'Number of films by year'} />
}
export default ChartFour
