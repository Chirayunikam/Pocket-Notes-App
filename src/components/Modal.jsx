import React from "react";
import { useEffect, useRef } from "react";
import styles from "./Modal.module.css";

const Modal = ({
  setShowModal,
  addGroup,
  groupName,
  selectedColor,
  handleChangeGroupName,
  handleColorSelect,
}) => {
  const colors = [
    "#0047FF",
    "#43E6FC",
    "#6691FF",
    "#B38BFA",
    "#F19576",
    "#FF79F2",
  ];
  const modalRef = useRef();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setShowModal(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setShowModal]);

  const handleSubmit = (event) => {
    event.preventDefault();
    addGroup();
  };

  return (
    <div className={styles.modal}>
      <form onSubmit={handleSubmit} ref={modalRef}>
        <h2 className={styles.heading}>Create new group</h2>
        <label htmlFor="group-name" className={styles.groupName}>
          Group Name
        </label>
        <input
          type="text"
          id="group-name"
          value={groupName}
          onChange={handleChangeGroupName}
          className={styles.inputGroup}
          placeholder="Enter group name"
          autoComplete="off"
        />
        <div className={styles.colorContainer}>
          <label htmlFor="group-color" className={styles.groupColor}>
            Choose Color
          </label>
          <div className={styles.colorPalette}>
            {colors.map((color) => (
              <div
                key={color}
                className={`${styles.colorCircle} ${
                  selectedColor === color ? styles.selected : ""
                }`}
                style={{ backgroundColor: color }}
                onClick={() => handleColorSelect(color)}
              />
            ))}
          </div>
        </div>
        <button type="submit" className={styles.createBtn}>
          Create
        </button>
      </form>
    </div>
  );
};

export default Modal;
