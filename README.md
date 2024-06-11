# TimeTableGenerator
This project involves designing a Timetable generation system for college students. It enables the administrators to create, manage and update class timetables efficiently. It assists both students and faculty members in managing their timetables, reducing scheduling conflicts and the login page verifies user credentials before granting access to the timetable management page.<br>
This project is designed using **Html**,**CSS** and **JavaScript**. It can run in editors like Sublime and Visual Studio.

__Description of all modules in project__<br> 
The provided code appears to be an HTML-based web application for managing class 
timetables and user logins. Here's a brief module description for the code components 
* __index.html__: This is the main HTML file for the web application. It includes a form for selecting 
a class and creating a timetable. The timetable is organized by days of the week and time slots. 
There's a "Submit" button to save the timetable data. 
* __login.html__: This HTML file represents the login page of the application. It includes a form for 
entering a username and password. Users can log in to access the dashboard. 
* __style-login.css__: CSS file for styling the login page. Defines the appearance of the login form, 
buttons, and background. 
* __style.css__: CSS file for styling the main timetable page. Defines styles for tables, buttons, and 
other elements. 
* __app.js__: JavaScript file for handling functionality on the main timetable page. Populates class 
and subject dropdowns. Manages the loading and validation of timetable data. Allows users to 
create and save timetables. 
* __login.js__: JavaScript file for handling login functionality. Validates user login credentials. 
Redirects users to the main timetable page upon successful login. 
* __User Class (in login.js)__: Represents a user with properties like id, pass (password), and role 
(user role). 
* __User List (in login.js)__:  a list of predefined users with their credentials and roles. 
* __Session Storage Usage (in login.js)__: Utilizes session Storage to store user role and username 
after successful login for authentication purposes. 
* __Background Image (in style-login.css)__: Sets a background image for the login page. The code 
seems to be a prototype for a class timetable management system with a simple user 
authentication mechanism. Users can log in to access their respective timetables, and timetable 
data is saved within the JavaScript code itself. This code would need further development, 
especially on the backend, to make it fully functional in a real-world scenario with a database 
for storing timetable and user data securely.
