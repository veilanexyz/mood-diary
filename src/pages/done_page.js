import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { updateStyles } from '../services/updateStyles';

const DonePage = () => {
  const navigate = useNavigate();

  const resetStyles = () => {
    document.body.style.backgroundImage = '';
    localStorage.removeItem('backgroundColor');
    localStorage.removeItem('feelingsValue');

    // Clear checkbox selections for Page2 and Page3
    const emotions = [
      'злость', 'тревожность', 'страх', 'переизбыток чувств', 'стыд', 'отвращение', 'неловкость', 'негодование', 'раздражение', 'зависть',
      'стресс', 'беспокойство', 'вина', 'удивление', 'безнадежность', 'раздраженность', 'одиночество', 'уныние', 'разочарование', 'измотанность', 'грусть',
      'удовлетворенность', 'покой', 'умиротворение', 'безразличие', 'измотанность', 'изумление', 'волнение', 'удивление', 'энтузиазм', 'счастье', 'радость',
      'храбрость', 'гордость', 'уверенность', 'надежда', 'веселье', 'удовлетворение'
    ];

    emotions.forEach(emotion => {
      localStorage.removeItem(emotion.toLowerCase());
    });

    const reasons = [
      'reason_1', 'reason_2', 'reason_3', 'reason_4', 'reason_5', 'reason_6', 'reason_7', 'reason_8', 'reason_9', 'reason_10',
      'reason_11', 'reason_12', 'reason_13', 'reason_14', 'reason_15', 'reason_16', 'reason_17'
    ];

    reasons.forEach(reason => {
      localStorage.removeItem(reason);
    });
  };

  useEffect(() => {
    const feelingValue = localStorage.getItem('feelingsValue');
    updateStyles(feelingValue, true, false);
    const timer = setTimeout(() => {
      resetStyles();
      navigate('/');
    }, 2000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="checkmark">
      <svg width="84" height="88" viewBox="0 0 84 88" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M4 44.4412L33.7459 81L80 4" stroke="white" strokeWidth="8" strokeLinecap="round"/>
      </svg>
    </div>
  );
};

export default DonePage;
