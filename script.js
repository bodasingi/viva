// ===================================================
// APP.JS - TOPIC NAVIGATION PAGE
// ===================================================

/**
 * Initialize the topics page by fetching data and rendering topics
 */
async function initializeTopicsPage() {
    try {
        const data = await fetchData('data.json');
        displayTopics(data.topics);
    } catch (error) {
        console.error('Error loading topics:', error);
        document.body.innerHTML = '<h2 style="color: red;">Error Loading Topics</h2>';
    }
}

/**
 * Render topic cards on the page
 * @param {Array} topics - Array of topic objects
 */
function displayTopics(topics) {
    const container = document.getElementById('topics-container');
    if (!container) return;

    container.innerHTML = topics.map(topic => `
        <a href="card-study.html?topic=${topic.id}" class="topic-card">
            <h3>${topic.name}</h3>
            <p>${topic.description}</p>
            <div class="topic-meta">
                <span class="card-count">${topic.cards.length} cards</span>
            </div>
        </a>
    `).join('');
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', initializeTopicsPage);
// Start the topics initialization when the script loads
// (Other pages use their own scripts such as `study.js`)
document.addEventListener('DOMContentLoaded', initializeTopicsPage);