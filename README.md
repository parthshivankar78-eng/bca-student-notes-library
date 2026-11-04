<div align="center">
📚 BCA Student Library
A modern Library Management System built for BCA students

</div>
📖 About the Project

BCA Student Library is a web application that helps manage books, students, and borrowing records in one place. It replaces manual registers with a fast, simple, and organized digital system.

✨ Features
🔐 Secure Login – Separate access for admin and students
📕 Book Management – Add, update, delete, and search books
👨‍🎓 Student Records – Register and manage student profiles
🔄 Issue & Return – Track borrowed and returned books
⏰ Due Dates & Fines – Automatic fine calculation
🔎 Smart Search – Find books by title, author, or category
📊 Reports – View issued, available, and overdue books

🛠️ Tech Stack
Layer	Technology
Frontend	HTML, CSS, JavaScript
Backend	PHP
Database	MySQL
Server	Apache (XAMPP)

🚀 Getting Started
Prerequisites
XAMPP (Apache + MySQL + PHP)
A web browser
Git
Installation
Clone the repository into your XAMPP htdocs folder:
bash
   cd C:/xampp/htdocs
   git clone https://github.com/your-username/bca-student-library.git
Start Apache and MySQL from the XAMPP Control Panel.
Create the database:
Open phpMyAdmin
Create a new database named library
Click Import and select the .sql file from the project folder
Configure the database connection in db.php (or config.php):
php
   $host = "localhost";
   $user = "root";
   $db   = "library";
Run the project: open http://localhost/bca-student-library 🎉
📂 Project Structure
bca-student-library/
├── css/             # Stylesheets
├── js/              # JavaScript files
├── images/          # Images and icons
├── database/        # SQL file
├── db.php           # Database connection
├── index.php        # Home page
├── login.php        # Login page
└── README.md
📸 Screenshots

Add your screenshots in a screenshots/ folder and link them here.

Home Page	Books Page
Home	Books
🔮 Future Improvements
📧 Email notifications for due dates
📱 Fully mobile-responsive design
🌙 Dark mode
📥 Export reports as PDF / Excel
🤝 Contributing
Fork the project
Create your branch (git checkout -b feature/NewFeature)
Commit your changes (git commit -m "Add NewFeature")
Push to the branch (git push origin feature/NewFeature)
Open a Pull Request
📄 License

This project is licensed under the MIT License.

👤 Author

Parth Shivankar

<div align="center">

⭐ If you like this project, please give it a star! ⭐
BCA Student

</div>
