import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Calendar from "../components/calendar";

const Homepage = () => {
  const [currentTime, setCurrentTime] = useState("");
  const [currentDate, setCurrentDate] = useState("");

  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();
      const hours = now.getHours().toString().padStart(2, "0");
      const minutes = now.getMinutes().toString().padStart(2, "0");
      const timeString = `${hours}:${minutes}`;
      const options = { day: "numeric", month: "long" };
      const dateString = now.toLocaleDateString("ru-RU", options);
      setCurrentTime(`Прямо сейчас в ${timeString}`);
      setCurrentDate(`Сегодня ${dateString}`);
    };

    const intervalId = setInterval(updateDateTime, 60000);

    updateDateTime();

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="home">
      <div className="home__menu">
        <h1>Хотите сделать запись о своих эмоциях?</h1>
        <div className="home__navigate">
          <Link to="/page1" className="home__navigate-button button-home">
            {currentTime}
          </Link>
          <Link to="/page1" className="home__navigate-button button-home">
            {currentDate}
          </Link>
        </div>
      </div>
      <div className="home__calendar">
        <Calendar />
      </div>
    </div>
  );
};

export default Homepage;
