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
    { status: 'Not Started', High: highNotStartedCount, Medium: mediumNotStartedCount, Low: lowNotStartedCount },
    { status: 'In Progress', High: highProgressingCount, Medium: mediumProgressingCount, Low: lowProgressingCount },
    { status: 'Completed', High: highCompletedCount, Medium: mediumCompletedCount, Low: lowCompletedCount },
    { status: 'Pending', High:  highPendingCount, Medium:  mediumPendingCount, Low:  lowPendingCount },
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
    <BarChart width={636} height={350} data={data}>
      <XAxis dataKey="status" tick={{ style: { fontFamily: 'var(--secondary-font-family)' } }} />
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