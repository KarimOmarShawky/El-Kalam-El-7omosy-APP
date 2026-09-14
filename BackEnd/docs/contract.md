طبعًا. بما إن مشروع **El-Kalam El-7omosy** بينك أنت كـ Backend وصاحبك كـ Frontend، ده Contract مبدئي بسيط ومنظم تقدروا تحطوه في:

```text
API_CONTRACT.md
```

````md
# El-Kalam El-7omosy — API Contract

This document defines the communication contract between the Frontend and Backend.

## Base URL

```text
/api/v1
````

---

# Authentication

## Register

### `POST /auth/register`

Creates a new user account.

### Request Body

```json
{
  "name": "Karim",
  "email": "karim@example.com",
  "password": "12345678",
  "passwordConfirm": "12345678"
}
```

### Success Response — `201`

```json
{
  "status": "success",
  "token": "JWT_TOKEN",
  "data": {
    "user": {
      "id": "USER_ID",
      "name": "Karim",
      "email": "karim@example.com"
    }
  }
}
```

---

## Login

### `POST /auth/login`

Authenticates an existing user.

### Request Body

```json
{
  "email": "karim@example.com",
  "password": "12345678"
}
```

### Success Response — `200`

```json
{
  "status": "success",
  "token": "JWT_TOKEN",
  "data": {
    "user": {
      "id": "USER_ID",
      "name": "Karim",
      "email": "karim@example.com"
    }
  }
}
```

---

# Users

## Get User Profile

### `GET /users/:id`

Returns a user's public profile.

### Success Response — `200`

```json
{
  "status": "success",
  "data": {
    "user": {
      "id": "USER_ID",
      "name": "Karim",
      "username": "karim",
      "profileImage": "IMAGE_URL"
    }
  }
}
```

---

# Messages

## Send Anonymous Message

### `POST /messages`

Sends an anonymous message to a user.

### Request Body

```json
{
  "receiverId": "USER_ID",
  "content": "Hello!"
}
```

### Success Response — `201`

```json
{
  "status": "success",
  "data": {
    "message": {
      "id": "MESSAGE_ID",
      "content": "Hello!",
      "createdAt": "2026-09-15T12:00:00.000Z"
    }
  }
}
```

---

## Get My Messages

### `GET /messages`

Returns the authenticated user's received messages.

### Authentication

```text
Authorization: Bearer JWT_TOKEN
```

### Success Response — `200`

```json
{
  "status": "success",
  "results": 2,
  "data": {
    "messages": [
      {
        "id": "MESSAGE_ID",
        "content": "Hello!",
        "createdAt": "2026-09-15T12:00:00.000Z"
      }
    ]
  }
}
```

---

# Error Response

All API errors should follow this format:

```json
{
  "status": "fail",
  "message": "Error message"
}
```

## Common Status Codes

| Status Code | Meaning               |
| ----------- | --------------------- |
| 200         | Success               |
| 201         | Resource created      |
| 400         | Bad request           |
| 401         | Unauthorized          |
| 403         | Forbidden             |
| 404         | Resource not found    |
| 500         | Internal server error |

---

# Authentication Header

Protected endpoints require:

```text
Authorization: Bearer JWT_TOKEN
```

---

# General Rules

* All requests and responses use JSON.
* IDs are returned as strings.
* Dates use ISO 8601 format.
* Passwords must never be returned in API responses.
* Protected endpoints require authentication.
* Backend may add new fields without breaking existing fields.
* Any breaking API change must be discussed before implementation.

```

**مهم:** ده Contract مبدئي، ومش لازم تعتبره نهائي. قبل ما تبدأوا الكود فعليًا، اتفقوا على الـ endpoints والـ request/response structures، وبعدها أي تغيير في الـ API يتحدث هنا أولًا. ده هيمنع جدًا مشكلة إنك تعمل حاجة والـ Frontend يعمل افتراض مختلف.
```
