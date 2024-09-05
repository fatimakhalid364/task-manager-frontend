import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { Calendar, dayjsLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { useDispatch, useSelector } from 'react-redux';
import MainDiv from "src/components/maindiv/maindiv";
import { decryptSingleValues } from 'src/utils/encryptionUtil';
import { fetchCalendarTasksThunk } from '../../store/thunks/taskThunks'; // Adjust path if necessary
import './style.css'; // Make sure this path is correct

const localizer = dayjsLocalizer(dayjs);

const CalendarComponent = () => {
    const dispatch = useDispatch();
    const [events, setEvents] = useState([]);
    const [globalView, setGlobalView] = useState('month')
    const _privateKey = localStorage.getItem("privateKey");
    const accentColor = useSelector((state) => state.appearance.color);
    const fetchTasks = async (view, startDate, endDate) => {

        try {
            const response = await dispatch(fetchCalendarTasksThunk({ view, startDate, endDate })).unwrap();
            console.log('response in comps', response)
            const formattedEvents = response?.data?.map(task => ({
                title: task.title,
                start: new Date(task.start),
                end: new Date(task.end),
            }));
            const decryptedEvents = await Promise.all(
                formattedEvents.map(async (_event) => ({
                    ..._event,
                    title: await decryptSingleValues(_event.title, _privateKey),
                }))
            );
            setEvents(decryptedEvents);
        } catch (error) {
            console.error('Error fetching tasks:', error);
        }
    };

    useEffect(() => {
        const view = 'month'; // Default view
        const startDate = dayjs().startOf('month').toISOString(); // Start of the default month
        const endDate = dayjs().endOf('month').toISOString(); // End of the default month

        fetchTasks(view, startDate, endDate);
    }, [dispatch]);

    const handleViewChange = (view) => {
        const startDate = dayjs().startOf(view).toISOString();
        const endDate = dayjs().endOf(view).toISOString();
        setGlobalView(view)
        fetchTasks(view, startDate, endDate);
    };

    const handleRangeChange = (range) => {
        let startDate;
        let endDate;
        if (globalView == 'day') {
            startDate = dayjs(range[0]).toISOString();
            endDate = dayjs(range[0]).toISOString();
        } else {
            startDate = dayjs(range.start).toISOString();
            endDate = dayjs(range.end).toISOString();
        }
        console.log('range from the calendar', range)
        fetchTasks(globalView, startDate, endDate);
    };
    const CustomEvent = ({ event }) => {
        const style = {
            padding: '5px',
            backgroundColor: accentColor === 'blue' ? 'var(--primary-background-color)' : accentColor === 'pink' ? 'var(--pink-accent-color)' : accentColor === 'orange' ? 'var(--orange-accent-color)' : accentColor === 'green' ? 'var(--green-accent-color)' : 'var(--primary-background-color)',
            borderColor: accentColor === 'blue' ? 'var(--primary-background-color)' : accentColor === 'pink' ? 'var(--pink-accent-color)' : accentColor === 'orange' ? 'var(--orange-accent-color)' : accentColor === 'green' ? 'var(--green-accent-color)' : 'var(--primary-background-color)',
        };
        return <div className="rbc-event" style={style}>{event.title}</div>;
    };

    return (
        <MainDiv>
            <div style={{ height: '100vh', width: '100%', padding: '20px', boxSizing: 'border-box' }}>
                <Calendar
                    localizer={localizer}
                    events={events}
                    startAccessor="start"
                    endAccessor="end"
                    views={['month', 'week', 'day']}
                    defaultView="month"
                    selectable
                    popup
                    onView={handleViewChange}
                    onRangeChange={handleRangeChange}
                    onSelectEvent={(event) => alert(event.title)}
                    onSelectSlot={(slotInfo) =>
                        alert(`Selected slot: \nStart: ${slotInfo.start}\nEnd: ${slotInfo.end}`)
                    }
                    // eventClassName={(event) => {
                    //     if (accentColor === 'blue') return 'rbc-event';
                    //     if (accentColor === 'pink') return 'rbc-event pink';
                    //     if (accentColor === 'orange') return 'rbc-event orange';
                    //     return 'rbc-event primary';
                    // }}
                    components={{
                        event: CustomEvent
                    }}
                    style={{ height: '100%', width: '100%' }}
                />
            </div>
        </MainDiv>
    );
};

export { CalendarComponent };

