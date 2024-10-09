import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid } from 'recharts';
import { useSelector } from 'react-redux';





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
  const data = [
    { day: 'Mon', High: 10, Medium: 4, Low: 6 },
    { day: 'Tue', High: 5, Medium:11, Low: 2 },
    { day: 'Wed', High: 6, Medium: 9, Low: 5 },
    { day: 'Thurs', High:  4, Medium:  3, Low:  2 },
    { day: 'Fri', High:  16, Medium: 1, Low:  1 },
    { day: 'Sat', High:  9, Medium: 2, Low: 2 },
    { day: 'Sun', High:  4, Medium:  3, Low:  3 },
  ];

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
      <Bar dataKey="High" fill="var(--logout-color)" />
      <Bar dataKey="Medium" fill="#FBBF24" />
      <Bar dataKey="Low" fill="#1FDE43" />
    </BarChart>
  );
};

export default CustomBarChart;