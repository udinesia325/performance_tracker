import { PieChart, Pie, Sector, Cell, ResponsiveContainer, Tooltip } from 'recharts'

function PairPercentage({ data }) {
    // Hitung frekuensi kemunculan setiap symbol
    const countMap = data.reduce((acc, item) => {
        acc[item.symbol] = (acc[item.symbol] || 0) + 1
        return acc
    }, {})

    // Konversi jadi array seperti format yang diminta
    const result = Object.entries(countMap).map(([key, value]) => ({
        name: key,
        value: value,
    }))
    
    const totalAll = result.reduce((acc, curr) => acc += curr.value,0)

    
    const COLORS = [
        '#4DA8DA', '#80D8C3', '#3A59D1', '#FFD63A' , '#8F87F1', '#3F7D58', '#FE4F2D'
    ];


    const renderCustomizedLabel = ({ name, value, cx, cy, percent, midAngle, outerRadius, fill }) => {
        const RADIAN = Math.PI / 180;
        const offset = 50; // nilai offset untuk menjauhkan label dari chart
        const radius = outerRadius + offset;
        const x = cx + radius * Math.cos(-midAngle * RADIAN);
        const y = cy + radius * Math.sin(-midAngle * RADIAN);
        // console.log(rest);
        
        const resultName = name.replace(/[^A-Z]/g, '')
        return (
            <text
                x={x}
                y={y}
                textAnchor="middle"
                dominantBaseline="central"
                fontSize={10}
                fill={fill}
            >
                {`${resultName} ${(percent * 100).toFixed(0)}%`}
            </text>
        )
    }

    return (
        <div className="w-[400px] h-auto bg-white/45 border border-gray-200 rounded-lg shadow-sm flex align-center justify-center gap-10">
            <ResponsiveContainer width="100%" height="100%">
                <PieChart width={400} height={400}>
                    <Pie
                        dataKey="value"
                        isAnimationActive={false}
                        data={result}
                        cx="50%"
                        cy="50%"
                        outerRadius={100}
                        fill="#8884d8"
                        label={renderCustomizedLabel}
                    >
                        {result.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                    <Tooltip 
                        formatter={(value, name) => {
                            const percent = Math.round(((value / totalAll) * 100).toFixed(2));
                            return [`${percent}%`, name]; // akan jadi: name - percent%
                        }}
                    />
                </PieChart>
            </ResponsiveContainer>
        </div>
    )
}

export default PairPercentage
