import { useState } from "react";
import FileUpload from "./components/FileUpload";
import Header from "./components/Header";
import dummyData from "./dummy_data.json";
import PairPercentage from "./components/PairPercentage";
import StatisticHeader from "./components/StatisticHeader";
import LongShortPair from "./components/LongShortPair";
import BalanceChart from "./components/BalanceChart";
import "react-datepicker/dist/react-datepicker.css";
import Datatable from "./components/Datatable";

function App() {
  const [isCent, setIsCent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState(dummyData);

  const resetState = () => {
    setIsCent(false);
    setIsLoading(false);
    setData([]);
  };

  return (
    <div className="min-h-screen min-w-screen ">
      {data.length == 0 && isLoading == false ? (
        <FileUpload
          data={data}
          setData={setData}
          isLoading={isLoading}
          setIsLoading={setIsLoading}
        />
      ) : null}

      {data.length > 0 && isLoading == false ? (
        <Header resetState={resetState} isCent={isCent} setIscent={setIsCent} />
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
          </div>
        </>
      ) : null}
    </div>
  );
}

export default App;
