// src/api.js

import axios from 'axios';

// Укажите базовый URL вашего API
const API_BASE_URL = 'http://localhost:8000';

export const getMoodEntries = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/mood_entries/`);
        return response.data;
    } catch (error) {
        console.error('Error fetching mood entries:', error);
        throw error;
    }
};

export const createMoodEntry = async (moodEntry) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/mood_entries/`, moodEntry);
        return response.data;
    } catch (error) {
        console.error('Error creating mood entry:', error);
        throw error;
    }
};

export const getMoodEntriesByDate = async (date) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/mood_entries/${date}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching mood entries by date:', error);
        throw error;
    }
};
