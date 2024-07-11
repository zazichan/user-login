# Registration and Login

This project provides a user registration and login system using Firebase Authentication and Realtime Database. It includes form validation, email verification, password reset functionality, and username availability checking.

## Features

- User Registration
  - Validates username, email, and password inputs
  - Checks for existing usernames in the database
  - Sends email verification after registration
  - Stores user information in Firebase Realtime Database

- User Login
  - Validates email and password inputs
  - Checks if the email is verified before allowing login

- Password Reset
  - Sends a password reset email to the user

## Technologies Used

- HTML
- CSS
- JavaScript
- Firebase (Authentication and Realtime Database)
- SweetAlert2 for alerts and notifications

## Setup and Installation

1. **Clone the repository**

   ```sh
   git clone https://github.com/zazichan/user-login.git
   cd user-login
   ```

2. **Setup Firebase**

   - Go to [Firebase Console](https://console.firebase.google.com/)
   - Create a new project
   - Add a web app to the project
   - Copy the Firebase configuration and replace it in the `firebaseConfig` object in the script

3. **Configure Firebase in your project**

   ```javascript
   const firebaseConfig = {
       apiKey: "YOUR_API_KEY",
       authDomain: "YOUR_AUTH_DOMAIN",
       projectId: "YOUR_PROJECT_ID",
       storageBucket: "YOUR_STORAGE_BUCKET",
       messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
       appId: "YOUR_APP_ID",
       measurementId: "YOUR_MEASUREMENT_ID",
       databaseURL: "YOUR_DATABASE_URL"
   };

   firebase.initializeApp(firebaseConfig);
   const auth = firebase.auth();
   const database = firebase.database();
   ```

4. **Open the `login.html` file in your browser**

   You can use a live server or simply open the file in your browser to see the login and registration forms.

## Usage

### Registration

1. Enter your username, email, and password in the registration form.
2. Confirm your password.
3. Click "Register".
4. Check your email for a verification link and verify your account.

### Login

1. Enter your email and password in the login form.
2. Click "Login".
3. If your email is verified, you will be redirected to the profile page.

### Password Reset

1. Click on the "Forgot Password" link.
2. Enter your email.
3. Click "Reset Password".
4. Check your email for the password reset link and follow the instructions.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any changes or improvements.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Acknowledgements

- [Firebase](https://firebase.google.com/) for the authentication and database services
- [SweetAlert2](https://sweetalert2.github.io/) for the alert and notification library

---

Feel free to reach out if you have any questions or need further assistance.

Happy coding!
