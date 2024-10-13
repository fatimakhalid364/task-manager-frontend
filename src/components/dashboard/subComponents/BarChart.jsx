import { Bar, BarChart, CartesianGrid, Legend, Tooltip, XAxis, YAxis } from 'recharts';

import { useEffect } from 'react';
import { useDispatch, useSelector, } from 'react-redux';
import { fetchDashboardData } from "src/store/thunks/dashboardThunk.js";



const CustomBarChart = ({
  highNotStartedCount,
  mediumNotStartedCount,
  lowNotStartedCount,
  highPendingCount,
  mediumPendingCount,
  lowPendingCount,
  highProgressingCount,
  mediumProgressingCount,
  lowProgressingCount,
  highCompletedCount,
  mediumCompletedCount,
  lowCompletedCount
}) => {
  // const graphData = useSelector((state) => state.chartsData);
  const data = useSelector((state) => state.chartsData?.graphData?.barGraph?.taskCounts);

  // [
  //   { day: 'Mon', High: 0, Medium: 0, Low: 0 },
  //   { day: 'Tue', High: 0, Medium: 0, Low: 0 },
  //   { day: 'Wed', High: 0, Medium: 0, Low: 0 },
  //   { day: 'Thurs', High: 0, Medium: 0, Low: 0 },
  //   { day: 'Fri', High: 0, Medium: 0, Low: 0 },
  //   { day: 'Sat', High: 0, Medium: 0, Low: 0 },
  //   { day: 'Sun', High: 0, Medium: 0, Low: 0 },
  // ];
  // const { taskCounts, loading, error } = useSelector((state) => state.taskCounts);
  const dispatch = useDispatch();
  console.log("its is the data from the slice", data)
  useEffect(() => {
    // Fetch task counts on component mount
    dispatch(fetchDashboardData());
  }, [dispatch]);
  const CustomLegend = (props) => {
    return (
      <div style={{ padding: 0, fontFamily: 'var(--primary-font-family)', display: 'flex', gap: '20px', justifyContent: 'center', marginTop: '25px' }}>
        {props.payload.map((entry, index) => (
          <div key={`item-${index}`} style={{ display: 'flex', alignItems: 'center' }}>
            <div style={{ backgroundColor: entry.color, width: 18, height: 4, marginRight: 8 }} />
            <div style={{ fontSize: '16px', color: 'var(--secondary-font-color)' }}>{entry.value}</div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <BarChart width={630} height={350} data={data}>
      <XAxis dataKey="day" tick={{ style: { fontFamily: 'var(--secondary-font-family)' } }} />
      <YAxis ticks={[0, 2, 4, 6, 8, 10, 12, 14]} domain={[0, 14]} tick={{ style: { fontFamily: 'var(--secondary-font-family)' } }} />
      <Tooltip />
      <Legend content={<CustomLegend />} />
      <CartesianGrid strokeDasharray="3 3" />
      <Bar dataKey="HIGH" fill="var(--logout-color)" />
      <Bar dataKey="MEDIUM" fill="#FBBF24" />
      <Bar dataKey="LOW" fill="#1FDE43" />
    </BarChart>
  );
};

export default CustomBarChart;