import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid } from 'recharts';

const data = [
    { day: 'Mon', High: 4, Medium: 2, Low: 1 },
    { day: 'Tue', High: 5, Medium: 1, Low: 3 },
    { day: 'Wed', High: 6, Medium: 3, Low: 2 },
    { day: 'Thurs', High: 3, Medium: 2, Low: 4 },
    { day: 'Fri', High: 2, Medium: 1, Low: 5 },
    { day: 'Sat', High: 1, Medium: 0, Low: 2 },
    { day: 'Sun', High: 0, Medium: 1, Low: 1 },
  ];

  const CustomLegend = (props) => {
    return (
      <div style={{ padding: 0, fontFamily: 'var(--primary-font-family)', display: 'flex', gap: '20px', justifyContent: 'center', marginTop: '25px' }}>
        {props.payload.map((entry, index) => (
          <div key={`item-${index}`} style={{display: 'flex', alignItems: 'center'}}>
            <div style={{ backgroundColor: entry.color, width: 18, height: 4, marginRight: 8 }} />
            <div style={{fontSize: '16px', color: 'var(--secondary-font-color)'}}>{entry.value}</div>
          </div>
        ))}
      </div>
    );
  };

  const CustomBarChart = () => (
    <BarChart width={636} height={350} data={data}>
      <XAxis dataKey="day" tick={{ style: { fontFamily: 'var(--secondary-font-family)' } }} />
      <YAxis ticks={[0, 2, 4, 6, 8, 10, 12, 14]} domain={[0, 14]}  tick={{ style: { fontFamily: 'var(--secondary-font-family)' } }} />
      <Tooltip />
      <Legend content={<CustomLegend />} />
      <CartesianGrid strokeDasharray="3 3" />
      <Bar dataKey="High"  fill="var(--logout-color)" />
      <Bar dataKey="Medium"  fill="#FBBF24" />
      <Bar dataKey="Low"  fill="#1FDE43" />
    </BarChart>
  );
  
  export default CustomBarChart;