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
    const highPriorityTasks = useSelector((state) => state.highPriorityTasks.highPriorityTasks);
    const mediumPriorityTasks = useSelector((state) => state.mediumPriorityTasks.mediumPriorityTasks);
    const lowPriorityTasks = useSelector((state) => state.lowPriorityTasks.lowPriorityTasks);
    const tasks = useSelector(state => state.tasks.tasks);
    console.log('highPriorityTasks areeee....', highPriorityTasks)

    // const priorityTasksInStatus = (status, priority) => {
    //     const statusHighTasks = tasks.filter(task => task.status == status && task.priority == priority);
    //     const statusHighTasksCount = statusHighTasks.length;
    //     const statusMediumTasks = mediumPriorityTasks.filter(task => task.status == status);
    //     const statusMediumTasksCount = statusMediumTasks.length;
    //     const statusLowTasks = lowPriorityTasks.filter(task => task.status == status);
    //     const statusLowTasksCount = statusLowTasks.length;
    //     return ({
    //         statusHighTasksCount,
    //         statusLowTasksCount,
    //         statusMediumTasksCount
    //     })
    // }

    // const prioritiesInNotStarted = priorityTasksInStatus('NOT_STARTED');
    // const highNotStartedCount = prioritiesInNotStarted.statusHighTasksCount;
    // const mediumNotStartedCount = prioritiesInNotStarted.statusMediumTasksCount;
    // const lowNotStartedCount = prioritiesInNotStarted.statusLowTasksCount;
    // const prioritiesInPending = priorityTasksInStatus('PENDING');
    // const highPendingCount = prioritiesInPending.statusHighTasksCount;
    // const mediumPendingCount = prioritiesInPending.statusMediumTasksCount;
    // const lowPendingCount = prioritiesInPending.statusLowTasksCount;
    // const prioritiesInProgressing = priorityTasksInStatus('IN_PROGRESS');
    // const highProgressingCount = prioritiesInProgressing.statusHighTasksCount;
    // const mediumProgressingCount = prioritiesInProgressing.statusMediumTasksCount;
    // const lowProgressingCount = prioritiesInProgressing.statusLowTasksCount;
    // const prioritiesInCompleted = priorityTasksInStatus('COMPLETED');
    // const highCompletedCount = prioritiesInCompleted.statusHighTasksCount;
    // const mediumCompletedCount = prioritiesInCompleted.statusMediumTasksCount;
    // const lowCompletedCount = prioritiesInCompleted.statusLowTasksCount;




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
                            <CustomBarChart 
                            // highNotStartedCount={highNotStartedCount}
                            // mediumNotStartedCount={mediumNotStartedCount}
                            // lowNotStartedCount={ lowNotStartedCount}
                            // highPendingCount={highPendingCount}
                            // mediumPendingCount={mediumPendingCount}
                            // lowPendingCount={lowPendingCount}
                            // highProgressingCount={highProgressingCount}
                            // mediumProgressingCount={mediumProgressingCount}
                            // lowProgressingCount={lowProgressingCount}
                            // highCompletedCount={highCompletedCount}
                            // mediumCompletedCount={mediumCompletedCount}
                            // lowCompletedCount={lowCompletedCount}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </MainDiv>
    )
}

export default Dashboard;