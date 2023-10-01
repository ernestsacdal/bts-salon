import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProductManagement = () => {
  const [products, setProducts] = useState([]);
  const [product, setProduct] = useState({
    name: '',
    image: null,
    price: '',
    available: true,
    variants: [],
    quantity: 0,
  });

  const [modalOpen, setModalOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [selectedProductIndex, setSelectedProductIndex] = useState(null);

  // State variables for confirmation dialogs
  const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);
  const [updateConfirmationOpen, setUpdateConfirmationOpen] = useState(false);
  const [addConfirmationOpen, setAddConfirmationOpen] = useState(false);

  useEffect(() => {
    // Fetch products from your API when the component mounts
    axios
      .get('YOUR_API_ENDPOINT/products')
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.error('Error fetching products:', error);
      });
  }, []); // Empty dependency array ensures this effect runs once

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleImageChange = (e) => {
    const imageFile = e.target.files[0];
    setProduct({ ...product, image: imageFile });
  };

  const handleAddProduct = () => {
    // Send a POST request to add a new product to your API
    axios
      .post('YOUR_API_ENDPOINT/products', product)
      .then((response) => {
        setProducts([...products, response.data]);
        setProduct({
          name: '',
          image: null,
          price: '',
          available: true,
          variants: [],
          quantity: 0,
        });
        setModalOpen(false);
        setAddConfirmationOpen(true);
      })
      .catch((error) => {
        console.error('Error adding product:', error);
      });
  };

  const handleEditProduct = (index) => {
    setEditMode(true);
    setSelectedProductIndex(index);
    setProduct(products[index]);
    setModalOpen(true);
  };

  const handleDeleteProduct = (index) => {
    // Open the delete confirmation dialog
    setDeleteConfirmationOpen(true);
    setSelectedProductIndex(index);
  };

  const handleUpdateProduct = () => {
    // Send a PUT request to update the selected product in your API
    axios
      .put(`YOUR_API_ENDPOINT/products/${products[selectedProductIndex].id}`, product)
      .then((response) => {
        const updatedProducts = [...products];
        updatedProducts[selectedProductIndex] = response.data;
        setProducts(updatedProducts);
        setUpdateConfirmationOpen(false);
      })
      .catch((error) => {
        console.error('Error updating product:', error);
      });
  };

  const handleConfirmDelete = () => {
    // Send a DELETE request to remove the selected product from your API
    axios
      .delete(`YOUR_API_ENDPOINT/products/${products[selectedProductIndex].id}`)
      .then(() => {
        const updatedProducts = [...products];
        updatedProducts.splice(selectedProductIndex, 1);
        setProducts(updatedProducts);
        setDeleteConfirmationOpen(false);
      })
      .catch((error) => {
        console.error('Error deleting product:', error);
      });
  };

  const handleModalClose = () => {
    // Close the modal and reset state
    setModalOpen(false);
    setEditMode(false);
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

  const handleFormSubmit = () => {
    if (editMode) {
      // Open the update confirmation dialog when editing
      setUpdateConfirmationOpen(true);
    } else {
      // Handle add logic here
      handleAddProduct();
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-semibold mb-4">Product Inventory</h1>

      <button
        onClick={() => {
          setModalOpen(true);
          setEditMode(false);
          setSelectedProductIndex(null);
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

      {/* Table to display products */}
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
          {products.map((p, index) => (
            <tr key={index}>
              <td className="border px-4 py-2">{p.name}</td>
              <td className="border px-4 py-2">
                {p.image && (
                  <img
                    src={URL.createObjectURL(p.image)}
                    alt={p.name}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                )}
              </td>
              <td className="border px-4 py-2">{p.price}</td>
              <td className="border px-4 py-2">{p.quantity}</td>
              <td className="border px-4 py-2">
                {p.available ? 'Yes' : 'No'}
              </td>
              <td className="border px-4 py-2">
                <button
                  onClick={() => handleEditProduct(index)}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteProduct(index)}
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 ml-2 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal for adding/editing products */}
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
                      onChange={handleInputChange}
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
                      onChange={handleImageChange}
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
                      value={product.price}
                      onChange={handleInputChange}
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
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label
                      className="block text-gray-700 text-sm font-bold mb-2"
                      htmlFor="available"
                    >
                      Available
                    </label>
                    <select
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      id="available"
                      name="available"
                      value={product.available}
                      onChange={handleInputChange}
                    >
                      <option value="true">Yes</option>
                      <option value="false">No</option>
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

      {/* Delete confirmation dialog */}
      {deleteConfirmationOpen && (
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
                    onClick={() => setDeleteConfirmationOpen(false)}
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

      {/* Update confirmation dialog */}
      {updateConfirmationOpen && (
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
                  Are you sure you want to update this product?
                </p>
                <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                  <button
                    onClick={handleConfirmUpdate}
                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
                  >
                    Yes, Update
                  </button>
                  <button
                    onClick={() => setUpdateConfirmationOpen(false)}
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
