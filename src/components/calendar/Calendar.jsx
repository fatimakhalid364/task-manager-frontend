import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { Calendar, dayjsLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { useDispatch, useSelector } from 'react-redux';
import MainDiv from "src/components/maindiv/maindiv";
import NotificationModal from 'src/components/notifications/NotificationModal.jsx';
import { useResponsive } from "src/constants/media_queries";
import { setCalendarValues } from 'src/store/slices/calendarSlice';
import { decryptSingleValues } from 'src/utils/encryptionUtil';
import { fetchCalendarTasksThunk } from '../../store/thunks/taskThunks';
import './style.css';

const localizer = dayjsLocalizer(dayjs);

const CalendarComponent = () => {
    const dispatch = useDispatch();
    const { isAdaptableScreen, isMicroScreen } = useResponsive();
    const [globalView, setGlobalView] = useState('month')
    const _privateKey = localStorage.getItem("privateKey");
    const events = useSelector((state) => state.calendar);
    const [modalOpen, setModalOpen] = useState(false);
    const [modalData, setModalData] = useState({});
    const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const dateFormat = useSelector((state) => state.format.dateFormat);
    const timeFormat = useSelector((state) => state.format.timeFormat);

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
            dispatch(setCalendarValues(decryptedEvents))

        } catch (error) {
            console.error('Error fetching tasks:', error);
        }
    };

    useEffect(() => {
        if (!events.loaded) {
            const view = 'month';
            const startDate = dayjs().startOf('month').toISOString();
            const endDate = dayjs().endOf('month').toISOString();

        fetchTasks(view, startDate, endDate);
        }
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
            backgroundColor:  'var(--primary-background-color)',
            borderColor:  'var(--primary-background-color)',
            fontFamily: 'var(--primary-font-family)',
        };
        return <div className="rbc-event" style={style}>{event.title}</div>;
    };
    const handleEventSelect = (event) => {
        const date = dayjs(event.end);
        const formattedDate = date.format('MMMM D, YYYY');
        const formattedTime = date.format('HH:mm a');
        const endDate = formattedDate + " " + formattedTime
        setModalData({
            title: event.title,
            start: dayjs(event.start).format('MMMM D, YYYY'),
            end: endDate,
            // Add any other properties as needed
        });
        setModalOpen(true);
    };

    return (
        <MainDiv>
            <div style={{ height: '100vh', width: '100%', padding: '20px', boxSizing: 'border-box', marginBottom: isMicroScreen && '50px', zIndex: '1' }}>
                <Calendar
                    localizer={localizer}
                    events={events?.calendarData}
                    startAccessor="start"
                    endAccessor="end"
                    views={['month', 'week', 'day']}
                    defaultView="month"
                    selectable
                    popup
                    onView={handleViewChange}
                    onRangeChange={handleRangeChange}
                    onSelectEvent={handleEventSelect}
                    onSelectSlot={(slotInfo) =>
                        alert(`Selected slot: \nStart: ${slotInfo.start}\nEnd: ${slotInfo.end}`)
                    }
                    components={{
                        event: CustomEvent
                    }}
                    style={{ height: '100%', width: '100%' }}
                />
                {modalOpen &&
                    <NotificationModal
                        open={modalOpen}
                        onOkay={() => setModalOpen(false)}
                    onCancel={() => setModalOpen(false)}
                        title={"Schedueled Task"}
                        titleInfo={modalData.title}
                        message={`Duedate - ${modalData.end}`}
                    primaryButtonText={"Okay!"}
                    />

                }
            </div>
        </MainDiv>
    );
};

export { CalendarComponent };

