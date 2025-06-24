import moment from 'moment/min/moment-with-locales'
import 'moment/locale/id'

moment.locale('id')


const groupByWeekInMonth = (data, startDate, endDate, isCent) => {
    const grouped = {}

    data.forEach((item) => {
        const date = moment(item.closing_time_utc)
        const initital_profit = Object.entries(item).find(([key]) => key.includes('profit_us'))?.[1];
        const commision = Object.entries(item).find(([key]) => key.includes('commission_us'))?.[1];
        const swap = Object.entries(item).find(([key]) => key.includes('swap_us'))?.[1];
        let profit = (parseInt(initital_profit) - (parseInt(commision) + parseInt(swap)))

        if(isCent) {
            profit /= 100
        }
        

        if (
            !date.isBetween(moment(startDate), moment(endDate), undefined, '[]')
        ) {
            return
        }

        const weekOfMonth = Math.ceil(date.date() / 7) // 1-5
        const monthName = date.format('MMMM')
        
        const year = date.format('YYYY')
        const label = `Mgg ${weekOfMonth} ${monthName} ${year}`

        if (!grouped[label]) {
            grouped[label] = 0
        }

        grouped[label] += profit
    })

    // Ubah hasil ke dalam bentuk array
    let result = Object.entries(grouped).map(([name, profit]) => ({
        name,
        profit: profit,
    }))

    // Urutkan berdasarkan waktu
    result.sort((a, b) => {
        const extract = (label) => {
            const [, week, month, year] = label.match(/Mgg (\d+) (\w+) (\d{4})/)
            const m = moment(`${month} ${year}`, 'MMMM YYYY')
            return m
                .startOf('month')
                .add((+week - 1) * 7, 'days')
                .valueOf()
        }
        return extract(a.name) - extract(b.name)
    })

    // Hitung total sebagai akumulasi dari minggu ke minggu
    let runningTotal = 0
    result = result.map((item) => {
        item.profit = item.profit.toFixed(2)
        runningTotal += parseInt(item.profit)
        return {
            ...item,
            total: runningTotal,
        }
    })

    return result
}

export { groupByWeekInMonth }
