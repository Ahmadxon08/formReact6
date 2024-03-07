/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import "./Modal.scss";
const close ='./assets/close.png'

const Modal = ({ closeModal, onSave, editingPerson }) => {
  const [formData, setFormData] = useState({
    id: null,
    firstName: "",
    lastName: "",
    phone: "",
    gender: "",
    favorite: "",
  });

  useEffect(() => {
    if (editingPerson) {
      setFormData(editingPerson);
    } else {
      setFormData({
        id: null,
        firstName: "",
        lastName: "",
        phone: "",
        gender: "",
        favorite: "",
      });
    }
  }, [editingPerson]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
    closeModal();
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <div className="head">
          <h1>{editingPerson ? "Edit" : "Add"} Personal Information</h1>
          <button onClick={closeModal} id="closeModal">
            <img src={close}  alt="close" />
          </button>
        </div>
        <div className="line"></div>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>First Name</label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Last Name</label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Phone number</label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Gender</label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              required
            >
              <option value="">Select gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>
          <div className="form-group">
            <label>Favorite</label>
            <input
              type="text"
              name="favorite"
              value={formData.favorite}
              onChange={handleChange}
              required
            />
          </div>
          <div className="line"></div>
          <div className="form-btn">
            <button className="btn11" type="button" onClick={closeModal}>
              Cancel
            </button>
            <button className="btn22" type="submit">
              {editingPerson ? "Update" : "Add"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Modal;
