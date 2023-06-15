import axios from 'axios'
import { FunctionComponent, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { SERVER_URL, GET_REQUEST } from 'src/config/api'
import { Chart, Doughnut } from 'src/components/Charts'
import randomColor from 'randomcolor'
import { Country } from 'src/types/Country'

/*
 * Number of films by country
 * GET localhost:5000/movies/countries
 */

const ChartTwo: FunctionComponent = () => {
    const { t } = useTranslation()

    const [chartLabels, setChartLabels] = useState<{ id: number; label: string }[]>([])
    const [dataChart, setDataChart] = useState([])
    useEffect(() => {
        axios.get(`${SERVER_URL}/movies/countries`, GET_REQUEST).then(res => {
            setChartLabels(res.data.data.map((item: Country) => ({ label: item.country })))
            setDataChart(res.data.data.map((item: Country) => item.count))
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
                data: dataChart,
                backgroundColor: randomColor({ hue: 'green', count: chartLabels.length }),
            },
        ],
    }
    const options = {
        plugins: {
            legend: {
                display: false,
            },
        },
    }

    return <Doughnut data={data} options={options} title={'Number of films by country'} />
}
export default ChartTwo
