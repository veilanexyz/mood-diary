import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Calendar from "../Components/calendar";

const Homepage = ({assistant}) => {
  const [currentTime, setCurrentTime] = useState("");
  const [currentDate, setCurrentDate] = useState("");
  const navigate = useNavigate();

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

  useEffect(() => {
    if (assistant) {
      assistant.on('data', (event) => {
        const { action } = event;
        if (action?.type === 'save_mood_period') {
          console.log('save_mood_period', action);
          navigate('/page2');
        }
      });
    }
  }, [assistant, navigate]);
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
