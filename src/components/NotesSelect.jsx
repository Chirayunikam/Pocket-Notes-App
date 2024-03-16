import React, { useState, useEffect } from "react";
import Modal from "./Modal";
import styles from "./NotesSelect.module.css";

export function getGroupInitials(name) {
  if (name == null) {
    throw new Error("Group name is null");
  }

  const initials = name
    .trim()
    .split(" ")
    .map((word) => {
      if (word == null) {
        throw new Error("Group name contains null word");
      }
      return word.charAt(0).toUpperCase();
    });

  return initials.join("");
}

const NotesSelect = ({ setSelectedGroup }) => {
  const [showModal, setShowModal] = useState(false);
  const [groups, setGroups] = useState([]);
  const [groupName, setGroupName] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedGroupState, setSelectedGroupState] = useState(null); // Updated state variable name
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const savedGroups = localStorage.getItem("groups");
    if (savedGroups) {
      setGroups(JSON.parse(savedGroups));
    }
  }, []);

  const addGroup = () => {
    const normalizedGroupName = groupName
      .trim()
      .replace(/\s/g, "")
      .toLowerCase();
    const groupExists = groups.some(
      (group) =>
        group.name.trim().replace(/\s/g, "").toLowerCase() ===
        normalizedGroupName
    );

    if (groupName.trim() && selectedColor && !groupExists) {
      const newGroup = { name: groupName, color: selectedColor };
      setGroups([...groups, newGroup]);
      localStorage.setItem("groups", JSON.stringify([...groups, newGroup]));
      setGroupName("");
      setSelectedColor("");
      setShowModal(false);
      // setSuccessMessage("Group created successfully!");
      setTimeout(() => setSuccessMessage(""), 3000);
    } else if (groupExists) {
      setErrorMessage("Group name already exists!");
      setTimeout(() => setErrorMessage(""), 3000);
    }
  };

  const handleChangeGroupName = (event) => setGroupName(event.target.value);

  const handleColorSelect = (color) => setSelectedColor(color);

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Pocket Notes</h1>
      {successMessage && <div>{successMessage}</div>}
      {errorMessage && (
        <div className={styles.errorMessage}>{errorMessage}</div>
      )}
      <div className={styles.groupContainer}>
        <div className={styles.groupWrapper}>
          {groups.map((group, index) => (
            <div
              key={index}
              className={`${styles.groupItem} ${
                selectedGroupState === group ? styles.selected : ""
              }`}
              onClick={() => {
                setSelectedGroup(group);
                setSelectedGroupState(group);
              }}
            >
              <div
                className={styles.groupCircle}
                style={{ backgroundColor: group.color }}
              >
                {getGroupInitials(group.name)}
              </div>
              <span className={styles.groupName}>{group.name}</span>
            </div>
          ))}
        </div>
      </div>
      <button className={styles.plus} onClick={() => setShowModal(true)}>
        +
      </button>
      {showModal && (
        <Modal
          setShowModal={setShowModal}
          addGroup={addGroup}
          groupName={groupName}
          selectedColor={selectedColor}
          handleChangeGroupName={handleChangeGroupName}
          handleColorSelect={handleColorSelect}
        />
      )}
    </div>
  );
};

export default NotesSelect;
