import React, { useState, useEffect } from 'react';
import axiosInstance from '../../axios';
import { useNavigate } from 'react-router-dom';

const ProductManagement = () => {
  const [data, setData] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedProductIndex, setSelectedProductIndex] = useState(null);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [isImageFile, setIsImageFile] = useState(false);
  const fetchData = async () => {
    try {
      const response = await axiosInstance.get('http://localhost:8000/api/display');
      setData(response.data.data);
    } catch (error) {
      console.error("There was an error!", error);
    }
  };
  const [product, setProduct] = useState({
    name: '',
    image: null,
    price: '',
    variants: [],
    quantity: 0,
  });

  useEffect(() => {
    fetchData(); // Initial data fetch
  }, []);
  const [modalOpen, setModalOpen] = useState(false);
  const [addConfirmationOpen, setAddConfirmationOpen] = useState(false);

  const handleModalClose = () => {
    setModalOpen(false);
    // setEditMode(false);
    setSelectedProductIndex(null);
    setProduct({
      name: '',
      image: null,
      price: '',
      available: true,
      variants: [],
      quantity: 0,
    });
  };
  const [formData, setFormData] = useState({
    name: '',
    image: null,
    price: '',
    quantity: '',
  });
  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', e.target.name.value);
    formData.append('quantity', e.target.quantity.value);
    formData.append('price', e.target.price.value);
    formData.append('image', e.target.image.files[0]);

    try {
      const authToken = localStorage.getItem('authToken');
      const response = await axiosInstance.post('http://localhost:8000/api/store', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${authToken}`,
        },
      });
      console.log('Success:', response.data);
      setModalOpen(false);
      fetchData();
      e.target.reset();
    } catch (error) {
      console.error('Error:', error);
    }
  };
  const handleDeleteProduct = (id) => {
    // Set the selected product ID
    setSelectedProductId(id);
    setShowDeleteModal(true);
  };
  const handleCloseDeleteModal = () => {
    setShowDeleteModal(false);
    setSelectedProductId(null); // Optionally reset the selected product ID
  };
  const handleConfirmDelete = async () => {
    try {
      const authToken = localStorage.getItem('authToken');

      if (selectedProductId) {
        const response = await axiosInstance.delete(`http://localhost:8000/api/inventory/${selectedProductId}`, {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        });

        if (response.status === 200) {
          // Successful delete, you can handle the response as needed.
          console.log('Item deleted successfully');
          await fetchData();
          handleCloseDeleteModal();
        } else {
          // Handle other status codes or errors as needed.
          console.error('Error:', response);
        }
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
  const handleCloseEditModal = () => {
    setEditingProduct(null);
    setIsEditModalOpen(false);
  };
  const handleEditProduct = (productData) => {
    // Set the selected product ID
    setProduct(productData);
    setShowEditModal(true);
    setIsImageFile(false);
  };
  const handleEditSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', product.name);
    formData.append('price', product.price);
    formData.append('quantity', product.quantity);
    formData.append('image', product.image || null);
    // Add the image file if it's selected
    if (product.image) {
      formData.append('image', product.image);
    } //

    try {
      const authToken = localStorage.getItem('authToken');
      const response = await axiosInstance.post(
        `http://localhost:8000/api/inventoryy/${product.id}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data', 
            Authorization: `Bearer ${authToken}`,
            'Accept': 'application/json',
          },
        }
      );
      fetchData();
      if (response.data) {
        console.log(response.data.message);
        setProduct(response.data.data);
        setShowEditModal(false);
      }
    } catch (error) {
      console.error("There was an error updating the product", error);
      console.error(error.response.data);
      console.log(product);
    }
  };










  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-semibold mb-4">Product Inventory</h1>

      <button
        onClick={() => {
          setModalOpen(true);
          // setEditMode(false);
          // setSelectedProductIndex(null);
          setProduct({
            name: '',
            image: null,
            price: '',
            available: true,
            variants: [],
            quantity: 0,
          });
        }}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4"
      >
        Add Product
      </button>
      <table className="table-auto w-full">
        {/* Table headers */}
        <thead>
          <tr>

            <th className="px-4 py-2">Product Name</th>
            <th className="px-4 py-2">Image</th>
            <th className="px-4 py-2">Price</th>
            <th className="px-4 py-2">Quantity</th>
            <th className="px-4 py-2">Available</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        {/* Table components */}
        <tbody>
          {data.map(item => (
            <tr key={item.id}>
              <td className="border px-4 py-2">{item.name}</td>
              <td className="border px-4 py-2"><img src={`http://localhost:8000/storage/products/${item.image}`} alt={item.productName} width="50" />

              </td>
              <td className="border px-4 py-2">{item.price}</td>
              <td className="border px-4 py-2">{item.quantity}</td>
              <td className="border px-4 py-2">{item.available ? "Yes" : "No"}</td>
              <td className="border px-4 py-2">  <button
                onClick={() => handleEditProduct(item)}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded"
              >
                Edit
              </button>
                <button
                  onClick={() => handleDeleteProduct(item.id)}
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 ml-2 rounded"
                >
                  Delete
                </button></td>
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
              <form onSubmit={handleFormSubmit} encType="multipart/form-data">
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  {/* Form content */}
                  <div className="mb-4">
                    <label
                      className="block text-gray-700 text-sm font-bold mb-2"
                      htmlFor="name"
                    >
                      Product Name
                    </label>
                    <input
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      id="name"
                      type="text"
                      placeholder="Product Name"
                      name="name"
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label
                      className="block text-gray-700 text-sm font-bold mb-2"
                      htmlFor="image"
                    >
                      Image
                    </label>
                    <input
                      type="file"
                      accept="image/*"
                      className="mb-2"
                      id="image"
                      name="image"
                      onChange={e => setProduct({ image: e.target.files[0] })}
                    />
                    {product.image && (
                      <img
                        src={URL.createObjectURL(product.image)}
                        alt={product.name}
                        className="mb-2 max-w-full"
                      />
                    )}
                  </div>
                  <div className="mb-4">
                    <label
                      className="block text-gray-700 text-sm font-bold mb-2"
                      htmlFor="price"
                    >
                      Price
                    </label>
                    <input
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      id="price"
                      type="text"
                      placeholder="Price"
                      name="price"
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label
                      className="block text-gray-700 text-sm font-bold mb-2"
                      htmlFor="quantity"
                    >
                      Quantity
                    </label>
                    <input
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      id="quantity"
                      type="number"
                      placeholder="Quantity"
                      name="quantity"
                      required
                    />
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
                    onClick={handleModalClose}
                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {showEditModal && (
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
              <form onSubmit={handleEditSubmit} encType="multipart/form-data">
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  {/* Form content */}
                  <div className="mb-4">
                    <label
                      className="block text-gray-700 text-sm font-bold mb-2"
                      htmlFor="name"
                    >
                      Product Name
                    </label>
                    <input
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      id="name"
                      type="text"
                      placeholder="Product Name"
                      name="name"
                      value={product.name}
                      onChange={e => setProduct(prevState => ({ ...prevState, name: e.target.value }))}
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label
                      className="block text-gray-700 text-sm font-bold mb-2"
                      htmlFor="image"
                    >
                      Image
                    </label>
                    <input
                      type="file"
                      accept="image/*"
                      className="mb-2"
                      id="image"
                      name="image"
                      onChange={(e) => {
                        e.stopPropagation();
                        setProduct({ ...product, image: e.target.files[0] });
                      }}
                    />

                    {product.image && isImageFile && (
                      <img
                        src={URL.createObjectURL(product.image)}
                        alt={product.name}
                        className="mb-2 max-w-full"
                      />
                    )}
                    {product.image && !isImageFile && (
                      <img
                        src={typeof product.image === 'string' ? `http://localhost:8000/storage/products/${product.image}` : URL.createObjectURL(product.image)}
                        alt={product.name}
                        className="mb-2 max-w-full"
                      />
                    )}
                  </div>
                  <div className="mb-4">
                    <label
                      className="block text-gray-700 text-sm font-bold mb-2"
                      htmlFor="price"
                    >
                      Price
                    </label>
                    <input
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      id="price"
                      type="text"
                      placeholder="Price"
                      name="price"
                      value={product.price}
                      onChange={e => setProduct(prevState => ({ ...prevState, price: e.target.value }))}
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label
                      className="block text-gray-700 text-sm font-bold mb-2"
                      htmlFor="quantity"
                    >
                      Quantity
                    </label>
                    <input
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      id="quantity"
                      type="number"
                      placeholder="Quantity"
                      name="quantity"
                      value={product.quantity}
                      onChange={e => setProduct(prevState => ({ ...prevState, quantity: e.target.value }))}
                      required
                    />
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
                    onClick={() => setShowEditModal(false)}
                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Delete confirmation dialog */}
      {showDeleteModal && (
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
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <p className="text-lg text-gray-700 font-semibold mb-4">
                  Are you sure you want to delete this product?
                </p>
                <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                  <button
                    onClick={handleConfirmDelete}
                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                  >
                    Yes, Delete
                  </button>
                  <button
                    onClick={() => setShowDeleteModal(false)}
                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}


      {/* Add confirmation dialog */}
      {addConfirmationOpen && (
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
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <p className="text-lg text-gray-700 font-semibold mb-4">
                  Product added successfully!
                </p>
                <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                  <button
                    onClick={() => setAddConfirmationOpen(false)}
                    className="w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:w-auto sm:text-sm"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductManagement;
