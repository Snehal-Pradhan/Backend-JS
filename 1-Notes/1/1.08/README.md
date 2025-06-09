# Book Directory API

## Routes

| Endpoint       | Method | Description               | Response Example |
|---------------|--------|---------------------------|------------------|
| `/books`      | GET    | Get all books             | `[{ id: 1, title: "The Hobbit", ... }]` |
| `/books/:id`  | GET    | Get a book by ID          | `{ id: 1, title: "The Hobbit", ... }` |

## Data Structure
```javascript
const books = [
  { id: 1, title: "The Hobbit", author: "J.R.R. Tolkien" },
  { id: 2, title: "1984", author: "George Orwell" }
];