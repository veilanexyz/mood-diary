import React from 'react';
import { Link } from 'react-router-dom';
import { updateStyles } from './updateStyles';

class Page1 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      feelingsValue: this.getInitialFeelingsValue()
    };
  }

  componentDidMount() {
    this.updateStyles(this.state.feelingsValue); // Вызываем утилитную функцию при монтировании компонента
  }

  getInitialFeelingsValue = () => {
    const savedValue = localStorage.getItem('feelingsValue');
    return savedValue ? parseFloat(savedValue) : 3;
  };

  updateStyles = (value) => {
    updateStyles(value, true, true);; // Вызываем утилитную функцию для обновления стилей
  };

  handleRangeChange = (event) => {
    const value = event.target.value;
    this.setState({ feelingsValue: value }, () => {
      this.updateStyles(value); // Вызываем утилитную функцию для обновления стилей
      localStorage.setItem('feelingsValue', value); // Сохраняем значение слайдера в локальное хранилище
    });
  };

  // Функция для сброса стилей
  resetStyles = () => {
    // Сброс стилей
    document.body.style.backgroundImage = '';
    document.querySelector('h2').textContent = '';
    localStorage.removeItem('backgroundColor');
    localStorage.removeItem('buttonColor');
    localStorage.removeItem('feelingText');
    localStorage.removeItem('feelingsValue');
    const buttons = document.querySelectorAll('.button-navigate');
    buttons.forEach((button) => {
      button.style.backgroundColor = '';
      button.style.color = '';
    });
  };

  render() {
    return (
      <div className="feeling-selection">
        <h1>Как бы вы описали свои ощущения?</h1>
        <h2>Feeling</h2>
        <div className="feeling-selection__scale">
          <input
            name="scale"
            type="range"
            value={this.state.feelingsValue}
            min="0"
            max="6"
            step="0.25"
            onInput={this.handleRangeChange}
          />
          <div className="feeling-selection__scale-labels">
            <span>Очень неприятные</span>
            <span>Очень приятные</span>
          </div>
        </div>
        <div className="feeling-selection__navigate navigate">
          {/* Добавляем обработчик событий для ссылки "Назад" */}
          <Link to="/" className="feeling-selection__navigate-button button-navigate" onClick={this.resetStyles}>Назад</Link>
          <Link to="/page2" className="feeling-selection__navigate-button button-navigate">Далее</Link>
        </div>
      </div>
    );
  }
}

export default Page1;
