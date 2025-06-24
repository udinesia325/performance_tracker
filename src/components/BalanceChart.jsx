import { id } from 'date-fns/locale/id'
import moment from 'moment'
import 'moment/locale/id' // pastikan ada jika ingin Bahasa Indonesia
import { useState } from 'react'
import DatePicker from 'react-datepicker'
import {
    Brush,
    CartesianGrid,
    Legend,
    Line,
    LineChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from 'recharts'
import { groupByWeekInMonth } from '../utils'

moment.locale('id')

const BalanceChart = function ({ data, isCent }) {
    const [startDate, setStartDate] = useState(
        moment().startOf('month').toDate()
    )
    const [endDate, setEndDate] = useState(moment().endOf('month').toDate())

    const handleChange = ([newStartDate, newEndDate]) => {
        setStartDate(newStartDate)
        setEndDate(newEndDate)
    }

    const setBulanIni = () => {
        const start = moment().startOf('month').toDate()
        const end = moment().endOf('month').toDate()
        setStartDate(start)
        setEndDate(end)
    }

    const setBulanLalu = () => {
        const start = moment().subtract(1, 'month').startOf('month').toDate()
        const end = moment().subtract(1, 'month').endOf('month').toDate()
        setStartDate(start)
        setEndDate(end)
    }

    const setTigaBulanLalu = () => {
        const start = moment().subtract(3, 'months').startOf('month').toDate()
        const end = moment().subtract(1, 'month').endOf('month').toDate()
        setStartDate(start)
        setEndDate(end)
    }

    const result = groupByWeekInMonth(data, startDate, endDate, isCent)
    
    return (
        <div className="w-full py-10 h-auto min-h-[450px] max-h-[500px] bg-white/50 border border-gray-200 rounded-lg shadow-sm align-center justify-center gap-10">
            <div className="px-10 flex flex-wrap gap-4">
                <DatePicker
                    showIcon
                    onChange={handleChange}
                    selectsRange
                    startDate={startDate}
                    endDate={endDate}
                    dateFormat="MM/yyyy"
                    showMonthYearPicker
                    locale={id}
                    isClearable
                    placeholderText="Klik untuk pilih tanggal"
                    className="w-full md:w-72 px-4 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-300 text-gray-700 placeholder-gray-400 text-sm transition"
                    calendarClassName="!bg-white !rounded-xl !shadow-xl !border !border-gray-200 p-4"
                    dayClassName={(date) =>
                        'w-10 h-10 flex items-center justify-center rounded-full transition text-sm ' +
                        (startDate &&
                        endDate &&
                        date >= startDate &&
                        date <= endDate
                            ? 'bg-blue-500 text-white'
                            : 'text-gray-700 hover:bg-blue-100 hover:text-blue-600')
                    }
                    monthClassName={() => 'text-gray-800 font-semibold mb-2'}
                    wrapperClassName="w-full md:w-72"
                />
                <button
                    onClick={setBulanIni}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
                >
                    Bulan Ini
                </button>
                <button
                    onClick={setBulanLalu}
                    className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
                >
                    Bulan Lalu
                </button>
                <button
                    onClick={setTigaBulanLalu}
                    className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded"
                >
                    3 Bulan Lalu
                </button>
            </div>
            <ResponsiveContainer
                width="95%"
                height={300}
                className="mt-10 mx-auto"
            >
                <LineChart
                    width={500}
                    height={200}
                    data={result}
                    syncId="anyId"
                    margin={{
                        top: 10,
                        right: 30,
                        left: 0,
                        bottom: 0,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis
                        dataKey="name"
                        fontFamily='"Manrope", sans-serif'
                        fontSize={12}
                    />
                    <YAxis />
                    <Tooltip />
                    <Line
                        type="monotone"
                        dataKey="profit"
                        stroke="#4E71FF"
                        fill="#5409DA"
                    />
                    <Line
                        type="monotone"
                        dataKey="total"
                        stroke="#FF9B17"
                        fill="#FCB454"
                    />
                    <Legend />
                    <Brush />
                </LineChart>
            </ResponsiveContainer>
        </div>
    )
}

export default BalanceChart
