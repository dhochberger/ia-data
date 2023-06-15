import axios from 'axios'
import { FunctionComponent, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { SERVER_URL, GET_REQUEST } from 'src/config/api'

import randomColor from 'randomcolor'
import { Language } from 'src/types/Language'
import { Doughnut } from 'src/components/Charts'

/*
 * Number of films by languages
 * GET localhost:5000/movies/languages
 */

const ChartThree: FunctionComponent = () => {
    const { t } = useTranslation()

    const [chartLabels, setChartLabels] = useState<{ id: number; label: string }[]>([])
    const [dataChart, setDataChart] = useState([])
    useEffect(() => {
        axios.get(`${SERVER_URL}/movies/languages`, GET_REQUEST).then(res => {
            setChartLabels(res.data.data.map((item: Language) => ({ label: item.language })))
            setDataChart(res.data.data.map((item: Language) => item.count))
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
                backgroundColor: randomColor({ hue: 'pink', count: chartLabels.length }),
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

    return <Doughnut data={data} options={options} title={'Number of films by language'} />
}
export default ChartThree
