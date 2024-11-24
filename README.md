# API Endpoints

Below is the table of the available API endpoints for managing users.

| Action             | HTTP Method | Endpoint                            | Description                                                                             |
|--------------------|-------------|-------------------------------------|-----------------------------------------------------------------------------------------|
| List Users         | GET         | `http://127.0.0.1:8000/api/users/`  | 	Retrieve a paginated list of all users                                                 |
|Get Users by Page | GET         | `http://127.0.0.1:8000/api/users/?page=<page_number>`  | Retrieve users for a specific page number (replace <page_number> with the desired page) |
| Create User        | POST        | `http://127.0.0.1:8000/api/users/`  | Create a new user (send JSON)                                                           |
| Retrieve User      | GET         | `http://127.0.0.1:8000/api/users/{id}/` | Retrieve a specific user by ID                                                          |
| Update User        | PUT         | `http://127.0.0.1:8000/api/users/{id}/` | Update a specific user's details (send JSON)                                                        |
| Delete User        | DELETE      | `http://127.0.0.1:8000/api/users/{id}/` | Delete a specific user by ID                                                            |

## Example User JSON

Here is an example of the JSON structure for creating or updating a user:

```json
{
  "user_name": "john_doe",
  "password": "secured_password",
  "full_name": "John Doe",
  "email": "johndoe@example.com",
  "telephone": "+1234567890",
  "birthday": "1990-01-01",
  "user_role": "User"
}

```
## Fields Description

| Field Name  | Type      | Description                                                  |
|-------------|-----------|--------------------------------------------------------------|
| `user_name` | string    | Unique username used for logging in (max 100 characters).    |
| `password`  | string    | User's password, which should be hashed (max 128 characters).|
| `full_name` | string    | The full name of the user (max 200 characters).              |
| `email`     | string    | The user's unique email address (valid email format).        |
| `telephone` | string    | Contact telephone number (max 15 characters).               |
| `birthday`  | date      | The user's birthdate (format: YYYY-MM-DD).                   |
| `user_role` | string    | Role assigned to the user, either 'Admin' or 'User'. Default is 'User' |

