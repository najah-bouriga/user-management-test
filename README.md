# API Endpoints

Below is the table of the available API endpoints for managing users.

| Action             | HTTP Method | Endpoint                            | Description                       |
|--------------------|-------------|-------------------------------------|-----------------------------------|
| List Users         | GET         | `http://127.0.0.1:8000/api/users/`  | Retrieve a list of all users     |
| Create User        | POST        | `http://127.0.0.1:8000/api/users/`  | Create a new user (send JSON)    |
| Retrieve User      | GET         | `http://127.0.0.1:8000/api/users/{id}/` | Retrieve a specific user by ID   |
| Update User        | PUT         | `http://127.0.0.1:8000/api/users/{id}/` | Update a specific user's details |
| Delete User        | DELETE      | `http://127.0.0.1:8000/api/users/{id}/` | Delete a specific user by ID     |

## Example User JSON

Here is an example of the JSON structure for creating or updating a user:

```json
{
  "login_username": "john_doe",
  "password": "secured_password",
  "full_name": "John Doe",
  "email": "johndoe@example.com",
  "telephone": "+1234567890",
  "birthday": "1990-01-01",
  "user_role": "User"  // Can be 'Admin' or 'User'
}

## Fields Description

Below is a detailed description of each field in the user object:

- **`login_username`**: (string, max 100 characters)  
  The unique username used for logging in.

- **`password`**: (string, max 128 characters)  
  The user's password.

- **`full_name`**: (string, max 200 characters)  
  The full name of the user.

- **`email`**: (string)  
  The user's unique email address. Must be in a valid email format.

- **`telephone`**: (string, max 15 characters)  
  The user's contact telephone number.

- **`birthday`**: (date)  
  The user's birthdate. Must be in the format `YYYY-MM-DD`.

- **`user_role`**: (string)  
  The role assigned to the user. Can be either `'Admin'` or `'User'`. Default is `'User'`.

