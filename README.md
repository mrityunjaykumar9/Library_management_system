# Library Management System

Welcome to the Library Management System! This software facilitates user logins and registrations on the website, supporting two types of users: customers and administrators.

## Features

### For Customers:
- **User Registration and Login:** Customers can create accounts and log in securely.
- **Book Issuing and Returning:** Customers can borrow and return books from the library.
- **Book Search:** Search for books by title, author.

### For Administrators:
- **Admin Login:** Administrators have separate login credentials.
- **Book Management:** Add new books to the database and delete existing ones.
- **Book Search:** Administrators can search for books in the library.

## Technologies Used

- **Backend:** Node.js, Express.js, MongoDB
- **Frontend:** React.js, Bootstrap, HTML, CSS, Javascript
- **Authentication:** JSON Web Tokens (JWT)
- **Database:** MongoDB (can be customized to other databases)

## Installation

1. Clone the repository: `git clone https://github.com/mrityunjaykumar9/Library_management_system.git`
2. Install dependencies:
   - CMD : `npm install`

3. Set up the database: Ensure MongoDB is installed and running.
4. Configure environment variables: Create a `.env` file based on the provided `.env.example` files in the `backend` directory.
5. Run the application:
   - CMD : `node src/app.js`
   
## Usage

- Access the application through your browser at `http://localhost:3000`.
- Customers can log in to borrow or return books and search the library.
- Administrators can log in to manage the library database, add or remove books, and search the library inventory.


## Acknowledgements

- This project was inspired by DR. Renu dhir ma'am.
- Special thanks to Suchi ma'm for their valuable contributions.

## Contact

For inquiries or support, contact mrityunjaykumar579@gmail.com.
