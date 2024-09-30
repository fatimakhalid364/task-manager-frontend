import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import MainDiv from "src/components/maindiv/maindiv";
import 'src/components/dashboard/subComponents/dashboard.css'
import { capitalizeFirstLetter, formatLocalDateTime } from 'src/utils/basicUtils';
import StatusBox from 'src/components/dashboard/subComponents/StatusBox';
import clock from 'src/assets/clock.svg';
import blueTick from 'src/assets/blue-tick-circle.svg';
import greenTick from 'src/assets/green-tick-circle.svg';
import total from 'src/assets/total.svg';
import CustomBarChart from './subComponents/BarChart';



function Dashboard() {
    const user = useSelector(state => state.auth?.user);

    const formatUserName = () => {
        if (user) {
            let firstName = `${user?.firstName}`;

            firstName = firstName.split(' ').map(name => capitalizeFirstLetter(name)).join(' ');

            

            return firstName;
        }
        return '';
    }

    const timeFormat = useSelector((state) => state.format.timeFormat)
    const dateFormat = useSelector((state) => state.format.dateFormat);
    const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    return (
        <MainDiv>
            <div style={{width: '100%'}}>
                <div className="dashboard-header">
                    <div className="dashboard-header-text">
                        <div className="dashboard-welcome">Welcome {formatUserName()}!</div>
                        <div className="dashboard-date">{formatLocalDateTime(new Date().toISOString(), userTimeZone, timeFormat, dateFormat)}</div>
                    </div>
                </div>
                <div className = 'status-boxes-div'>
                        <StatusBox img = {clock} statusCount = '12' statusName = 'Pending' />
                        <StatusBox img = {blueTick} statusCount = '12' statusName = 'In Progress' />
                        <StatusBox img = {greenTick} statusCount = '12' statusName = 'Completed' />
                        <StatusBox img = {total} statusCount = '12' statusName = 'Total Tasks' />
                </div>
                <div className = 'chart-and-pinned-div'>
                    <div className='bar-chart-div'>
                        <div style ={{
                            fontFamily: 'var(--primary-font-family)',
                            color: 'var(--secondary-font-color)',
                            fontSize: '22px',
                            fontWeight: '600',
                            marginLeft: '11px'
                        }}>
                        Tasks by Priority
                        </div>
                        <div style={{marginTop: '45px'}}>
                            <CustomBarChart />
                        </div>
                    </div>
                </div>
            </div>
        </MainDiv>
    )
}

export default Dashboard;