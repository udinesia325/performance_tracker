import { useMemo } from 'react'
import SlotCounter from 'react-slot-counter';

function StatisticHeader({ data, isCent }) {
    // Hitung frekuensi kemunculan setiap symbol
    const countMap = useMemo(() => {
        return data.reduce((acc, item) => {
            acc[item.symbol] = (acc[item.symbol] || 0) + 1
            return acc
        }, {})
    }, data)

    // Konversi jadi array seperti format yang diminta
    const result = useMemo(() => {
        return Object.entries(countMap).map(([key, value]) => ({
            name: key,
            value: value,
        }))
    }, data)

    // Cari item dengan value tertinggi
    const maxItem = useMemo(() => result.reduce((max, item) => (item.value > max.value ? item : max)),data)

    // Buang karakter non-kapital dari nama
    const cleanedName = useMemo(() => maxItem.name.replace(/[^A-Z]/g, ''), data)

    const totalAll = useMemo(() => result.reduce((acc, curr) => (acc += curr.value), 0),data)

    let totalWin = 0;
    let PnL = 0;
    let lotSize = 0;
    let longWin = 0;
    let shortWin = 0;


    data.forEach(d => {
        const profit = Object.entries(d).find(([key]) => key.includes('profit_us'))?.[1];
        const commision = Object.entries(d).find(([key]) => key.includes('commission_us'))?.[1];
        const swap = Object.entries(d).find(([key]) => key.includes('swap_us'))?.[1];
        const grandTotal = parseInt(profit) - (parseInt(commision) + parseInt(swap))

        if(grandTotal > 0) {
            totalWin += 1;
        }
        if(grandTotal > 0 && d.type == 'buy') {
            longWin +=1
        }
        
        if(grandTotal > 0 && d.type == 'sell') {
            shortWin +=1
        }

        PnL += grandTotal 

        lotSize += parseFloat(d.original_position_size)
    })
    
    return (
        <div className="w-full mx-auto  p-5 bg-white/45 border border-gray-200 rounded-lg shadow-sm flex align-center justify-center gap-16">
            <div className="flex flex-col text-center">
                <h1 className="text-2xl font-bold">Trade</h1>
                <span className="text-xl font-semibold"><SlotCounter value={totalAll} /></span>
            </div>
            <div className="flex flex-col text-center">
                <h1 className="text-2xl font-bold">Realized PnL</h1>
                <span className={"text-xl font-semibold " + (PnL > 0 ? 'text-green-500' : 'text-red-500')}>$ <SlotCounter value={isCent ? PnL / 100 : PnL} /></span>
            </div>
            <div className="flex flex-col text-center">
                <h1 className="text-2xl font-bold">Favorite Pair</h1>
                <span className="text-xl font-semibold">{cleanedName}</span>
            </div>
            {/* win rate */}
            <div className="flex flex-col text-center">
                <h1 className="text-2xl font-bold">Win Rate</h1>
                <span className="text-xl font-semibold"><SlotCounter value={Math.round(((totalWin / totalAll) * 100).toFixed(2))} />%</span>
            </div>
            {/* total lot */}
            <div className="flex flex-col text-center">
                <h1 className="text-2xl font-bold">Lot(s)</h1>
                <span className="text-xl font-semibold"><SlotCounter value={(isCent ? lotSize / 100 : lotSize).toFixed(2)} /></span>
            </div>
            <div className="flex flex-col text-center">
                <h1 className="text-2xl font-bold">Long Win Rate</h1>
                <span className="text-xl font-semibold"><SlotCounter value={Math.round(((longWin / totalAll) * 100).toFixed(2))} />%</span>
            </div>
            <div className="flex flex-col text-center">
                <h1 className="text-2xl font-bold">Short Win Rate</h1>
                <span className="text-xl font-semibold"><SlotCounter value={Math.round(((shortWin / totalAll) * 100).toFixed(2))} />%</span>
            </div>
            {/* total pips */}
        </div>
    )
}

export default StatisticHeader
