window.onload = function() {
    var backgroundColor = localStorage.getItem('backgroundColor');
    var buttonColor = localStorage.getItem('buttonColor');
    var feelingText = localStorage.getItem('feelingText');
    if (backgroundColor && buttonColor && feelingText) {
        document.body.style.backgroundImage = backgroundColor;
        document.body.style.color = 'white';  // Меняем цвет текста на белый
        var buttons = document.querySelectorAll('.button:not(.home)');
        buttons.forEach(function(button) {
            button.style.backgroundColor = buttonColor;
            button.style.color = 'white';  // Меняем цвет текста кнопок на белый
        });
        var heading = document.querySelector('h2');
        if (heading) {
            heading.textContent = feelingText;
        }
    }
};
