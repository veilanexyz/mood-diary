document.addEventListener('DOMContentLoaded', function() {
    var emotionsContainer = document.getElementById('emotionsContainer');
    var feelingValue = localStorage.getItem('feelingsValue');

    var emotions = {
        unpleasant: ['Злость', 'Тревожность', 'Страх', 'Переизбыток чувств', 'Стыд', 'Отвращение', 'Неловкость', 'Негодование', 'Раздражение', 'Зависть', 'Стресс', 'Беспокойство', 'Вина', 'Удивление', 'Безнадежность', 'Раздраженность', 'Одиночество', 'Уныние', 'Разочарование', 'Измотанность', 'Грусть'],
        neutral: ['Удовлетворенность', 'Покой', 'Умиротворение', 'Безразличие', 'Измотанность'],
        pleasant: ['Изумление', 'Волнение', 'Удивление', 'Энтузиазм', 'Счастье', 'Радость', 'Храбрость', 'Гордость', 'Уверенность', 'Надежда', 'Веселье', 'Удовлетворение', 'Покой', 'Умиротворение']
    };

    var selectedEmotions;
    if (feelingValue < 3) {
        selectedEmotions = emotions.unpleasant;
    } else if (feelingValue == 3) {
        selectedEmotions = emotions.neutral;
    } else {
        selectedEmotions = emotions.pleasant;
    }

    emotionsContainer.innerHTML = '';
    selectedEmotions.forEach(function(emotion) {
        var checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.id = emotion.toLowerCase();
        checkbox.className = 'emotion-checkbox';

        var label = document.createElement('label');
        label.htmlFor = emotion.toLowerCase();
        label.className = 'emotion-button';
        label.textContent = emotion;

        emotionsContainer.appendChild(checkbox);
        emotionsContainer.appendChild(label);
        
    });
});
