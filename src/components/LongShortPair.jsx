import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from 'recharts'

function LongShortPair({ data }) {
    let result = data.reduce((acc, curr) => {
        if (acc.hasOwnProperty(curr.symbol) == false) {
            acc[curr.symbol] = {
                name: curr.symbol.replace(/[^A-Z]/g, ''),
                long: 0,
                short: 0,
                amt: 0,
            }
        }
        if (curr.type == 'buy') {
            acc[curr.symbol].long += 1
        }
        if (curr.type == 'sell') {
            acc[curr.symbol].short += 1
        }
        acc[curr.symbol].amt += 1
        return acc
    }, {})

    result = Object.values(result)
    
    let dynamicHeight = (result.length * 30) + 50
    
    return (
        <div style={{ minHeight: '500px', height: dynamicHeight + 'px' }} className="flex-1 min-w-[450px] w-full bg-white/45 border border-gray-200 rounded-lg shadow-sm flex align-center justify-center gap-10">
            <ResponsiveContainer width="100%" height="100%">
                <BarChart
                    width={500}
                    height={300}
                    data={result}
                    margin={{
                        top: 20,
                        right: 30,
                        left: 20,
                        bottom: 5,
                    }}
                    layout="vertical"
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" />
                    <YAxis type="category" dataKey="name" fontSize={10} />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="long" stackId="a" fill="#1DCD9F" label={{ fill: 'white', fontSize: 12 }} />
                    <Bar dataKey="short" stackId="a" fill="#FF3F33" label={{ fill: 'white', fontSize: 12 }} />
                </BarChart>
            </ResponsiveContainer>
        </div>
    )
}

export default LongShortPair
