import { useSelector } from 'react-redux';
import blueTick from 'src/assets/blue-tick-circle.svg';
import clock from 'src/assets/clock.svg';
import greenTick from 'src/assets/green-tick-circle.svg';
import total from 'src/assets/total.svg';
import 'src/components/dashboard/subComponents/dashboard.css';
import TwoLevelPieChart from 'src/components/dashboard/subComponents/PieChart.jsx';
import StatusBox from 'src/components/dashboard/subComponents/StatusBox';
import MainDiv from "src/components/maindiv/maindiv";
import { capitalizeFirstLetter, formatLocalDateTime } from 'src/utils/basicUtils';
import CustomBarChart from './subComponents/BarChart';
// import MuiPieChart from './subComponents/MuiPieChart';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchDashboardData } from "src/store/thunks/dashboardThunk.js";


function Dashboard() {
    const user = useSelector(state => state.auth?.user);
    const highPriorityTasks = useSelector((state) => state.highPriorityTasks.highPriorityTasks);
    const mediumPriorityTasks = useSelector((state) => state.mediumPriorityTasks.mediumPriorityTasks);
    const lowPriorityTasks = useSelector((state) => state.lowPriorityTasks.lowPriorityTasks);
    const tasks = useSelector(state => state.tasks.tasks);
    const dispatch = useDispatch();
    const totalCountData = useSelector((state) => state.chartsData?.graphData?.statusGraph);
    const loaded = useSelector((state) => state.chartsData.loaded);

    console.log('here is the total count', totalCountData)
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

    useEffect(() => {
        // Fetch task counts on component mount
        if (!loaded) {
            dispatch(fetchDashboardData());
        }
    }, [dispatch]);
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
                    <StatusBox img={clock} statusCount={totalCountData['PENDING']} statusName='Pending' />
                    <StatusBox img={blueTick} statusCount={totalCountData['IN_PROGRESS']} statusName='In Progress' />
                    <StatusBox img={greenTick} statusCount={totalCountData['COMPLETED']} statusName='Completed' />
                    <StatusBox img={total} statusCount={totalCountData['NOT_STARTED']} statusName='Not Started' />
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
                            Weekly Priorities
                        </div>
                        <div style={{marginTop: '45px'}} >
                            <CustomBarChart 
                           
                            />
                           
                        </div>
                    </div>
                    <div className="pie-chart-div">
                    <div style ={{
                            fontFamily: 'var(--primary-font-family)',
                            color: 'var(--secondary-font-color)',
                            fontSize: '22px',
                            fontWeight: '600',
                            marginLeft: '11px'
                        }}>
                        Priorities by Status
                        </div>
                        <div>
                            <TwoLevelPieChart />
                            <div style={{display: 'flex', width: '100%', justifyContent: 'center', gap: '20px',  marginLeft: '4px'}}>
                                <div style={{display: 'flex',  alignItems: 'center', gap: '5px'}}>
                                    <div style={{height: '4px', width: '20px', backgroundColor: '#EF4444'}}></div>
                                    <div style={{fontFamily: 'var(--primary-font-family)', color: 'var(--secondary-font-color)'}}>High</div>
                                </div>
                                <div style={{display: 'flex',  alignItems: 'center', gap: '5px'}}>
                                    <div style={{height: '4px', width: '20px', backgroundColor: '#F59E0B'}}></div>
                                    <div style={{fontFamily: 'var(--primary-font-family)', color: 'var(--secondary-font-color)'}}>Medium</div>
                                </div>
                                <div style={{display: 'flex',  alignItems: 'center', gap: '5px'}}>
                                    <div style={{height: '4px', width: '20px', backgroundColor: '#1FDE43'}}></div>
                                    <div style={{fontFamily: 'var(--primary-font-family)', color: 'var(--secondary-font-color)'}}>Low</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </MainDiv>
    )
}

export default Dashboard;