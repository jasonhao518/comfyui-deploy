import {
  BarChart,
  XAxis,
  YAxis,
  Bar,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const BarChartPlot = ({data}) => {
  return (
    <>
        <BarChart width={730} height={250} data={data}>
          <XAxis dataKey="id" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="cost" fill="#82ca9d" />
        </BarChart>
    </>
  );
};

export default BarChartPlot;
