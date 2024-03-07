import { useState } from "react";
import "./Person.scss";
import Modal from "./Modal";

const Person = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [persons, setPersons] = useState([
    {
      id: 1,
      firstName: "John",
      lastName: "Doe",
      phone: "13242424",
      gender: "Male",
      favorite: "Like",
    },
    {
      id: 2,
      firstName: "Jane",
      lastName: "Doe",
      phone: "13242424",
      gender: "Female",
      favorite: "Like",
    },
  ]);
  const [editingPerson, setEditingPerson] = useState(null);
  const [search, setSearch] = useState("");

  const handleChangeSearch = (e) => {
    setSearch(e.target.value);
  };

  const filteredPersons = persons.filter((person) => {
    return (
      person.firstName.toLowerCase().includes(search.toLowerCase()) ||
      person?.lastName.toLowerCase().includes(search.toLowerCase()) ||
      person?.phone.toLowerCase().includes(search.toLowerCase()) ||
      person?.gender.toLowerCase().includes(search.toLowerCase()) ||
      person?.favorite.toLowerCase().includes(search.toLowerCase())
    );
  });
  const handleChangeSearched = (e) => {
    const gender = e.target.value;
    const filtered = persons.filter((person) => person.gender === gender);
    setPersons(filtered);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingPerson(null);
  };

  const handleEdit = (person) => {
    setEditingPerson(person);
    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    setPersons(persons.filter((person) => person.id !== id));
  };

  const handleSave = (editedPerson) => {
    if (editingPerson) {
      setPersons(
        persons.map((person) =>
          person.id === editedPerson.id ? editedPerson : person
        )
      );
    } else {
      setPersons([...persons, { ...editedPerson, id: persons.length + 1 }]);
    }
    setIsModalOpen(false);
    setEditingPerson(null);
  };

  return (
    <>
      <div className="container">
        <div className="head">
          <input
            type="search"
            value={search}
            onChange={handleChangeSearch}
            id="search"
            placeholder="Enter whatever you want to search !!!"
          />
          <select name="select" id="select" onChange={handleChangeSearched}>
            <option value="gender">Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>

          <button onClick={openModal}>Add +</button>
        </div>

        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>FirstName</th>
              <th>LastName</th>
              <th>Phone</th>
              <th>Gender</th>
              <th>Favorite</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredPersons.map((person) => (
              <tr key={person.id}>
                <td>{person.id}</td>
                <td>{person.firstName}</td>
                <td>{person.lastName}</td>
                <td>{person.phone}</td>
                <td>{person.gender}</td>
                <td>{person.favorite}</td>
                <td>
                  <button className="btn1" onClick={() => handleEdit(person)}>
                    Edit
                  </button>
                  <button
                    className="btn2"
                    onClick={() => handleDelete(person.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {isModalOpen && (
        <Modal
          closeModal={closeModal}
          editingPerson={editingPerson}
          onSave={handleSave}
        />
      )}
    </>
  );
};

export default Person;
