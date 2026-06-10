# Architecture - Learning Hub Flash Card App

## System Overview

Learning Hub is a lightweight, client-side flashcard learning application designed for exam preparation. The system is built with vanilla JavaScript and loads data from a static JSON file, eliminating the need for a backend database or server infrastructure.

```
┌─────────────────────────────────────────────────────────┐
│                    User Browser                         │
├──────────────┬──────────────────────┬──────────────────┤
│   Topics     │   Flashcard Study    │  Shared Utils    │
│   Page       │      Page            │  & Data Layer    │
│              │                      │                  │
│ index.html   │  card-study.html     │  shared.js       │
│ app.js       │  study.js            │                  │
│              │  styles.css          │  data.json       │
└──────────────┴──────────────────────┴──────────────────┘
```

## Architecture Components

### 1. Data Layer (Static JSON)
- **File**: `data.json`
- **Format**: Hierarchical structure with topics containing cards
- **Loading**: Synchronous fetch on page load, cached in memory
- **State**: Session storage only (no persistence across sessions)

### 2. Pages

#### Page 1: Topics Navigation (`index.html`)
- **Purpose**: Display all available study topics
- **Script**: `app.js`
- **Layout**: Responsive grid of topic cards
- **Interaction**: Click topic to navigate to flashcard study page
- **URL**: `index.html` (or domain root)

#### Page 2: Flashcard Study (`card-study.html`)
- **Purpose**: Interactive flashcard interface with progressive disclosure
- **Script**: `study.js`
- **Layout**: Full-screen flashcard with left/right navigation
- **URL**: `card-study.html?topic={topicId}`
- **State Management**: Session storage for card index and user answers

### 3. Scripts

#### `shared.js` - Common Utilities
**Exports**:
- `fetchData(url)` - Fetch and parse JSON
- `getUrlParam(name)` - Parse URL query parameters
- `formatText(text)` - Format text with line breaks
- `showElement(el)` / `hideElement(el)` - Visibility control
- `setButtonDisabled(id, bool)` - Button state management
- `updateSessionProgress(topicId, cardIndex, userAnswers)` - Store progress
- `getSessionProgress(topicId)` - Retrieve progress
- `formatExample(code)` - Format code examples
- `escapeHtml(text)` - HTML escape utility

#### `app.js` - Topics Page Logic
**Functions**:
- `initializeTopicsPage()` - Entry point
- `displayTopics(topics)` - Render topic grid

**Lifecycle**:
1. DOMContentLoaded event fires
2. Fetch data.json
3. Extract topics array
4. Render clickable topic cards
5. Each card links to `card-study.html?topic={id}`

#### `study.js` - Flashcard Study Logic
**State Variables**:
- `currentTopic` - Currently studying topic object
- `currentCardIndex` - Index of current card (0-based)
- `allTopics` - Loaded topics from JSON
- `userProgress` - Map of card IDs to user answers

**Main Functions**:
- `initializeStudyPage()` - Load topic from URL param, restore progress
- `loadCard(index)` - Display card at given index
- `resetCardView()` - Reset UI to show context only
- `revealMCQ()` - Show MCQ section on demand
- `submitAnswer()` - Handle MCQ submission, show feedback
- `markAsGotIt()` - Move to next card
- `markForReview()` - Mark card for later review, move to next
- `nextCard()` / `previousCard()` - Navigation
- `updateProgressDisplay()` - Update card counter and stats
- `updateNavigationButtons()` - Enable/disable nav buttons

**Lifecycle**:
1. Extract topic ID from URL (?topic=javascript-basics)
2. Load all data from JSON
3. Find matching topic by ID
4. Restore previous progress from session storage if available
5. Load first card (or saved card index)
6. Render card with context & examples (MCQ hidden)
7. User clicks "Show Questions" → reveal MCQ
8. User selects answer → submit → show feedback & explanation
9. User clicks "Got It" or "Need Review" → load next card
10. Navigate with left/right buttons (state persisted in session)

### 4. Styling
- **File**: `styles.css`
- **Approach**: CSS custom properties (variables), mobile-first responsive design
- **Responsive Breakpoints**: 768px (tablet), 480px (mobile)
- **Colors**: Primary blue (#007bff), success green, warning yellow, danger red

## Data Flow

### Topics Page Flow
```
Page Load
  ↓
shared.js: fetchData('data.json')
  ↓
app.js: displayTopics(topics)
  ↓
Render: <topic-card> for each topic
  ↓
User Click: <a href="card-study.html?topic=ID">
```

### Flashcard Study Flow
```
Page Load with ?topic=ID
  ↓
study.js: Extract topic ID from URL
  ↓
shared.js: fetchData('data.json')
  ↓
Find topic in allTopics array
  ↓
loadCard(0) - show context & examples
  ↓
User: Click "Show Questions"
  ↓
revealMCQ() - show MCQ section
  ↓
User: Select option + Submit
  ↓
submitAnswer() - show feedback & explanation
  ↓
User: Click "Got It" or "Need Review"
  ↓
nextCard() - load next card (repeat)
  ↓
End of cards: Redirect to index.html
```

## State Management

### Global State (study.js)
```javascript
{
  currentTopic: Topic object,
  currentCardIndex: number,
  allTopics: Topic[],
  userProgress: {
    "card-id": {
      selectedIndex: number,
      correct: boolean,
      markedForReview: boolean,
      timestamp: ISO string
    }
  }
}
```

### Session Storage (per topic)
```
Key: study_{topicId}
Value: {
  topicId: string,
  cardIndex: number,
  userAnswers: { /* same as userProgress */ },
  timestamp: ISO string
}
```

**Behavior**: 
- Session data resets on page reload
- No data persists across browser sessions
- No localStorage (keeps app simple and privacy-friendly)

## Navigation Map

```
index.html (Topics)
  ├─ Click Topic A
  │  └─ card-study.html?topic=javascript-basics
  │     ├─ Left/Right buttons (navigate cards)
  │     └─ Back button
  │        └─ index.html
  │
  ├─ Click Topic B
  │  └─ card-study.html?topic=react-hooks
  │     └─ ...
  │
  └─ Click Topic C
     └─ card-study.html?topic=system-design
        └─ ...
```

## File Structure

```
viva/
├── index.html                 # Topics navigation page
├── card-study.html            # Flashcard study page
├── data.json                  # Flashcard database
├── styles.css                 # Unified CSS styles
├── app.js                     # Topics page logic
├── study.js                   # Flashcard study logic
├── shared.js                  # Common utilities
├── card-page.html             # Legacy (can be removed)
├── script.js                  # Legacy (replaced by app.js)
├── topics.html                # Alias for index.html (can be removed)
└── .github/
    ├── ARCHITECTURE.md        # This file
    ├── DATA-SCHEMA.md         # JSON schema documentation
    ├── UX-DESIGN.md           # User interface guidelines
    ├── SAMPLE-DATA.json       # Example data across domains
    └── COMPONENT-REFERENCE.md # HTML/CSS/JS component guide
```

## Performance Considerations

1. **Data Loading**: JSON file loaded once on page load (cached in memory)
2. **Session Storage**: Lightweight (only stores card index and answers)
3. **Styling**: No CSS framework overhead (vanilla CSS with variables)
4. **JavaScript**: No dependencies or build tools required
5. **Mobile**: Responsive design with touch-friendly buttons

## Scalability Limits

For the static JSON approach with this architecture:
- **Recommended max topics**: 5-20 topics (fast page load)
- **Recommended max cards per topic**: 20-100 cards (fast card loading)
- **Data size**: ~500KB JSON file (acceptable for page load)

**If exceeding limits**:
- Split data into multiple JSON files (one per topic)
- Implement lazy loading for cards
- Consider backend API for dynamic data

## Security Considerations

1. **No sensitive data**: Static JSON only (no user credentials stored)
2. **Session storage only**: No persistent cross-session data
3. **Client-side validation**: All logic runs in user's browser
4. **No external APIs**: No third-party dependencies

## Browser Compatibility

- Modern browsers (Chrome, Firefox, Safari, Edge)
- ES6+ support required (arrow functions, async/await, template literals)
- No polyfills included

## Future Enhancement Paths

1. **Data Persistence**
   - Add localStorage to save user progress
   - Track which cards user has mastered

2. **Backend Integration**
   - REST API for dynamic data loading
   - User authentication and multi-device sync
   - User progress analytics

3. **Advanced Features**
   - Spaced repetition algorithm
   - Card creation UI
   - Performance metrics dashboard
   - Export/import functionality

4. **Mobile Apps**
   - Wrap with Cordova/React Native
   - Offline sync with backend

## Contributing & Maintenance

- **Adding topics**: Edit `data.json`, follow schema in `DATA-SCHEMA.md`
- **Styling changes**: Modify `styles.css` (use CSS variables)
- **Adding features**: Extend `shared.js` with utilities, add to appropriate page script
- **Testing**: Manual testing in different browsers and screen sizes
