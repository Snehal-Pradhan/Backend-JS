

### 9. Complex Queries (Date Ranges, Arrays)

**Goal:** Support advanced filtering using nested query parameters
e.g. `?date[gte]=2024-01-01&tags[in]=js,node`

---

#### 🔧 Setup

```js
// GET /events?date[gte]=2024-01-01&tags[in]=js,node
app.get('/events', async (req, res) => {
  const query = {};

  if (req.query.date?.gte) {
    query.date = { $gte: new Date(req.query.date.gte) };
  }

  if (req.query.tags?.in) {
    query.tags = { $in: req.query.tags.in.split(',') };
  }

  const events = await Event.find(query);
  res.json(events);
});
```

---

#### What You Learn

* **Nested query params**: Access `req.query.date.gte` and `req.query.tags.in`
* **MongoDB comparison operators**:

  * `$gte` for filter-by-date-greater-or-equal
  * `$in` for matching values within an array
    ([stackoverflow.com][1], [prisma.io][2])

---

#### ✅ Explanation Step-by-Step

| Step                          | What It Does                                             |
| ----------------------------- | -------------------------------------------------------- |
| `req.query.date?.gte`         | Reads the `gte` filter if provided                       |
| `new Date(...)`               | Converts string to a proper Date object                  |
| `$gte: new Date(...)`         | Filters events that start on or after the specified date |
| `req.query.tags.in`           | Reads the `in` filter as a comma-separated string        |
| `.split(',')`                 | Converts it into an array (e.g. `['js','node']`)         |
| `query.tags = { $in: [...] }` | Filters events that have at least one of the given tags  |
| `Event.find(query)`           | Runs the combined filter against MongoDB                 |

---

#### 🧩 Extending This

* **Add more operators**:

  * `date[lte]`, `price[gt]`, etc.
  * `tags[nin]` (not in array)
  * `tags[all]` (must include all specified)
* **Support multiple values**:

  * Numeric or boolean filters
* **Validate with Joi**:

  ```js
  const qSchema = Joi.object({
    date: Joi.object({
      gte: Joi.date().iso()
    }).optional(),
    tags: Joi.object({
      in: Joi.string().pattern(/^[^,]+(,[^,]+)*$/)
    }).optional()
  });
  ```

---

Let me know if you want to add pagination, sorting, validation, or other operators like `$elemMatch`!

[1]: https://stackoverflow.com/questions/46926743/node-express-how-to-pass-date-params-in-url-query-string-and-how-to-parse-that?utm_source=chatgpt.com "node-express how to pass DATE params in URL query string and how to ..."
[2]: https://www.prisma.io/docs/orm/reference/prisma-client-reference?utm_source=chatgpt.com "Prisma Client API | Prisma Documentation"
