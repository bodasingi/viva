// ===================================================
// STUDY.JS - FLASHCARD STUDY PAGE LOGIC
// ===================================================

// Global state
let currentTopic = null;
let currentCardIndex = 0;
let allTopics = [];
let userProgress = {};

/**
 * Initialize the study page
 */
async function initializeStudyPage() {
    try {
        const topicId = getUrlParam('topic');
        if (!topicId) {
            window.location.href = 'index.html';
            return;
        }

        // Load all data
        const data = await fetchData('data.json');
        allTopics = data.topics;

        // Find the current topic
        currentTopic = allTopics.find(t => t.id === topicId);
        if (!currentTopic) {
            throw new Error('Topic not found');
        }

        // Restore progress if available
        const progress = getSessionProgress(topicId);
        if (progress) {
            currentCardIndex = progress.cardIndex;
            userProgress = progress.userAnswers;
        }

        // Render the page
        renderStudyPage();
        loadCard(currentCardIndex);
        updateNavigationButtons();

    } catch (error) {
        console.error('Error initializing study page:', error);
        document.body.innerHTML = '<h2 style="color: red;">Error Loading Flashcard</h2>';
    }
}

/**
 * Render the study page structure
 */
function renderStudyPage() {
    if (!currentTopic) return;

    document.getElementById('topic-title').textContent = currentTopic.name;
    updateProgressDisplay();
}

/**
 * Load and display a flashcard
 * @param {number} index - Index of card to load
 */
function loadCard(index) {
    if (!currentTopic || index < 0 || index >= currentTopic.cards.length) {
        return;
    }

    currentCardIndex = index;
    const card = currentTopic.cards[index];

    // Reset card view to show context only
    resetCardView();

    // Display context and examples
    document.getElementById('context-content').innerHTML = formatText(card.context);
    
    // Display examples
    const examplesContainer = document.getElementById('examples-content');
    examplesContainer.innerHTML = '';
    if (card.examples && card.examples.length > 0) {
        card.examples.forEach((example, idx) => {
            const exampleDiv = document.createElement('div');
            exampleDiv.className = 'example-item';
            exampleDiv.innerHTML = `<strong>Example ${idx + 1}:</strong>${formatExample(example)}`;
            examplesContainer.appendChild(exampleDiv);
        });
    }

    // Store current card data for MCQ rendering
    window.currentCard = card;

    // Update UI
    updateProgressDisplay();
    updateNavigationButtons();

    // Save progress to session
    updateSessionProgress(currentTopic.id, currentCardIndex, userProgress);
}

/**
 * Reset card view to initial state (show context, hide MCQ and answers)
 */
function resetCardView() {
    hideElement(document.getElementById('mcq-section'));
    hideElement(document.getElementById('answer-section'));
    showElement(document.getElementById('show-questions-wrapper'));
    document.getElementById('options-container').innerHTML = '';
}

/**
 * Reveal MCQ section when user clicks "Show Questions"
 */
function revealMCQ() {
    const card = window.currentCard;
    if (!card || !card.mcq) return;

    // Hide the show questions button
    hideElement(document.getElementById('show-questions-wrapper'));

    // Show MCQ section
    showElement(document.getElementById('mcq-section'));

    // Render MCQ
    document.getElementById('question-text').textContent = card.mcq.question;
    
    const optionsContainer = document.getElementById('options-container');
    optionsContainer.innerHTML = '';

    card.mcq.options.forEach((option, idx) => {
        const label = document.createElement('label');
        label.className = 'option-item';
        
        const input = document.createElement('input');
        input.type = 'radio';
        input.name = 'answer';
        input.value = idx;
        input.id = `option-${idx}`;

        const text = document.createElement('span');
        text.textContent = option;

        label.appendChild(input);
        label.appendChild(text);
        optionsContainer.appendChild(label);
    });

    // Scroll MCQ into view
    document.getElementById('mcq-section').scrollIntoView({ behavior: 'smooth' });
}

/**
 * Submit the MCQ answer
 */
function submitAnswer() {
    const selectedOption = document.querySelector('input[name="answer"]:checked');
    if (!selectedOption) {
        alert('Please select an answer');
        return;
    }

    const card = window.currentCard;
    const selectedIndex = parseInt(selectedOption.value);
    const isCorrect = selectedIndex === card.mcq.correctAnswer;

    // Store user answer
    userProgress[card.id] = {
        selectedIndex,
        correct: isCorrect,
        timestamp: new Date().toISOString()
    };

    // Show feedback
    const feedbackDiv = document.getElementById('feedback');
    if (isCorrect) {
        feedbackDiv.innerHTML = '<div class="feedback-correct">✓ Correct!</div>';
        feedbackDiv.className = 'feedback feedback-correct';
    } else {
        feedbackDiv.innerHTML = `<div class="feedback-incorrect">✗ Incorrect. The correct answer is: <strong>${card.mcq.options[card.mcq.correctAnswer]}</strong></div>`;
        feedbackDiv.className = 'feedback feedback-incorrect';
    }

    // Highlight correct answer
    document.querySelectorAll('input[name="answer"]').forEach((input, idx) => {
        const label = input.parentElement;
        if (idx === card.mcq.correctAnswer) {
            label.classList.add('correct-option');
        } else if (idx === selectedIndex && !isCorrect) {
            label.classList.add('wrong-option');
        }
    });

    // Show explanation and answer section
    document.getElementById('explanation-text').textContent = card.mcq.explanation;
    hideElement(document.getElementById('mcq-section'));
    showElement(document.getElementById('answer-section'));

    // Disable submit button
    document.getElementById('submit-btn').disabled = true;

    // Update progress
    updateSessionProgress(currentTopic.id, currentCardIndex, userProgress);
}

/**
 * Mark card as "Got It"
 */
function markAsGotIt() {
    if (currentCardIndex < currentTopic.cards.length - 1) {
        nextCard();
    } else {
        alert('You\'ve completed all cards in this topic! 🎉\n\nGo back to the topics page to study another topic.');
        window.location.href = 'index.html';
    }
}

/**
 * Mark card for review
 */
function markForReview() {
    const card = window.currentCard;
    userProgress[card.id].markedForReview = true;
    updateSessionProgress(currentTopic.id, currentCardIndex, userProgress);
    
    if (currentCardIndex < currentTopic.cards.length - 1) {
        nextCard();
    } else {
        alert('You\'ve completed all cards in this topic! 🎉\n\nGo back to the topics page to study another topic.');
        window.location.href = 'index.html';
    }
}

/**
 * Navigate to next card
 */
function nextCard() {
    if (currentCardIndex < currentTopic.cards.length - 1) {
        loadCard(currentCardIndex + 1);
        window.scrollTo(0, 0);
    }
}

/**
 * Navigate to previous card
 */
function previousCard() {
    if (currentCardIndex > 0) {
        loadCard(currentCardIndex - 1);
        window.scrollTo(0, 0);
    }
}

/**
 * Update progress display
 */
function updateProgressDisplay() {
    const total = currentTopic ? currentTopic.cards.length : 0;
    const current = currentCardIndex + 1;
    
    document.getElementById('progress-text').textContent = `Card ${current} of ${total}`;
    document.getElementById('card-counter').textContent = `${current} / ${total}`;

    // Update study stats
    const studiedCount = Object.keys(userProgress).length;
    const markedCount = Object.values(userProgress).filter(p => p.markedForReview).length;
    
    document.getElementById('studied-count').textContent = studiedCount;
    document.getElementById('marked-count').textContent = markedCount;
}

/**
 * Update navigation button states
 */
function updateNavigationButtons() {
    const total = currentTopic ? currentTopic.cards.length : 0;
    const current = currentCardIndex;

    setButtonDisabled('prev-btn', current === 0);
    setButtonDisabled('next-btn', current === total - 1);
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', initializeStudyPage);
