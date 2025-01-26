import { useState } from 'react';
import axios from 'axios';

const Headers = () => {
  // State to control visibility of the complaint form modal
  const [isModalOpen, setIsModalOpen] = useState(false);

  // State to manage the file input
  const [file, setFile] = useState(null);

  // State for form fields and validation
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [errors, setErrors] = useState({ title: '', description: '' });

  // Function to open the modal when the button is clicked
  const HandleComplaints = () => {
    setIsModalOpen(true);
  };

  // Function to close the modal
  const closeModal = () => {
    setIsModalOpen(false);
  };

  // Function to handle file selection
  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0]; // Get the selected file
    setFile(selectedFile);
  };

  // Function to handle form submission with validation
  const handleSubmit = async (event) => {
    console.log("event", event)
    event.preventDefault();

    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    if (file) {
      console.log("file", file)
      formData.append('attachment', file); // Change 'file' to 'attachment'
    }
    console.log(formData)

    try {
      const token = localStorage.getItem('token'); // Retrieve token stored after login
      console.log('Token from frontend:', token);

      await axios.post(
        'http://localhost:3000/api/v1/complaint/create',
        formData,
        {
          withCredentials: true,
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`, // Include token in Authorization header
          },
        }
      );



      setTitle('');
      setDescription('');
      setFile(null);
      closeModal();
      alert('Complaint submitted successfully');
    } catch (err) {
      console.error('Error occurred while submitting the form:', err.response.data.error);
      alert('Failed to submit the complaint. Please try again.');
    }
  };



  // Clear the error message on input change
  const handleTitleChange = (e) => {
    setTitle(e.target.value);
    if (e.target.value !== '') {
      setErrors((prevErrors) => ({ ...prevErrors, title: '' }));
    }
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
    if (e.target.value !== '') {
      setErrors((prevErrors) => ({ ...prevErrors, description: '' }));
    }
  };

  return (
    <header className="bg-gray-700 text-white p-4 mx-[4%] rounded-lg shadow-md w-[calc(100%-3rem)] overflow-hidden">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold mx-[18%]">User Dashboard</h2>
        <div className="flex items-center space-x-4">
          <button
            className="bg-blue-500 px-4 mx-[140px] py-2 rounded hover:bg-blue-600"
            onClick={HandleComplaints}
          >
            New Complaint
          </button>
        </div>
      </div>

      {/* Modal for the complaint form */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg w-1/3">
            <h2 className="text-xl font-semibold mb-4">Complaint Form</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700">Complaint Title</label>
                <input
                  type="text"
                  className="w-full p-2 text-black border border-gray-300 rounded"
                  placeholder="Enter complaint title"
                  value={title}
                  onChange={handleTitleChange} // Bind title value to state
                />
                {errors.title && <p className="text-red-500 text-sm">{errors.title}</p>}
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Complaint Description</label>
                <textarea
                  className="w-full p-2 border text-black border-gray-300 rounded"
                  rows="4"
                  placeholder="Enter complaint description"
                  value={description}
                  onChange={handleDescriptionChange} // Bind description value to state
                />
                {errors.description && (
                  <p className="text-red-500 text-sm">{errors.description}</p>
                )}
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Attach File</label>
                <input
                  type="file"
                  className="w-full p-2 border border-gray-300 rounded"
                  onChange={handleFileChange} // Handle file change
                />
                {file && (
                  <div className="mt-2 text-sm text-gray-600">
                    <p>Selected File: {file.name}</p>
                  </div>
                )}
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  className="bg-gray-400 px-4 py-2 rounded mr-2"
                  onClick={closeModal}
                >
                  Close
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 px-4 py-2 rounded text-white"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </header>
  );
};

export default Headers;
