document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('mood-form');
    const entriesList = document.getElementById('entries-list');

    form.addEventListener('submit', async function(event) {
        event.preventDefault();
        const mood = document.getElementById('mood').value;
        const description = document.getElementById('description').value;
        const reason = document.getElementById('reason').value;

        const response = await fetch('/mood_entries/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ mood_score: mood, description: description, reason: reason })
        });

        if (response.ok) {
            loadEntries();
            form.reset();
        } else {
            alert('Failed to submit mood entry');
        }
    });

    async function loadEntries() {
        const response = await fetch('/mood_entries/');
        const entries = await response.json();
        entriesList.innerHTML = '';
        entries.forEach(entry => {
            const li = document.createElement('li');
            li.textContent = `Mood: ${entry.mood_score}, Description: ${entry.description || 'N/A'}, Reason: ${entry.reason || 'N/A'}, Date: ${new Date(entry.date).toLocaleString()}`;
            entriesList.appendChild(li);
        });
    }

    loadEntries();
});
