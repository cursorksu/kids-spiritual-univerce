import { useMemo, useState } from 'react';
import { PlanerContainerStyled } from './style';
// import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import getDay from 'date-fns/getDay';
import startOfWeek from 'date-fns/startOfWeek';
import enUS from 'date-fns/locale/en-US';
import { STORAGE_URL } from '../../constants/main';
import { EventEditModal } from '../Modal/EventEditModal';
import { EVENTS_CLASSES } from '../../constants/eventsType/eventsType';

const locales = {
    'en-US': enUS,
};

// const localizer = dateFnsLocalizer({
//     format,
//     parse,
//     startOfWeek: (date) => startOfWeek(date, { weekStartsOn: 1 }),
//     getDay,
//     locales,
// });

const myEventsList = [
    {
        id: '1',
        title: 'Урок воскресной школы',
        start: new Date(2024, 11, 15, 10, 0),
        end: new Date(2024, 11, 15, 12, 0),
        resource: {
            type: 0, theme: 'Иисус и ученики', teachers: [ 'Иван', 'Мария' ],
            imageUrl: `${STORAGE_URL}/static%2FScala_icon.png?alt=media&token=02dfe8d7-6643-47d0-a654-9f65d44ee411`
        },
    },
    {
        id: '2',
        title: 'Рождественский урок',
        start: new Date(2024, 11, 22, 10, 0),
        end: new Date(2024, 11, 22, 12, 0),
        resource: {
            type: 0, theme: 'Рождество', teachers: [ 'Сергей' ],
            imageUrl: `${STORAGE_URL}/static%2FJesus_saw.png?alt=media&token=0112226f-cec1-4462-9a95-8761db6bcdda`
        },
    },
    {
        id: '3',
        title: 'Євангелізацийне шоу',
        start: new Date(2024, 11, 28, 10, 0),
        end: new Date(2024, 11, 28, 12, 0),
        resource: {
            type: 3, theme: 'Євангелізацийне шоу', teachers: [ 'Сергей', 'Иван', 'Мария' ],
            imageUrl: `${STORAGE_URL}/static%2FJesus_saw.png?alt=media&token=0112226f-cec1-4462-9a95-8761db6bcdda`
        },
    },
    {
        id: '4',
        title: 'Організаційна зустріч',
        start: new Date(2024, 11, 27, 10, 0),
        end: new Date(2024, 11, 27, 12, 0),
        resource: {
            type: 2, theme: 'Організаційна зустріч', teachers: [ 'Сергей', 'Иван', 'Мария' ],
            imageUrl: `${STORAGE_URL}/static%2FJesus_saw.png?alt=media&token=0112226f-cec1-4462-9a95-8761db6bcdda`
        },
    },
    {
        id: '5',
        title: 'Конференція м.Львів',
        start: new Date(2024, 11, 5, 10, 0),
        end: new Date(2024, 11, 7, 18, 0),
        resource: {
            type: 2, theme: 'Конференція м.Львів', teachers: [ 'Сергей', 'Иван', 'Мария' ],
            imageUrl: `${STORAGE_URL}/static%2FJesus_saw.png?alt=media&token=0112226f-cec1-4462-9a95-8761db6bcdda`
        },
    },
    {
        id: '6',
        title: 'Організаційна зустріч',
        start: new Date(2024, 11, 26, 10, 0),
        end: new Date(2024, 11, 26, 12, 0),
        resource: {
            type: 2, theme: 'Організаційна зустріч', teachers: [ 'Сергей', 'Иван', 'Мария' ],
            imageUrl: `${STORAGE_URL}/static%2FJesus_saw.png?alt=media&token=0112226f-cec1-4462-9a95-8761db6bcdda`
        },
    },
];

const EventComponent = ({ event }) => {
    return (
        <div>
            {event.resource?.imageUrl && (
                <img
                    src={event.resource.imageUrl}
                    alt={event.title}
                />
            )}
            <div>
                <strong>{event.title}</strong>
                <div>{event.resource?.theme}</div>
            </div>
        </div>
    );
};


export const PlanerContainer = ({ group }) => {
    const [events, setEvents] = useState(group.events);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [modalEditIsOpen, setModalEditIsOpen] = useState(false);

    const handleSelectEvent = (event) => {
        setSelectedEvent(event);
        setModalEditIsOpen(true);
    };
    const eventPropGetter = useMemo(
        () => (event) => ({
            className: EVENTS_CLASSES[event.resource?.type],
        }),
        []
    );
    const handleSelectSlot = ({ start, end }) => {
        setSelectedEvent({
            start,
            end,
        });
        setModalEditIsOpen(true);
    };

    return (
        <PlanerContainerStyled>
            {/*<Calendar*/}
            {/*    localizer={localizer}*/}
            {/*    events={myEventsList}*/}
            {/*    startAccessor="start"*/}
            {/*    endAccessor="end"*/}
            {/*    eventPropGetter={eventPropGetter}*/}
            {/*    selectable*/}
            {/*    onSelectSlot={handleSelectSlot}*/}
            {/*    onSelectEvent={handleSelectEvent}*/}
            {/*    style={{ height: 500 }}*/}
            {/*    components={{*/}
            {/*        event: EventComponent,*/}
            {/*    }}*/}
            {/*/>*/}
            <EventEditModal
                isOpen={modalEditIsOpen}
                setIsOpen={() => setModalEditIsOpen(false)}
                onSave={handleSelectSlot}
                event={selectedEvent}
                group={group}
            />
        </PlanerContainerStyled>
    );
};