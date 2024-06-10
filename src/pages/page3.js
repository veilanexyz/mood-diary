import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { updateStyles } from "../services/updateStyles";

const reasons = [
  { id: "reason_1", label: "Здоровье" },
  { id: "reason_2", label: "Фитнес" },
  { id: "reason_3", label: "Забота о себе" },
  { id: "reason_4", label: "Хобби и увлечения" },
  { id: "reason_6", label: "Духовная жизнь" },
  { id: "reason_5", label: "Личность и самоопределение" },
  { id: "reason_7", label: "Сообщество" },
  { id: "reason_8", label: "Друзья" },
  { id: "reason_9", label: "Партнер" },
  { id: "reason_10", label: "Свидания и личная жизнь" },
  { id: "reason_11", label: "Задачи" },
  { id: "reason_12", label: "Работа" },
  { id: "reason_13", label: "Образование" },
  { id: "reason_14", label: "Путешествия" },
  { id: "reason_15", label: "Погода" },
  { id: "reason_16", label: "Текущие события" },
  { id: "reason_17", label: "Деньги" },
];

const Page3 = () => {
  const navigate = useNavigate();

  const [checkedState, setCheckedState] = useState(
    reasons.reduce((acc, reason) => {
      acc[reason.id] = localStorage.getItem(reason.id) === "true";
      return acc;
    }, {})
  );

  useEffect(() => {
    const feelingValue = localStorage.getItem("feelingsValue");
    updateStyles(feelingValue, true, true);

    reasons.forEach((reason) => {
      const savedState = localStorage.getItem(reason.id) === "true";
      setCheckedState((prevState) => ({
        ...prevState,
        [reason.id]: savedState,
      }));
    });
  }, []);

  const handleCheckboxChange = (id) => {
    setCheckedState((prevState) => {
      const newState = !prevState[id];
      localStorage.setItem(id, newState);
      return { ...prevState, [id]: newState };
    });
  };

  const handleBackClick = () => {
    reasons.forEach((reason) => {
      localStorage.removeItem(reason.id);
    });
    setCheckedState(
      reasons.reduce((acc, reason) => {
        acc[reason.id] = false;
        return acc;
      }, {})
    );
  };

  const handleNextClick = () => {
    navigate("/done_page");
  };

  return (
    <div className="reason-selector">
      <h1>Что оказывает наибольшее влияние?</h1>
      <h2>Feeling</h2>
      <div className="reason-selector__checkbox checkbox">
        {reasons.map((reason) => (
          <React.Fragment key={reason.id}>
            <input
              type="checkbox"
              id={reason.id}
              checked={checkedState[reason.id] || false}
              onChange={() => handleCheckboxChange(reason.id)}
            />
            <label htmlFor={reason.id}>{reason.label}</label>
          </React.Fragment>
        ))}
      </div>
      <input
        type="text"
        className="reason-selector__text-input text-input"
        name="feelings"
        placeholder="Можете описать здесь своими словами"
      />
      <div className="reason-selector__navigate">
        <Link
          to="/page2"
          className="reason-selector__navigate button-navigate"
          onClick={handleBackClick}
        >
          Назад
        </Link>
        <button
          onClick={handleNextClick}
          className="reason-selector__navigate button-navigate"
        >
          Далее
        </button>
      </div>
    </div>
  );
};

export default Page3;
