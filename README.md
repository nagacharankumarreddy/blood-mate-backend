# BloodMate backend

REST API for [BloodMate](https://nagacharankumarreddy.github.io/blood-mate), a directory that connects blood donors with people who need them. Built with Express and MongoDB (Mongoose).

## Setup

```bash
npm install
cp .env.example .env   # then set MONGO_URI
npm run dev            # or: npm start
```

The API listens on `http://localhost:5000` unless `PORT` is set.

## Endpoints

| Method | Path | Description |
| --- | --- | --- |
| GET | `/health` | Service status and whether the database is connected |
| GET | `/api/donors` | List donors, newest first |
| POST | `/api/donors` | Register a donor |

### GET /api/donors

Optional query filters:

- `bloodGroup`: one of `A+ A- B+ B- O+ O- AB+ AB-` (URL-encode the `+`, for example `O%2B`)
- `location`: case-insensitive partial match

### POST /api/donors

```json
{ "name": "Asha Rao", "bloodGroup": "O+", "location": "Hyderabad", "mobile": "9876543210" }
```

| Status | Meaning |
| --- | --- |
| 201 | Donor created; the new donor is returned |
| 400 | Validation failed; `errors` maps each field to its message |
| 409 | That mobile number is already registered for that blood group |

Rules: name 2 to 80 characters, a valid blood group, a location, and a 10-digit mobile number.
