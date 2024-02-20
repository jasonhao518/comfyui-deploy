'use client'
import AreaChartPlot from "./AreaChartPlot";
import BarChartPlot from "./BarChartPlot";
import PieChartPlot from "./PieChartPlot";
import LineChartPlot from "./LineChartPlot";
import RadarChartPlot from "./RadarChartPlot";

const Charts = ({quota,data}) => {
  const percentageLeft = (credit,plan) =>{
    let total = 1000;
    if(plan === "basic") {
      total = 9000
    }else if(plan === "pro") {
      total = 19000
    }
    return (credit*100/total).toFixed(2)
  }

  const rateLeft = (rate,plan) =>{
    let total = 100;
    if(plan === "basic") {
      total = 1000
    }else if(plan === "pro") {
      total = 30000
    }
    return (rate*100/total).toFixed(2)
  }

  let result = []
  if(data) {
      result = data.map((item)=>{
      return {"id": item._id.month +"."+ item._id.day, "cost": Math.round(item.totalCost*10)/10000 }
    })
  }
  return (
    <>
      <section>
        <div className="m-4 flex gap-2">
          <div className="h-300px w-16 flex-1 justify-center rounded bg-gray-700 px-2 shadow">
            <div className="">
              <p className="font-bold text-gray-900">Credit</p>
              <p className="py-4 font-bold">${(quota.credit/1000).toFixed(3)} </p>
              <p className="text-green-300">{percentageLeft(quota.credit,quota.plan)}%</p>
            </div>
          </div>
          <div className="max-h-300px w-16 flex-1 justify-center rounded bg-gray-700 px-2 shadow">
            <div className="">
              <p className="font-bold text-gray-900">Rate Limit</p>
              <p className="py-4 font-bold">{quota.rate} </p>
              <p className="text-green-300">{rateLeft(quota.rate,quota.plan)}%</p>
            </div>
          </div>

        </div>
      </section>

      <section className="my-4 flex gap-3 px-4">
        <BarChartPlot data={result}/>
      </section>


    </>
  );
};

export default Charts;
