import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { updateStyles } from '../services/updateStyles';

const Page2 = ({assistant}) => {
   const navigate = useNavigate();
  useEffect(() => {
    const emotionsContainer = document.getElementsByClassName('emotion-selector__checkbox')[0];
    const feelingValue = localStorage.getItem('feelingsValue');

    const emotions = {
      unpleasant: ['Злость', 'Тревожность', 'Страх', 'Переизбыток чувств', 'Стыд', 'Отвращение', 'Неловкость', 'Негодование', 'Раздражение', 'Зависть', 'Стресс', 'Беспокойство', 'Вина', 'Удивление', 'Безнадежность', 'Раздраженность', 'Одиночество', 'Уныние', 'Разочарование', 'Измотанность', 'Грусть'],
      neutral: ['Удовлетворенность', 'Покой', 'Умиротворение', 'Безразличие', 'Измотанность'],
      pleasant: ['Изумление', 'Волнение', 'Удивление', 'Энтузиазм', 'Счастье', 'Радость', 'Храбрость', 'Гордость', 'Уверенность', 'Надежда', 'Веселье', 'Удовлетворение', 'Покой', 'Умиротворение']
    };

    let selectedEmotions;
    if (feelingValue < 3) {
      selectedEmotions = emotions.unpleasant;
    } else if (feelingValue === 3) {
      selectedEmotions = emotions.neutral;
    } else {
      selectedEmotions = emotions.pleasant;
    }

    emotionsContainer.innerHTML = '';
    selectedEmotions.forEach(emotion => {
      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.id = emotion.toLowerCase();
      checkbox.className = 'checkbox';
      checkbox.checked = localStorage.getItem(emotion.toLowerCase()) === 'true';

      const label = document.createElement('label');
      label.htmlFor = emotion.toLowerCase();
      label.className = 'checkbox__label';
      label.textContent = emotion;

      checkbox.addEventListener('change', () => {
        localStorage.setItem(emotion.toLowerCase(), checkbox.checked);
      });

      emotionsContainer.appendChild(checkbox);
      emotionsContainer.appendChild(label);
    });

    updateStyles(feelingValue, true, true);
  }, []);
  
  useEffect(() => {
    if (assistant) {
      assistant.on('data', (event) => {
        const { action } = event;
        if (action?.type === 'save_feeling_description') {
          console.log('save_feeling_description', action);
          const emotions = action.emotions || [];
          emotions.forEach(emotion => {
            localStorage.setItem(emotion.toLowerCase(), true);
          });
          navigate('/page3');
        }
      });
    }
  }, [assistant, navigate]);

  const handleBackClick = () => {
    const feelingValue = localStorage.getItem('feelingsValue');
    const emotions = {
      unpleasant: ['Злость', 'Тревожность', 'Страх', 'Переизбыток чувств', 'Стыд', 'Отвращение', 'Неловкость', 'Негодование', 'Раздражение', 'Зависть', 'Стресс', 'Беспокойство', 'Вина', 'Удивление', 'Безнадежность', 'Раздраженность', 'Одиночество', 'Уныние', 'Разочарование', 'Измотанность', 'Грусть'],
      neutral: ['Удовлетворенность', 'Покой', 'Умиротворение', 'Безразличие', 'Измотанность'],
      pleasant: ['Изумление', 'Волнение', 'Удивление', 'Энтузиазм', 'Счастье', 'Радость', 'Храбрость', 'Гордость', 'Уверенность', 'Надежда', 'Веселье', 'Удовлетворение', 'Покой', 'Умиротворение']
    };

    let selectedEmotions;
    if (feelingValue < 3) {
      selectedEmotions = emotions.unpleasant;
    } else if (feelingValue === 3) {
      selectedEmotions = emotions.neutral;
    } else {
      selectedEmotions = emotions.pleasant;
    }

    selectedEmotions.forEach(emotion => {
      localStorage.removeItem(emotion.toLowerCase());
    });
  };

  return (
    <div className="emotion-selector">
      <h1>Как бы вы это чувство описали?</h1>
      <h2>Feeling</h2>
      <div className="emotion-selector__checkbox checkbox"></div>
      <input className="emotion-selector__text-input text-input" type="text" name="feelings" placeholder="Можете описать здесь своими словами" />
      <div className="emotion-selector__navigate">
        <Link to="/page1" className="emotion-selector__navigate button-navigate" onClick={handleBackClick}>Назад</Link>
        <Link to="/page3" className="emotion-selector__navigate button-navigate">Далее</Link>
      </div>
    </div>
  );
};

export default Page2;
