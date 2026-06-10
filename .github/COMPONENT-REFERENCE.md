# Component Reference - Learning Hub

Complete guide to all HTML components, CSS classes, and JavaScript functions used in Learning Hub.

---

## HTML Components

### Header Component

#### Topics Page Header
```html
<header class="header">
    <div class="header-content">
        <h1>📚 Learning Hub</h1>
        <p>Prepare for exams with interactive flashcards</p>
    </div>
</header>
```

**CSS Classes**: `header`, `header-content`
**Usage**: Appears on topics.html (index.html)
**Purpose**: Branding and page title

---

#### Study Page Header
```html
<header class="header study-header">
    <div class="header-content">
        <div class="header-nav">
            <a href="index.html" class="btn-back">← Back to Topics</a>
            <div class="study-progress">
                <span id="progress-text">Card 1 of 10</span>
            </div>
        </div>
        <h1 id="topic-title">Loading...</h1>
    </div>
</header>
```

**CSS Classes**: `header`, `study-header`, `header-content`, `header-nav`, `btn-back`, `study-progress`
**Dynamic Content**: `#topic-title` (set by study.js), `#progress-text` (updated by updateProgressDisplay())
**Purpose**: Navigation and progress display on study page

---

### Topic Grid Component

```html
<section class="topics-section">
    <h2>Select a Topic to Study</h2>
    <div class="topics-grid" id="topics-container">
        <!-- Topics will be loaded here by JavaScript -->
    </div>
</section>
```

**Generated HTML** (by app.js displayTopics function):
```html
<a href="card-study.html?topic=javascript-basics" class="topic-card">
    <h3>JavaScript Basics</h3>
    <p>Fundamentals of JavaScript including variables, data types, and functions</p>
    <div class="topic-meta">
        <span class="card-count">15 cards</span>
    </div>
</a>
```

**CSS Classes**: `topics-section`, `topics-grid`, `topic-card`, `topic-meta`, `card-count`
**Dynamic**: Generated from data.json topics array
**Purpose**: Display all available topics as clickable cards

---

### Flashcard Component

#### Main Card Structure
```html
<div class="flashcard-wrapper">
    <div class="flashcard">
        <!-- Context Section -->
        <div class="card-section context-section" id="context-section">
            <h2 class="section-title">📖 Learn</h2>
            <div class="section-content">
                <p id="context-content"></p>
                <div id="examples-content" class="examples-list"></div>
            </div>
        </div>

        <!-- MCQ Section (Hidden) -->
        <div class="card-section mcq-section hidden" id="mcq-section">
            <h2 class="section-title">❓ Test Yourself</h2>
            <div class="mcq-container">
                <p id="question-text" class="question"></p>
                <div class="options-list" id="options-container"></div>
                <button id="submit-btn" class="btn btn-primary" onclick="submitAnswer()">Submit Answer</button>
            </div>
        </div>

        <!-- Answer Section (Hidden) -->
        <div class="card-section answer-section hidden" id="answer-section">
            <h2 class="section-title">✓ Answer</h2>
            <div class="answer-container">
                <div id="feedback" class="feedback"></div>
                <p id="explanation-text" class="explanation"></p>
                <div class="answer-actions">
                    <button id="got-it-btn" class="btn btn-success" onclick="markAsGotIt()">Got It! 👍</button>
                    <button id="review-btn" class="btn btn-warning" onclick="markForReview()">Need Review 📌</button>
                </div>
            </div>
        </div>

        <!-- Show Questions Button -->
        <div class="card-actions" id="show-questions-wrapper">
            <button id="show-questions-btn" class="btn btn-secondary" onclick="revealMCQ()">
                Show Questions →
            </button>
        </div>
    </div>
</div>
```

**CSS Classes**:
- `flashcard-wrapper` - Container
- `flashcard` - Main card
- `card-section` - Individual section
- `context-section`, `mcq-section`, `answer-section` - Specific sections
- `section-title` - Blue section heading
- `section-content` - Content area
- `examples-list` - Examples container
- `example-item` - Single example
- `mcq-container` - MCQ layout
- `question` - Question text styling
- `options-list` - Options container
- `option-item` - Single option
- `correct-option` / `wrong-option` - Answer feedback states
- `answer-container` - Answer section layout
- `feedback` - Feedback message
- `feedback-correct` / `feedback-incorrect` - Feedback states
- `explanation` - Explanation text styling
- `answer-actions` - Action buttons container

**Dynamic Elements**:
- `#context-content` - Populated by loadCard()
- `#examples-content` - Populated by loadCard()
- `#question-text` - Populated by revealMCQ()
- `#options-container` - Populated by revealMCQ()
- `#feedback` - Populated by submitAnswer()
- `#explanation-text` - Populated by submitAnswer()

---

### Card Navigation Component

```html
<div class="card-navigation">
    <button id="prev-btn" class="btn btn-nav" onclick="previousCard()" disabled>
        ← Previous
    </button>
    <span class="card-counter" id="card-counter">1 / 10</span>
    <button id="next-btn" class="btn btn-nav" onclick="nextCard()" disabled>
        Next →
    </button>
</div>
```

**CSS Classes**: `card-navigation`, `btn`, `btn-nav`, `card-counter`
**Dynamic**: Button disabled states managed by updateNavigationButtons()
**Purpose**: Navigate between cards in a topic

---

### Footer Component

```html
<footer class="footer">
    <p>&copy; 2024 Learning Hub. Study smarter, not harder.</p>
</footer>
```

**CSS Classes**: `footer`
**Purpose**: Site footer with copyright

---

#### Study Page Footer
```html
<footer class="footer">
    <p>Study Progress: <span id="studied-count">0</span> cards studied | <span id="marked-count">0</span> marked for review</p>
</footer>
```

**Dynamic**: `#studied-count` and `#marked-count` updated by updateProgressDisplay()
**Purpose**: Show study stats

---

## CSS Classes Reference

### Layout Classes

| Class | Purpose | Usage |
|-------|---------|-------|
| `.container` | Max-width container with padding | Page wrapper |
| `.study-container` | Narrower container for study page | Study page main |
| `.header` | Page header styling | All pages |
| `.study-header` | Modified header for study page | card-study.html |
| `.footer` | Page footer styling | All pages |

### Grid & Spacing

| Class | Purpose | CSS |
|-------|---------|-----|
| `.topics-grid` | Responsive grid layout | display: grid; auto-fill |
| `.options-list` | Vertical flex layout | display: flex; flex-direction: column |
| `.card-navigation` | Flex nav buttons | display: flex; justify-content: space-between |
| `.answer-actions` | Flex button layout | display: flex; flex-wrap: wrap |
| `.examples-list` | Vertical examples | display: flex; flex-direction: column |

### Button Classes

| Class | Purpose | Color | Usage |
|-------|---------|-------|-------|
| `.btn` | Base button | - | All buttons |
| `.btn-primary` | Primary action | Blue (#007bff) | Submit, main actions |
| `.btn-secondary` | Secondary action | Gray | "Show Questions" |
| `.btn-success` | Success action | Green | "Got It!" |
| `.btn-warning` | Warning action | Yellow | "Need Review" |
| `.btn-nav` | Navigation button | Blue | Prev/Next buttons |
| `.btn-back` | Back link | Transparent white | Back to Topics |

### State Classes

| Class | Purpose |
|-------|---------|
| `.hidden` | display: none |
| `.correct-option` | Green background for correct answer |
| `.wrong-option` | Red background for wrong answer |
| `:disabled` | Grayed out, not clickable |
| `:hover` | Interactive hover state |
| `:focus` | Keyboard focus indicator |

### Typography Classes

| Class | Purpose | Font Size |
|-------|---------|-----------|
| `h1` | Page title | 2.5rem |
| `h2` | Section title | 2rem |
| `h3` | Subsection title | 1.5rem |
| `.section-title` | Card section heading | 1.3rem, blue |
| `.question` | MCQ question text | 1.1rem, bold |
| `.feedback` | Answer feedback | Centered, colored |
| `.explanation` | Answer explanation | Border-left accent |

### Card/Container Classes

| Class | Purpose |
|-------|---------|
| `.topic-card` | Topic card in grid |
| `.flashcard-wrapper` | Flashcard container |
| `.flashcard` | Main card element |
| `.card-section` | Section within card |
| `.card-actions` | Action buttons area |
| `.mcq-container` | MCQ layout |
| `.answer-container` | Answer section layout |

### Form/Input Classes

| Class | Purpose |
|-------|---------|
| `.option-item` | MCQ option radio button |
| `.options-list` | Container for options |
| `input[type="radio"]` | Option selection |

---

## JavaScript Functions Reference

### shared.js - Common Utilities

```javascript
// Async fetch
async function fetchData(url)
// Returns: Promise<Object> - Parsed JSON

// URL & Parameters
function getUrlParam(paramName)
// Returns: string|null

// DOM Manipulation
function showElement(element)
function hideElement(element)
function toggleElement(element)

// Button State
function setButtonDisabled(buttonId, isDisabled)

// Session Storage
function updateSessionProgress(topicId, cardIndex, userAnswers = {})
function getSessionProgress(topicId)
// Returns: Object|null

// Text Formatting
function formatText(text)
// Returns: string - HTML formatted text

function formatExample(example)
// Returns: string - Pre-formatted code block

function escapeHtml(text)
// Returns: string - HTML-escaped text
```

---

### app.js - Topics Page Logic

```javascript
// Entry point
async function initializeTopicsPage()
// Fetches data and renders topics
// Triggers on: DOMContentLoaded

// Render topics
function displayTopics(topics)
// Generates topic cards from array
// Params: topics (Array<Topic>)
// Updates: #topics-container innerHTML
```

---

### study.js - Flashcard Study Logic

#### Initialization
```javascript
async function initializeStudyPage()
// Entry point for study page
// Parses URL param (?topic=ID)
// Fetches data, restores progress
// Triggers on: DOMContentLoaded
```

#### Card Loading & Display
```javascript
function loadCard(index)
// Loads card at given index
// Params: index (number 0-based)
// Updates: context, examples, MCQ data, navigation buttons
// Resets: card view to context-only state

function resetCardView()
// Hides MCQ and answer sections
// Shows "Show Questions" button
```

#### MCQ Interaction
```javascript
function revealMCQ()
// Shows MCQ section when user clicks "Show Questions"
// Renders: question, radio options

function submitAnswer()
// Handles MCQ submission
// Shows: correct/incorrect feedback
// Highlights: correct and user's selected option
// Updates: user progress, moves to answer section
```

#### Navigation & Progress
```javascript
function nextCard()
// Move to next card in topic
// Conditions: Only if not at last card

function previousCard()
// Move to previous card in topic
// Conditions: Only if not at first card

function updateProgressDisplay()
// Updates: card counter, study stats
// Sets: #progress-text, #card-counter, #studied-count, #marked-count

function updateNavigationButtons()
// Enables/disables prev/next buttons
// Conditions: Based on card index boundaries
```

#### User Actions
```javascript
function markAsGotIt()
// Move to next card (or redirect if last card)

function markForReview()
// Mark card as needing review
// Move to next card

// Called via onclick handlers:
onclick="revealMCQ()"
onclick="submitAnswer()"
onclick="markAsGotIt()"
onclick="markForReview()"
onclick="nextCard()"
onclick="previousCard()"
```

#### Global State Variables
```javascript
let currentTopic       // Current Topic object
let currentCardIndex   // Current card index (0-based)
let allTopics          // All topics from JSON
let userProgress       // Map: card ID → {selectedIndex, correct, timestamp}
let window.currentCard // Cache of current card object
```

---

## Data Flow Diagrams

### Topics Page Data Flow
```
index.html loads
  ↓
app.js: DOMContentLoaded event
  ↓
initializeTopicsPage()
  ↓
shared.js: fetchData('data.json')
  ↓
Parse JSON
  ↓
displayTopics(topics)
  ↓
Generate HTML: <a class="topic-card">
  ↓
Append to #topics-container
  ↓
User clicks topic
  ↓
Navigate to card-study.html?topic={id}
```

### Flashcard Study Data Flow
```
card-study.html?topic=ID loads
  ↓
study.js: DOMContentLoaded event
  ↓
initializeStudyPage()
  ↓
Extract topic ID from URL
  ↓
shared.js: fetchData('data.json')
  ↓
Find matching topic
  ↓
Get session progress (if exists)
  ↓
loadCard(0 or saved index)
  ↓
Render context + examples
  ↓
User clicks "Show Questions"
  ↓
revealMCQ()
  ↓
Render MCQ options
  ↓
User selects option + Submit
  ↓
submitAnswer()
  ↓
Show feedback + explanation
  ↓
User clicks "Got It" or "Need Review"
  ↓
nextCard()
  ↓
Load next card (repeat) or finish
```

---

## Event Handlers & Triggers

### Automatic Triggers
| Trigger | Function | Effect |
|---------|----------|--------|
| Page load | initializeTopicsPage() | Renders topics |
| Page load | initializeStudyPage() | Loads first card |
| Card changes | updateProgressDisplay() | Updates counter |
| Card changes | updateNavigationButtons() | Enable/disable nav |

### User Interactions
| Action | Handler | Function |
|--------|---------|----------|
| Click topic | `<a href="?">` | Navigate to study page |
| Click "Show Questions" | `onclick="revealMCQ()"` | Reveal MCQ |
| Click option | Native radio select | Select answer |
| Click "Submit" | `onclick="submitAnswer()"` | Show feedback |
| Click "Got It" | `onclick="markAsGotIt()"` | Next card |
| Click "Need Review" | `onclick="markForReview()"` | Next card + flag |
| Click "← Previous" | `onclick="previousCard()"` | Previous card |
| Click "Next →" | `onclick="nextCard()"` | Next card |
| Click "← Back to Topics" | `<a href="index.html">` | Navigate to topics |

---

## CSS Custom Properties (Variables)

```css
:root {
    --primary-color:      #007bff;     /* Main blue */
    --primary-hover:      #0056b3;     /* Darker blue */
    --success-color:      #28a745;     /* Green */
    --warning-color:      #ffc107;     /* Yellow */
    --danger-color:       #dc3545;     /* Red */
    --light-gray:         #f8f9fa;     /* Light background */
    --medium-gray:        #e9ecef;     /* Medium gray */
    --dark-gray:          #495057;     /* Dark gray text */
    --text-color:         #212529;     /* Black text */
    --border-color:       #dee2e6;     /* Border gray */
    --shadow:             0 2px 8px rgba(0, 0, 0, 0.1);
    --shadow-lg:          0 4px 16px rgba(0, 0, 0, 0.15);
    --border-radius:      8px;
    --transition:         all 0.3s ease;
}
```

---

## Form Elements

### Radio Button Option
```html
<label class="option-item">
    <input type="radio" name="answer" value="0" id="option-0">
    <span>Option text goes here</span>
</label>
```

**States**:
- Normal: Gray border, white background
- Hover: Blue border, light blue tint
- Selected: Blue border, darker tint
- Correct (after submit): Green border, green background
- Wrong (after submit): Red border, red background

---

## Responsive Breakpoints

```css
/* Desktop: 1200px+ (default styles) */
.topics-grid { grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); }

/* Tablet: 768px - 1199px */
@media (max-width: 768px) {
    .topics-grid { grid-template-columns: 1fr; }
    .header h1 { font-size: 1.8rem; }
}

/* Mobile: < 480px */
@media (max-width: 480px) {
    h1 { font-size: 1.5rem; }
    .btn { font-size: 0.9rem; }
}
```

---

## Accessibility Features

### Semantic HTML
- `<header>`, `<main>`, `<footer>` - Landmark elements
- `<h1>`, `<h2>`, `<h3>` - Heading hierarchy
- `<label>` with `<input>` - Form labels
- `<button>` vs `<a>` - Semantic correctness

### Color Contrast
- Text on background: 4.5:1 minimum (WCAG AA)
- Large text on background: 3:1 minimum
- Icons: 3:1 minimum

### Keyboard Navigation
- All buttons keyboard accessible
- Tab order is logical
- Focus indicators visible
- No keyboard traps

### Screen Readers
- Semantic heading structure
- Descriptive link text
- Form labels associated with inputs

---

## Testing Checklist

- [ ] Topics page loads without errors
- [ ] Topics render as clickable cards
- [ ] Clicking topic navigates to study page
- [ ] Study page loads correct topic
- [ ] Card displays context and examples
- [ ] "Show Questions" button reveals MCQ
- [ ] Radio buttons allow selection
- [ ] "Submit Answer" shows feedback
- [ ] Correct answer highlighted in green
- [ ] Wrong answer highlighted in red
- [ ] Explanation displays after submission
- [ ] "Got It" / "Need Review" buttons work
- [ ] Previous/Next buttons navigate cards
- [ ] Progress counter updates
- [ ] Navigation buttons disable at boundaries
- [ ] Back button returns to topics
- [ ] All responsive breakpoints work
- [ ] Mobile touch targets are 44px+
- [ ] No console errors
- [ ] Keyboard navigation works
- [ ] Focus indicators visible

---

## Common Customizations

### Changing Primary Color
```css
:root {
    --primary-color: #0066cc;    /* Change from #007bff */
    --primary-hover: #0052a3;    /* Darker shade */
}
```

### Adding New Topic
1. Edit data.json
2. Add topic object with id, name, description, cards array
3. Follow DATA-SCHEMA.md format

### Changing Font
```css
body {
    font-family: 'Georgia', 'Times New Roman', serif;
}
```

### Adjusting Spacing
```css
.flashcard {
    padding: 3rem;    /* Increase from 2rem */
}
```

### Dark Mode (Future Enhancement)
```css
@media (prefers-color-scheme: dark) {
    body {
        background-color: #1a1a1a;
        color: #ffffff;
    }
    .flashcard {
        background-color: #2a2a2a;
    }
}
```
