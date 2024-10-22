import React from 'react';
import {
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from 'recharts';
// import * as React from 'react';
// import { PieChart } from '@mui/x-charts/PieChart';
import { useSelector } from 'react-redux';

const dataf = [
  { name: 'Pending', value: 0 },
  { name: 'In Progress', value: 0 },
  { name: 'Not Started', value: 0 },
  { name: 'Completed', value: 0 },
];

const subDdataF = {
  'Pending': [
    { name: 'High', value: 0 },
    { name: 'Medium', value: 0 },
    { name: 'Low', value: 0 },
  ],
  'In Progress': [
    { name: 'High', value: 0 },
    { name: 'Medium', value: 0 },
    { name: 'Low', value: 0 },
  ],
  'Not Started': [
    { name: 'High', value: 0 },
    { name: 'Medium', value: 0 },
    { name: 'Low', value: 0 },
  ],
  'Completed': [
    { name: 'High', value: 0 },
    { name: 'Medium', value: 0 },
    { name: 'Low', value: 0 },
  ],
};


const priorityLabels = {
  HIGH: 'High',
  MEDIUM: 'Medium',
  LOW: 'Low'
};

const statusLabels = {
  COMPLETED: 'Completed',
  IN_PROGRESS: 'In Progress',
  NOT_STARTED: 'Not Started',
  PENDING: 'Pending'
};
const COLORS = ['#EF4444', '#F59E0B', '#1FDE43'];

const TwoLevelPieChart = () => {
  const [activeGroup, setActiveGroup] = React.useState(null);
  const pieGraohData = useSelector((state) => state.chartsData?.graphData?.pieGraph);
  const totalCountData = useSelector((state) => state.chartsData?.graphData?.statusGraph);
  const convertTaskData = (data) => {
    if (data) {
      return Object.keys(data).map((key) => ({
        name: statusLabels[key], // Map the status key to the proper label
        value: data[key] // Use the value from the original data
      }));
    } else {
      return dataf
    }
    // Convert the input object into the desired array format

  };
  const data = convertTaskData(totalCountData)
  const transformPieGraphData = (data) => {
    if (data) {
      return Object.keys(data).reduce((acc, status) => {
        // Convert each status key to the new format
        acc[statusLabels[status]] = Object.keys(data[status]).map((priority) => ({
          name: priorityLabels[priority],
          value: data[status][priority]
        }));
        return acc;
      }, {});
    } else {
      return subDdataF
    }

  // Iterate over each status in the input data

  };
  const subData = transformPieGraphData(pieGraohData);
  console.log(subData)
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