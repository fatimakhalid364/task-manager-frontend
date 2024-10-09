import React from 'react';
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
// import * as React from 'react';
// import { PieChart } from '@mui/x-charts/PieChart';

const data = [
  { name: 'Pending', value: 12 },
  { name: 'In Progress', value: 11 },
  { name: 'Not Started', value: 30 },
  { name: 'Completed', value: 10 },
];

const subData = {
  'Pending': [
    { name: 'High', value: 3 },
    { name: 'Medium', value: 4 },
    { name: 'Low', value: 5 },
  ],
  'In Progress': [
    { name: 'High', value: 4 },
    { name: 'Medium', value: 5 },
    { name: 'Low', value: 2 },
  ],
  'Not Started': [
    { name: 'High', value: 5 },
    { name: 'Medium', value: 10 },
    { name: 'Low', value: 15 },
  ],
  'Completed': [
    { name: 'High', value: 2 },
    { name: 'Medium', value: 6 },
    { name: 'Low', value: 2 },
  ],
};

const COLORS = ['#EF4444', '#F59E0B', '#1FDE43'];

const TwoLevelPieChart = () => {
  const [activeGroup, setActiveGroup] = React.useState(null);

  const handleGroupMouseEnter = (data) => {
    setActiveGroup(data.name);
  };

  const handleGroupMouseLeave = () => {
    setActiveGroup(null);
  };

  return (
    <ResponsiveContainer width='100%' height={300}>
      <PieChart>
        <Pie
          data={data}
          innerRadius={70}
          outerRadius={90}
        //   fill="#8884d8"
          dataKey="value"
          onMouseEnter={handleGroupMouseEnter}
          onMouseLeave={handleGroupMouseLeave}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill='var(--primary-background-color)' />
          ))}
        </Pie>
        {activeGroup && (
          <Pie
            data={subData[activeGroup]}
            innerRadius={90}
            outerRadius={120}
            fill="#82ca9d"
            dataKey="value"
          >
            {subData[activeGroup].map((entry, index) => (
              <Cell key={`subcell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
        )}
        <Tooltip />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default TwoLevelPieChart;