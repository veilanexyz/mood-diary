window.onload = function() {
    var currentValue = localStorage.getItem('feelingsValue') || 3;
    document.querySelector('input[name="scale"]').value = currentValue;
    changeBackgroundColor(currentValue);
};

function changeBackgroundColor(value) {
    var colors = [
        'linear-gradient(to bottom left, #DED7FF, #71699E)', 
        'linear-gradient(to bottom left, #D3DBF8, #6E7BAA)', 
        'linear-gradient(to bottom left, #DBE5F5, #A2BAE0)', 
        'linear-gradient(to bottom left, #D7F0F4, #BED3D6)', 
        'linear-gradient(to bottom left, #E8F5D4, #B2CA8E)', 
        'linear-gradient(to bottom left, #FFF0DB, #FFCA86)', 
        'linear-gradient(to bottom left, #FFDEB1, #FFB85B)'
    ];

    var buttonColors = [
        '#2D167E', 
        '#0939C1', 
        '#0061BF', 
        '#3B9DB8', 
        '#87CC31', 
        '#EF9300', 
        '#FD7632'
    ];
    
    var feelingTexts = [
        'Очень неприятные', 
        'Неприятные', 
        'Почти неприятные', 
        'Нейтральные', 
        'Почти приятные', 
        'Приятные', 
        'Очень приятные'
    ];

    var roundedValue = Math.floor(value);
    document.body.style.backgroundImage = colors[roundedValue];
    document.querySelector('h2').textContent = feelingTexts[roundedValue];
    localStorage.setItem('backgroundColor', colors[roundedValue]);
    localStorage.setItem('buttonColor', buttonColors[roundedValue]);
    localStorage.setItem('feelingText', feelingTexts[roundedValue]);
    localStorage.setItem('feelingsValue', value);

    var buttons = document.querySelectorAll('.button:not(.home)');
    buttons.forEach(function(button) {
        button.style.backgroundColor = buttonColors[roundedValue];
        button.style.color = 'white';
    });
    var rangeInput = document.querySelector('input[type="range"]');
    rangeInput.style.setProperty('--thumb-color', buttonColors[roundedValue]);
}