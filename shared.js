// ===================================================
// SHARED.JS - COMMON UTILITIES
// ===================================================

/**
 * Fetch JSON data from a file
 * @param {string} url - Path to JSON file
 * @returns {Promise} - Parsed JSON data
 */
async function fetchData(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Failed to fetch ${url}: ${response.statusText}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Fetch error:', error);
        throw error;
    }
}

/**
 * Get URL parameter value
 * @param {string} paramName - Name of URL parameter
 * @returns {string|null} - Parameter value or null if not found
 */
function getUrlParam(paramName) {
    const params = new URLSearchParams(window.location.search);
    return params.get(paramName);
}

/**
 * Format text with line breaks for display
 * @param {string} text - Text to format
 * @returns {string} - HTML formatted text
 */
function formatText(text) {
    return text.replace(/\n/g, '<br>');
}

/**
 * Show an element
 * @param {HTMLElement} element - Element to show
 */
function showElement(element) {
    if (element) {
        element.classList.remove('hidden');
    }
}

/**
 * Hide an element
 * @param {HTMLElement} element - Element to hide
 */
function hideElement(element) {
    if (element) {
        element.classList.add('hidden');
    }
}

/**
 * Toggle visibility of an element
 * @param {HTMLElement} element - Element to toggle
 */
function toggleElement(element) {
    if (element) {
        element.classList.toggle('hidden');
    }
}

/**
 * Set button disabled state
 * @param {string} buttonId - ID of button element
 * @param {boolean} isDisabled - Whether button should be disabled
 */
function setButtonDisabled(buttonId, isDisabled) {
    const button = document.getElementById(buttonId);
    if (button) {
        button.disabled = isDisabled;
    }
}

/**
 * Update session storage with study progress
 * @param {string} topicId - ID of current topic
 * @param {number} cardIndex - Index of current card
 * @param {Object} userAnswers - User's answers for cards
 */
function updateSessionProgress(topicId, cardIndex, userAnswers = {}) {
    const key = `study_${topicId}`;
    sessionStorage.setItem(key, JSON.stringify({
        topicId,
        cardIndex,
        userAnswers,
        timestamp: new Date().toISOString()
    }));
}

/**
 * Get study progress from session storage
 * @param {string} topicId - ID of topic
 * @returns {Object|null} - Progress data or null if not found
 */
function getSessionProgress(topicId) {
    const key = `study_${topicId}`;
    const data = sessionStorage.getItem(key);
    return data ? JSON.parse(data) : null;
}

/**
 * Format code blocks in examples for display
 * @param {string} example - Example text with code
 * @returns {string} - Formatted HTML
 */
function formatExample(example) {
    return `<pre><code>${escapeHtml(example)}</code></pre>`;
}

/**
 * Escape HTML special characters
 * @param {string} text - Text to escape
 * @returns {string} - Escaped text
 */
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}
