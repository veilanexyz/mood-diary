export const updateStyles = (value, updateBackground = true, updateText = true) => {
    const colors = [
        'linear-gradient(to bottom left, #DED7FF, #71699E)',
        'linear-gradient(to bottom left, #D3DBF8, #6E7BAA)',
        'linear-gradient(to bottom left, #DBE5F5, #A2BAE0)',
        'linear-gradient(to bottom left, #D7F0F4, #BED3D6)',
        'linear-gradient(to bottom left, #E8F5D4, #B2CA8E)',
        'linear-gradient(to bottom left, #FFF0DB, #FFCA86)',
        'linear-gradient(to bottom left, #FFDEB1, #FFB85B)'
    ];
  
    const buttonColors = [
        '#2D167E',
        '#0939C1',
        '#0061BF',
        '#3B9DB8',
        '#87CC31',
        '#EF9300',
        '#FD7632'
    ];
  
    const feelingTexts = [
        'Очень неприятные',
        'Неприятные',
        'Почти неприятные',
        'Нейтральные',
        'Почти приятные',
        'Приятные',
        'Очень приятные'
    ];
  
    const roundedValue = Math.floor(value);
    
    if (updateBackground) {
      document.body.style.backgroundImage = colors[roundedValue];
      localStorage.setItem('backgroundColor', colors[roundedValue]);
      localStorage.setItem('buttonColor', buttonColors[roundedValue]);
    }
    
    if (updateText) {
      const feelingTextElement = document.querySelector('h2');
      if (feelingTextElement) {
        feelingTextElement.textContent = feelingTexts[roundedValue];
        localStorage.setItem('feelingText', feelingTexts[roundedValue]);
      }
    }
    
    localStorage.setItem('feelingsValue', value);
  
    const buttons = document.querySelectorAll('.button-navigate');
    buttons.forEach((button) => {
        button.style.backgroundColor = buttonColors[roundedValue];
        button.style.color = 'white';
    });
  };
  