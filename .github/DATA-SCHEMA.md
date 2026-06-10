# Data Schema - Learning Hub

## JSON Structure Overview

The flashcard database is stored in `data.json` with a hierarchical structure:

```
{
  "topics": [
    {
      "id": string,
      "name": string,
      "description": string,
      "cards": [
        {
          "id": string,
          "context": string,
          "examples": string[],
          "mcq": {
            "question": string,
            "options": string[],
            "correctAnswer": number,
            "explanation": string
          }
        }
      ]
    }
  ]
}
```

## Detailed Field Specifications

### Root Object

```typescript
{
  topics: Topic[]
}
```

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `topics` | Array | Yes | Array of all available study topics |

---

### Topic Object

```typescript
interface Topic {
  id: string
  name: string
  description: string
  cards: Card[]
}
```

| Field | Type | Required | Description | Example |
|-------|------|----------|-------------|---------|
| `id` | string | Yes | Unique identifier for topic (slug format) | `"javascript-basics"` |
| `name` | string | Yes | Display name of the topic | `"JavaScript Basics"` |
| `description` | string | Yes | Brief description of topic content (1-2 sentences) | `"Fundamentals of JavaScript including variables, data types, and functions"` |
| `cards` | Card[] | Yes | Array of flashcards in this topic (min 1, recommended 2-50) | See Card Object |

**Constraints**:
- `id` must be unique across all topics
- `id` format: lowercase letters, hyphens only (no spaces, no underscores)
- `name` should be 2-4 words
- `description` should be 10-50 words

---

### Card Object

```typescript
interface Card {
  id: string
  context: string
  examples: string[]
  mcq: MCQ
}
```

| Field | Type | Required | Description | Example |
|-------|------|----------|-------------|---------|
| `id` | string | Yes | Unique identifier within topic (slug format) | `"card-1"` or `"variables-and-scope"` |
| `context` | string | Yes | Learning material / theory content (500-2000 chars) | See examples below |
| `examples` | string[] | Yes | Array of practical examples (min 1, recommended 2-3) | Code snippets, use cases, etc. |
| `mcq` | MCQ | Yes | Multiple choice question and answer metadata | See MCQ Object |

**Constraints**:
- `id` must be unique within the topic (not globally)
- Format: lowercase, hyphens, no spaces
- `context` should be readable, well-formatted
- Use `\n` for line breaks in text
- Code examples can include multi-line code

---

### MCQ Object

```typescript
interface MCQ {
  question: string
  options: string[]
  correctAnswer: number
  explanation: string
}
```

| Field | Type | Required | Description | Example |
|-------|------|----------|-------------|---------|
| `question` | string | Yes | Question text (20-200 characters) | `"Which keyword should you use to declare a variable that cannot be reassigned?"` |
| `options` | string[] | Yes | Array of answer choices (exactly 4 options) | `["var", "let", "const", "static"]` |
| `correctAnswer` | number | Yes | Index of correct answer (0-3) | `2` (for "const" in options above) |
| `explanation` | string | Yes | Explanation of why answer is correct (50-500 chars) | Detailed reasoning and learning guidance |

**Constraints**:
- `options` must have exactly 4 elements
- `correctAnswer` must be 0, 1, 2, or 3
- Options should be grammatically parallel
- Avoid obvious wrong answers (all should be plausible)
- Explanation should reference the correct option and explain why others are wrong

---

## Example: Complete Flashcard

```json
{
  "id": "react-hooks",
  "name": "React Hooks",
  "description": "Understanding React Hooks: useState, useEffect, and custom hooks",
  "cards": [
    {
      "id": "card-1",
      "context": "React Hooks allow you to use state and other React features in functional components. The useState hook lets you add state to a functional component. It returns an array with two elements: the current state value and a function to update it. The useEffect hook runs side effects after the component renders—it's equivalent to componentDidMount, componentDidUpdate, and componentWillUnmount combined.",
      "examples": [
        "import { useState } from 'react';\n\nfunction Counter() {\n  const [count, setCount] = useState(0);\n  return (\n    <div>\n      <p>Count: {count}</p>\n      <button onClick={() => setCount(count + 1)}>Increment</button>\n    </div>\n  );\n}",
        "import { useEffect } from 'react';\n\nfunction DataFetcher() {\n  useEffect(() => {\n    fetch('/api/data')\n      .then(res => res.json())\n      .then(data => console.log(data));\n  }, []);\n}"
      ],
      "mcq": {
        "question": "What does the empty dependency array [] do in useEffect?",
        "options": [
          "It runs the effect on every render",
          "It never runs the effect",
          "It runs the effect only once when component mounts",
          "It runs the effect when any dependency changes"
        ],
        "correctAnswer": 2,
        "explanation": "An empty dependency array [] means the effect runs only once when the component first mounts. This is useful for initialization tasks like API calls. If you omit the dependency array, the effect runs after every render."
      }
    }
  ]
}
```

---

## Field Value Guidelines

### Context Content

**Purpose**: Teach the concept to the learner
**Best Practices**:
- Start with definition
- Explain how/why it works
- Mention related concepts
- Use clear, accessible language
- 300-1000 words typical
- Use `\n` for paragraphs
- No markdown, plain text formatting

**Bad Example**:
```
"Variables are things you can use in code."
```

**Good Example**:
```
"A variable in JavaScript is a named storage location that holds a value. You can declare variables using var, let, or const keywords. The const keyword declares a variable that cannot be reassigned after initialization, making it ideal for values that shouldn't change. The let keyword creates a block-scoped variable that can be reassigned, while var has function-level scope and is generally avoided in modern code."
```

---

### Examples

**Purpose**: Show practical application of concept
**Best Practices**:
- Include 2-3 examples per card
- Real, runnable code snippets
- Mix basic and advanced cases
- Use `\n` for code formatting
- Include comments
- Show both correct and incorrect usage when relevant

**Code Example Format**:
```
"const greeting = 'Hello';\nconsole.log(greeting); // Output: Hello\n\n// With default parameters\nconst greet = (name = 'Guest') => {\n  return `Hello, ${name}!`;\n};\nconsole.log(greet('Alice')); // Output: Hello, Alice!"
```

**Non-Code Example**:
```
"Real-world analogy: A variable is like a labeled box. You put something inside, give it a name, and later retrieve it. Some boxes are sealed (const), some allow swapping contents (let), and some are poorly designed (var)."
```

---

### MCQ Options

**Purpose**: Test understanding of concept
**Best Practices**:
- All 4 options must be plausible
- Avoid trick questions
- Options should be grammatically parallel
- Mix obvious and subtle distractors
- Avoid "all of the above" / "none of the above"
- Test one concept per question

**Bad Options** (too obvious):
```
"options": [
  "garbage value",
  "undefined value",
  "the variable value",
  "error"
]
```

**Good Options** (thoughtful distractors):
```
"options": [
  "It runs the effect on every render",
  "It never runs the effect",
  "It runs the effect only once when component mounts",
  "It runs the effect when any dependency changes"
]
```

---

### Explanations

**Purpose**: Teach why the answer is correct
**Best Practices**:
- Explain the correct answer
- Briefly address why other options are wrong
- Link back to context material
- 2-3 sentences typical
- Use accessible language
- Reinforce learning

**Bad Explanation**:
```
"Because that's the correct answer."
```

**Good Explanation**:
```
"An empty dependency array [] means the effect runs only once after the initial render, making it perfect for initialization code like API calls. If you omit the array, the effect runs after every render (inefficient). If you include dependencies, it runs when they change. A dependency array is always required for useEffect."
```

---

## Data Validation Rules

### Required Fields
- Every topic must have: `id`, `name`, `description`, `cards` array (non-empty)
- Every card must have: `id`, `context`, `examples` (array with ≥1 items), `mcq`
- Every MCQ must have: `question`, `options` (exactly 4 items), `correctAnswer` (0-3), `explanation`

### Format Constraints
- IDs: lowercase alphanumeric + hyphens only, no spaces or special chars
- IDs must be unique within scope (topic IDs globally, card IDs within topic)
- Text fields: non-empty strings, no trailing whitespace
- correctAnswer: must be valid index (0, 1, 2, or 3)

### Text Guidelines
- No HTML tags (plain text only)
- Use `\n` for line breaks
- Use `\t` for indentation in code
- No emoji in formal content (allowed in headers/titles)
- Keep lines under 100 chars for readability

---

## JSON Schema (Strict Format)

```json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "type": "object",
  "required": ["topics"],
  "properties": {
    "topics": {
      "type": "array",
      "minItems": 1,
      "items": {
        "type": "object",
        "required": ["id", "name", "description", "cards"],
        "properties": {
          "id": {
            "type": "string",
            "pattern": "^[a-z0-9-]+$"
          },
          "name": {
            "type": "string",
            "minLength": 3,
            "maxLength": 100
          },
          "description": {
            "type": "string",
            "minLength": 10,
            "maxLength": 500
          },
          "cards": {
            "type": "array",
            "minItems": 1,
            "items": {
              "type": "object",
              "required": ["id", "context", "examples", "mcq"],
              "properties": {
                "id": {
                  "type": "string",
                  "pattern": "^[a-z0-9-]+$"
                },
                "context": {
                  "type": "string",
                  "minLength": 50,
                  "maxLength": 5000
                },
                "examples": {
                  "type": "array",
                  "minItems": 1,
                  "items": {
                    "type": "string",
                    "minLength": 10
                  }
                },
                "mcq": {
                  "type": "object",
                  "required": ["question", "options", "correctAnswer", "explanation"],
                  "properties": {
                    "question": {
                      "type": "string",
                      "minLength": 10,
                      "maxLength": 300
                    },
                    "options": {
                      "type": "array",
                      "minItems": 4,
                      "maxItems": 4,
                      "items": {
                        "type": "string",
                        "minLength": 2,
                        "maxLength": 200
                      }
                    },
                    "correctAnswer": {
                      "type": "integer",
                      "minimum": 0,
                      "maximum": 3
                    },
                    "explanation": {
                      "type": "string",
                      "minLength": 20,
                      "maxLength": 1000
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}
```

---

## Adding New Topics/Cards

### Checklist
- [ ] Topic ID is unique and follows `kebab-case` format
- [ ] Card IDs within topic are unique
- [ ] Context text is 50+ characters
- [ ] At least 1 example provided (2-3 recommended)
- [ ] MCQ has exactly 4 options
- [ ] correctAnswer is 0-3
- [ ] No trailing whitespace
- [ ] No HTML tags in text fields
- [ ] JSON is valid (no syntax errors)
- [ ] Verified in browser before committing

### Template

```json
{
  "id": "new-topic-id",
  "name": "New Topic Name",
  "description": "Brief description of what learners will study in this topic (10-50 words).",
  "cards": [
    {
      "id": "card-1",
      "context": "Main learning material goes here. Explain the concept thoroughly (300+ characters). Use line breaks where needed.\n\nSecond paragraph explains related concepts.",
      "examples": [
        "First example with code or real-world scenario",
        "Second example showing different aspect"
      ],
      "mcq": {
        "question": "What is being asked here?",
        "options": [
          "Option A - incorrect but plausible",
          "Option B - incorrect but plausible",
          "Option C - correct answer",
          "Option D - incorrect but plausible"
        ],
        "correctAnswer": 2,
        "explanation": "Explain why Option C is correct. Mention why other options are incorrect and clarify common misconceptions."
      }
    }
  ]
}
```

---

## Common Mistakes to Avoid

❌ **Wrong**:
```json
{
  "id": "JavaScript Basics",          // has space, not kebab-case
  "cards": []                         // empty cards array
}
```

✅ **Right**:
```json
{
  "id": "javascript-basics",
  "cards": [{ /* ... */ }]
}
```

---

❌ **Wrong**:
```json
{
  "mcq": {
    "options": ["A", "B", "C"],       // only 3 options
    "correctAnswer": 5                // invalid index
  }
}
```

✅ **Right**:
```json
{
  "mcq": {
    "options": ["A", "B", "C", "D"],  // exactly 4 options
    "correctAnswer": 2                // valid 0-3 index
  }
}
```

---

## Maintenance & Updates

- Validate JSON before committing: `python -m json.tool data.json`
- Keep topic IDs stable (don't rename once published)
- Old cards can be marked deprecated but not deleted
- Update explanations with community feedback
- Track version history in git commits
