import React, { useState, useEffect } from "react";
import axios from "axios";
import watson from "../components/assets/watson.jpg";
import hope from "../components/assets/hope.jpg";

function Staff() {
  const [employees, setEmployees] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState({
    id: "",
    name: "",
    avatar: "",
    specialist: "",
    availability: "Full Time", // Default to Full Time
  });
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    // Function to fetch employee data from the API
    const fetchEmployees = async () => {
      try {
        const response = await axios.get("https://api.example.com/employees");
        const data = response.data;
        setEmployees(data);
      } catch (error) {
        console.error("Error fetching employee data:", error);
      }
    };

    // Call the fetchEmployees function when the component mounts
    fetchEmployees();
  }, []);

  const handleEditClick = (employee) => {
    setSelectedEmployee(employee);
    setEditMode(true);
    setModalOpen(true);
  };

  const handleDeleteClick = (employeeId) => {
    setEmployees((prevEmployees) =>
      prevEmployees.filter((employee) => employee.id !== employeeId)
    );
  };

  const handleModalClose = () => {
    setModalOpen(false);
    setEditMode(false);
    setSelectedEmployee({
      id: "",
      name: "",
      avatar: "",
      specialist: "",
      availability: "Full Time", // Reset to Full Time when closing
    });
    setSelectedImage(null);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (editMode) {
      // Update employee data in the API
      try {
        await axios.put(
          `https://api.example.com/employees/${selectedEmployee.id}`,
          selectedEmployee
        );

        // Update the local state (assuming a successful update)
        setEmployees((prevEmployees) =>
          prevEmployees.map((employee) => {
            if (employee.id === selectedEmployee.id) {
              return { ...employee, ...selectedEmployee };
            }
            return employee;
          })
        );
      } catch (error) {
        console.error("Error updating employee data:", error);
      }
    } else {
      const newEmployee = {
        ...selectedEmployee,
        id: employees.length + 1,
        avatar: selectedImage ? URL.createObjectURL(selectedImage) : "",
      };

      // Add new employee data to the API
      try {
        const response = await axios.post(
          "https://api.example.com/employees",
          newEmployee
        );

        // Update the local state (assuming a successful addition)
        setEmployees((prevEmployees) => [...prevEmployees, response.data]);
      } catch (error) {
        console.error("Error adding employee data:", error);
      }
    }

    handleModalClose();
  };
  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-4">Employee Management</h1>

      <button
        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mb-4"
        onClick={() => {
          setModalOpen(true);
          setEditMode(false);
          setSelectedEmployee({
            id: "",
            name: "",
            avatar: "",
            specialist: "",
            availability: "Full Time", // Default to Full Time
          });
        }}
      >
        Add Employee
      </button>

      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Name
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Avatar
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Specialist
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Availability
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {employees.map((employee) => (
            <tr key={employee.id}>
              <td className="px-6 py-4 whitespace-nowrap">{employee.name}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                {employee.avatar && (
                  <img
                    src={employee.avatar}
                    alt={employee.name}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                )}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {employee.specialist}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {employee.availability === "Full Time" ? (
                  <span className="bg-green-400 text-white px-2 py-1 rounded-full">
                    Full Time
                  </span>
                ) : employee.availability === "Part Time" ? (
                  <span className="bg-yellow-400 text-white px-2 py-1 rounded-full">
                    Part Time
                  </span>
                ) : (
                  <span className="bg-red-500 text-white px-2 py-1 rounded-full">
                    Not Available
                  </span>
                )}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <button
                  className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-1 px-2 rounded"
                  onClick={() => handleEditClick(employee)}
                >
                  Edit
                </button>
                <button
                  className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-2 ml-2 rounded"
                  onClick={() => handleDeleteClick(employee.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {modalOpen && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div
              className="fixed inset-0 transition-opacity"
              aria-hidden="true"
            >
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <span
              className="hidden sm:inline-block sm:align-middle sm:h-screen"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <div
              className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
              role="dialog"
              aria-modal="true"
              aria-labelledby="modal-headline"
            >
              <form onSubmit={handleFormSubmit}>
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="mb-4">
                    <label
                      className="block text-gray-700 text-sm font-bold mb-2"
                      htmlFor="name"
                    >
                      Name
                    </label>
                    <input
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      id="name"
                      type="text"
                      placeholder="Name"
                      value={selectedEmployee.name}
                      onChange={(e) =>
                        setSelectedEmployee({
                          ...selectedEmployee,
                          name: e.target.value,
                        })
                      }
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label
                      className="block text-gray-700 text-sm font-bold mb-2"
                      htmlFor="avatar"
                    >
                      Avatar
                    </label>
                    <input
                      className="mb-2"
                      type="file"
                      accept="image/*"
                      onChange={(e) => setSelectedImage(e.target.files[0])}
                    />
                    {selectedImage && (
                      <img
                        src={URL.createObjectURL(selectedImage)}
                        alt="Selected"
                        className="mb-2 max-w-full"
                      />
                    )}
                  </div>
                  <div className="mb-4">
                    <label
                      className="block text-gray-700 text-sm font-bold mb-2"
                      htmlFor="specialist"
                    >
                      Specialist
                    </label>
                    <input
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      id="specialist"
                      type="text"
                      placeholder="Specialist"
                      value={selectedEmployee.specialist}
                      onChange={(e) =>
                        setSelectedEmployee({
                          ...selectedEmployee,
                          specialist: e.target.value,
                        })
                      }
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label
                      className="block text-gray-700 text-sm font-bold mb-2"
                      htmlFor="availability"
                    >
                      Availability
                    </label>
                    <select
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      id="availability"
                      value={selectedEmployee.availability}
                      onChange={(e) =>
                        setSelectedEmployee({
                          ...selectedEmployee,
                          availability: e.target.value,
                        })
                      }
                      required
                    >
                      <option value="Full Time">Full Time</option>
                      <option value="Part Time">Part Time</option>
                      <option value="Not Available">Not Available</option>
                    </select>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                  <button
                    type="submit"
                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
                  >
                    Save
                  </button>
                  <button
                    type="button"
                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                    onClick={handleModalClose}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Staff;
