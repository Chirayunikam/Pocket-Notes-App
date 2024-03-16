import React, { useState, useEffect } from "react";
import NotesSelect, { getGroupInitials } from "./NotesSelect";
import CreateNote from "./CreateNote";
import notes from "../assets/notes.png";
import lock from "../assets/lock.png";
import styles from "./Home.module.css";

const Home = () => {
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleGroupSelect = (group) => {
    setSelectedGroup(group);
  };

  return (
    <div className={styles.main}>
      {isSmallScreen ? (
        <div className={styles.fullscreen}>
          {selectedGroup ? (
            <CreateNote
              group={selectedGroup}
              getGroupInitials={getGroupInitials}
              setSelectedGroup={setSelectedGroup}
            />
          ) : (
            <NotesSelect
              setSelectedGroup={handleGroupSelect}
              isSmallScreen={isSmallScreen}
            />
          )}
        </div>
      ) : (
        <>
          <div className={styles.left}>
            <NotesSelect setSelectedGroup={setSelectedGroup} />
          </div>
          <div className={styles.right}>
            {selectedGroup ? (
              <CreateNote
                group={selectedGroup}
                getGroupInitials={getGroupInitials}
                setSelectedGroup={setSelectedGroup}
              />
            ) : (
              <>
                <div className={styles.description}>
                  <img src={notes} alt="notes" />
                  <h2>Pocket Notes</h2>
                  <p>
                    Send and receive messages without keeping your phone online.
                    <br />
                    Use Pocket Notes on up to 4 linked devices and 1 mobile
                    phone
                  </p>
                </div>
                <div className={styles["encryption-note"]}>
                  <img src={lock} alt="lock" />
                  End-to-End encrypted
                </div>
              </>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Home;
