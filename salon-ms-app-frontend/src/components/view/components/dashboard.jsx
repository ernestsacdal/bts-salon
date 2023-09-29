import React from "react";
import * as FAicons from "react-icons/fa6";
import * as BSicons from "react-icons/bs";
import * as MDicons from "react-icons/md";
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import watson from '../components/assets/watson.jpg'
import hope from '../components/assets/hope.jpg'

function Dashboard() {
  const events = [
    { title: 'Meeting', start: new Date() },
    { title: 'Spakol', start: '2023-09-24' },
    { title: 'Spakol', start: '2023-09-25' },
  ]
  const dashComp = [
    {
      name: "Members",
      icon: <FAicons.FaUsers size={45} />,
      value: "200",
    },
    {
      name: "Sales",
      icon: <BSicons.BsGraphUpArrow size={45} />,
      value: "10,000",
    },
    {
      name: "Today Visitors",
      icon: <MDicons.MdLogin size={45} />,
      value: "10",
    },
    {
      name: "Staff",
      icon: <MDicons.MdAdminPanelSettings size={45} />,
      value: "200",
    },
  ]
  const Stylist = [
    {
      name: "Laurence Javier",
      value: "Hair cut and Hair Styling Artist",
      image: watson,
    },
    {
      name: "Ernest Sacdal",
      value: "Make up Stylist",
      image: hope,
    },
    {
      name: "Rupert Caingal",
      value: "Hair cut and Hair Styling Artist",
      image: watson,
    },
    {
      name: "John ken Talusan",
      value: "Make up Stylist",
      image: hope,
    },
    {
      name: "Ernesto ",
      value: "Hair cut and Hair Styling Artist",
      image: watson,
    },
  ]

  const DashboardComponents = ( 
    <div className="grid grid-cols-2 md:grid-cols-4 gap-2 py-6">
          {dashComp.map((item, index) => (
            <div
              key={index}
              className="bg-blue-200 p-4 rounded-lg shadow-md flex flex-row  gap-2"
            >
              <div className="mr-2">{item.icon}</div>
              <div className="flex-col">
                <h2 className="text-md font-semibold">{item.name}</h2>
                <p className="text-gray-500 text-md mt-1">{item.value}</p>
              </div>
            </div>
          ))}
        </div>
    );
  const CalendarComponents = (
      <div className="mt-4">
          <h1 className="text-xl font-semibold mb-4">Appointments Schedule</h1>
          <div className="bg-white p-4 rounded-lg shadow-md">
            <FullCalendar
              plugins={[dayGridPlugin]}
              initialView="dayGridMonth"
              weekends={true}
              events={events}
              eventContent={renderEventContent}
              themeSystem="bootstrap" // Use the Bootstrap theme (optional)
              height="auto" // Let the calendar adjust its height
              headerToolbar={{
                left: "prev,next today",
                center: "title",
                right: "dayGridMonth,timeGridWeek,timeGridDay",
              }}
            />
          </div>
        </div>
    );
  const StylistComponent = (
      <div className="md:w-1/3 p-4">
        <div className="mt-8">
          <h2 className="text-sm font-semibold mb-4">Stylist List</h2>
          <div className="flex flex-col flex-wrap gap-4">
            {Stylist.map((stylist, index) => (
              <div key={index} className="w-30 h-30 bg-gray-100 p-4 rounded-lg shadow-md flex flex-row items-center">
                <div className="w-8 h-8 rounded-full overflow-hidden">
                  <img src={stylist.image} alt={stylist.name} className="w-full h-full object-cover" />
                </div>
                <div className="ml-2">
                  <h3 className="text-lg font-semibold">{stylist.name}</h3>
                  <p className="text-sm text-gray-500 mt-1">{stylist.value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  return (
    <div className="flex flex-col md:flex-row">
      <div className="md:w-2/3 p-4">
        {DashboardComponents}
        {CalendarComponents}
      </div>
      {StylistComponent}
    </div>
  );
}

function renderEventContent(eventInfo) {
  return (
    <>
      <b>{eventInfo.timeText}</b>
      <i>{eventInfo.event.title}</i>
    </>
  )
}

export default Dashboard;
