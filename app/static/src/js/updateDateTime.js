function updateDateTime() {
    // Get the current date and time
    const now = new Date();
    
    // Format the time as HH:MM
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const timeString = `${hours}:${minutes}`;

    // Format the date as D MMMM
    const options = { day: 'numeric', month: 'long' };
    const dateString = now.toLocaleDateString('ru-RU', options);

    // Update the link texts
    document.getElementById('current-time').textContent = `Прямо сейчас в ${timeString}`;
    document.getElementById('current-date').textContent = `Сегодня ${dateString}`;
}

// Ensure the function runs after the page loads
window.onload = updateDateTime;