import { useState } from 'react'
import FileUpload from './components/FileUpload'
import Header from './components/Header'
import PairPercentage from './components/PairPercentage'
import StatisticHeader from './components/StatisticHeader'
import LongShortPair from './components/LongShortPair'
import BalanceChart from './components/BalanceChart'
import 'react-datepicker/dist/react-datepicker.css'
import Datatable from './components/Datatable'

function App() {
    const [isCent, setIsCent] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [data, setData] = useState([])

    const resetState = () => {
        setIsCent(false)
        setIsLoading(false)
        setData([])
    }

    return (
        <div className="h-screen w-screen overflow-x-hidden">
            {data.length == 0 && isLoading == false ? (
                <FileUpload
                    data={data}
                    setData={setData}
                    isLoading={isLoading}
                    setIsLoading={setIsLoading}
                />
            ) : null}

            {isLoading ? (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 200 200"
                    className="w-[100px] mx-auto absolute top-1/2 left-1/2  -translate-y-1/2 -translate-x-1/2"
                >
                    <circle
                        fill="#C25FFF"
                        stroke="#C25FFF"
                        stroke-width="15"
                        r="15"
                        cx="40"
                        cy="100"
                    >
                        <animate
                            attributeName="opacity"
                            calcMode="spline"
                            dur="2"
                            values="1;0;1;"
                            keySplines=".5 0 .5 1;.5 0 .5 1"
                            repeatCount="indefinite"
                            begin="-.4"
                        ></animate>
                    </circle>
                    <circle
                        fill="#C25FFF"
                        stroke="#C25FFF"
                        stroke-width="15"
                        r="15"
                        cx="100"
                        cy="100"
                    >
                        <animate
                            attributeName="opacity"
                            calcMode="spline"
                            dur="2"
                            values="1;0;1;"
                            keySplines=".5 0 .5 1;.5 0 .5 1"
                            repeatCount="indefinite"
                            begin="-.2"
                        ></animate>
                    </circle>
                    <circle
                        fill="#C25FFF"
                        stroke="#C25FFF"
                        stroke-width="15"
                        r="15"
                        cx="160"
                        cy="100"
                    >
                        <animate
                            attributeName="opacity"
                            calcMode="spline"
                            dur="2"
                            values="1;0;1;"
                            keySplines=".5 0 .5 1;.5 0 .5 1"
                            repeatCount="indefinite"
                            begin="0"
                        ></animate>
                    </circle>
                </svg>
            ) : null}

            {data.length > 0 && isLoading == false ? (
                <Header
                    resetState={resetState}
                    isCent={isCent}
                    setIscent={setIsCent}
                />
            ) : null}

            {data.length > 0 && isLoading == false ? (
                <>
                    <div className="container mx-auto mt-5 flex flex-col items-start justify-stretch gap-12">
                        <StatisticHeader data={data} isCent={isCent} />
                        <div className="w-full flex flex-wrap gap-10">
                            <PairPercentage data={data} />
                            <LongShortPair data={data} />
                        </div>
                        <div className="w-full">
                            <BalanceChart data={data} isCent={isCent} />
                        </div>
                        <div className="w-full">
                            <Datatable data={data} isCent={isCent} />
                        </div>
                        <div className='w-full'>
                            <p className="text-center">
                                Build With ❤️ by <b>Dinn</b>{' '}
                                <a
                                    href="https://github.com/udinesia325/performance_tracker"
                                    target="_blank"
                                    className="text-blue-400 underline"
                                >
                                    View Source Code Here
                                </a>
                            </p>
                            <p className="text-center text-sm">
                                <sup>©</sup> Copyright {new Date().getFullYear()}
                            </p>
                        </div>
                    </div>
                </>
            ) : null}
        </div>
    )
}

export default App
