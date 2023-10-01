import { useState } from "react";
import * as Io5icons from "react-icons/io5";
import * as MDicons from "react-icons/md";
import { Link, Outlet, useNavigate } from "react-router-dom";
import Dashboard from "./components/dashboard";
import Inventory from "./components/inventory";
import Staff from "./components/Staff";
import watson from "./components/assets/watson.jpg";

function formatTimeAgo(timestamp) {
  const now = new Date();
  const notificationTime = new Date(timestamp);
  const timeDiff = now - notificationTime;

  if (timeDiff < 60000) {
    return "Just now";
  } else if (timeDiff < 3600000) {
    const minutes = Math.floor(timeDiff / 60000);
    return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
  } else {
    const hours = Math.floor(timeDiff / 3600000);
    return `${hours} hour${hours > 1 ? "s" : ""} ago`;
  }
}

function Sidebar() {
  const [isOpenSidebar, setIsOpenSidebar] = useState(true);
  const [selected, setSelected] = useState("");
  

  const sidebarComp = [
    {
      name: "Dashboard",
      icon: (
        <Io5icons.IoGridOutline
          className={`${
            isOpenSidebar ? "text-lg" : "text-xl"
          } transition-all duration-500 `}
        />
      ),
      path: "/sidebar",
      element: <Dashboard />,
    },
    {
      name: "Inventory",
      icon: (
        <Io5icons.IoAlbumsOutline
          className={`${
            isOpenSidebar ? "text-lg" : "text-xl"
          } transition-all duration-500 `}
        />
      ),
      path: "/sidebar/inventory",
      element: <Inventory />,
    },
    {
      name: "Staff",
      icon: (
        <Io5icons.IoPeopleCircleOutline
          className={`${
            isOpenSidebar ? "text-lg" : "text-xl"
          } transition-all duration-500 `}
        />
      ),
      path: "/sidebar/staff",
      element: <Staff />,
    },
    {
      name: "Notifications",
      icon: (
        <Io5icons.IoNotificationsSharp
          className={`${
            isOpenSidebar ? "text-lg" : "text-xl"
          } transition-all duration-500 `}
        />
      ),
      path: "/notifications",
    },
    {
      name: "Orders",
      icon: (
        <MDicons.MdEventAvailable
          className={`${
            isOpenSidebar ? "text-lg" : "text-xl"
          } transition-all duration-500 `}
        />
      ),
      path: "/orders",
    },
    {
      name: "Payments",
      icon: (
        <MDicons.MdOutlinePayment
          className={`${
            isOpenSidebar ? "text-lg" : "text-xl"
          } transition-all duration-500 `}
        />
      ),
      path: "/payments",
    },
  ];

  const toggleSidebar = () => {
    setIsOpenSidebar(!isOpenSidebar);
  };

  const [activeNotification, setActiveNotification] = useState(null);

  const handleNotificationClick = (notification) => {
    setActiveNotification(notification);
  };

  const handleCloseModal = () => {
    setActiveNotification(null);
  };

  const NotificationsComponents = [
    {
      name: "Laurence Jade",
      value: "Successfully Booking",
      image: watson,
      timestamp: new Date(),
      isActive: true,
    },
    {
      name: "Ernest",
      value: "Successfully Booking",
      image: watson,
      timestamp: new Date(Date.now() - 5 * 60 * 1000),
      isActive: true,
    },
    {
      name: "John Ruppert",
      value: "Successfully Booking",
      image: watson,
      timestamp: new Date(Date.now() - 15 * 60 * 1000),
      isActive: true,
    },
    {
      name: "Hair Color",
      value: "Out of Stock",
      image: watson,
      timestamp: new Date(Date.now() - 15 * 60 * 1000),
      isActive: true,
    },
  ];

  return (
    <div className="min-h-screen flex flex-row">
      <div
        className={`${
          isOpenSidebar ? "w-[20%]" : "w-[5%]"
        } transition-[width] duration-500 overflow-hidden`}
      >
        {/* Sidebar Header */}
        <div className="flex flex-col gap-5 my-5 px-4">
          <div
            className={`${
              isOpenSidebar ? "translate-x-0" : "-translate-x-2.5"
            } transition-transform duration-500 justify-end flex flex-row z-20`}
          >
            {isOpenSidebar ? (
              <Io5icons.IoChevronBackOutline
                className="text-lg cursor-pointer"
                onClick={toggleSidebar}
              />
            ) : (
              <Io5icons.IoChevronForwardOutline
                className="text-lg cursor-pointer"
                onClick={toggleSidebar}
              />
            )}
          </div>
          <div className="text-center z-10">LOGO</div>
        </div>

        {/* Sidebar Navigation */}
        <div className="mt-10 pl-4">
          {sidebarComp.map(({ name, icon, path }) => (
            <Link to={path} key={name}>
              <div
                onClick={() => setSelected(name)}
                className={`${
                  selected === name ? "bg-second" : "bg-transparent"
                } flex flex-row items-center gap-2 my-2 py-2 w-52 px-2 hover:bg-second rounded-md transition-transform scale-100 hover:scale-105 cursor-pointer`}
              >
                {icon}
                <div
                  className={`${
                    isOpenSidebar ? "opacity-100" : "opacity-0"
                  } transition-opacity duration-500`}
                >
                  {name}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
      <div className="w-full">
        <div className="navbar bg-second">
          <div className="flex-1"></div>
          <div className="flex-none ml-4">
            <div className="relative inline-block text-left dropdown dropdown-end">
              <label tabIndex={0} className="btn btn-ghost btn-circle">
                <div className="indicator">
                  <MDicons.MdNotifications size={24} />
                  <span className="badge badge-sm indicator-item">
                    {NotificationsComponents.length}
                  </span>
                </div>
              </label>
              <div
                tabIndex={0}
                className="mt-3 ml-4 z-[1] card card-compact dropdown-content w-72 bg-base-100 shadow"
              >
                <div className="card-body  max-h-[400px] overflow-y-auto">
                  <span className="font-bold text-lg">Notifications</span>
                  <ul className="flex flex-col flex-wrap gap-2">
                    {NotificationsComponents.map((notification, index) => (
                      <li
                        key={index}
                        className="flex items-center space-x-2 justify-between notification-item cursor-pointer"
                        onClick={() => handleNotificationClick(notification)}
                      >
                        <div className="flex flex-row items-center gap-2">
                          {notification.isActive && (
                            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                          )}
                          <img
                            className="w-6 h-6 bg-primary rounded-full"
                            src={notification.image}
                            alt={`User ${notification.name} Avatar`}
                          />
                          <span
                            className={`text-xs flex flex-col ${
                              notification.isActive ? "active" : ""
                            }`}
                          >
                            <strong className="text-xxs">
                              {notification.name}
                            </strong>
                            <span>{notification.value}</span>
                          </span>
                        </div>
                        <span className="text-xs text-gray-500">
                          {formatTimeAgo(notification.timestamp)}
                        </span>
                      </li>
                    ))}
                  </ul>
                  <div className="card-actions mt-4">
                    <button className="btn btn-primary btn-block">
                      View All
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="dropdown dropdown-end">
              <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                <div className="w-10 rounded-full">
                  <img src={watson} alt="User Avatar" />
                </div>
              </label>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content mt-3 ml-4 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
              >
                <li>
                  <Link to="/profile" className="justify-between">
                    Profile
                    <span className="badge">New</span>
                  </Link>
                </li>
                <li>
                  <Link to="/settings" className="justify-between">
                    Settings
                  </Link>
                </li>
                <li>
                  <Link to="/logout" className="justify-between">
                    Logout
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <Outlet />
      </div>
      {activeNotification && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="modal modal-open">
            <div className="modal-box p-4">
              <div className="text-xl font-semibold">Notification Details</div>
              <div className="mt-4 flex items-center space-x-4">
                <div className="w-16 h-16 bg-primary rounded-full overflow-hidden">
                  <img
                    src={activeNotification.image}
                    alt={`User ${activeNotification.name} Avatar`}
                    className="object-cover w-full h-full"
                  />
                </div>
                <div>
                  <div>{activeNotification.name}</div>
                  <div>{activeNotification.value}</div>
                  <div className="text-gray-500">
                    {formatTimeAgo(activeNotification.timestamp)}
                  </div>
                </div>
              </div>
              <div className="mt-4 modal-action">
                <button className="btn btn-primary" onClick={handleCloseModal}>
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Sidebar;
