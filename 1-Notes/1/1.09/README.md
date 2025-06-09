# Book Directory API - FS module

## Routes
| Endpoint       | Method | Description               |
|---------------|--------|---------------------------|
| `/books`      | GET    | Get all books             |
| `/books/:id`  | GET    | Get specific book by ID   |

## Data Structure
```json
[
  { "id": 1, "title": "The Hobbit", "author": "J.R.R. Tolkien" },
  { "id": 2, "title": "1984", "author": "George Orwell" }
]