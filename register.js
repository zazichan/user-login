const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');
const togglePasswordButton = document.getElementById('togglePasswordButton');
const toggleIcon = document.getElementById('toggleIcon');
const togglePasswordButton1 = document.getElementById('togglePasswordButton1');
const toggleIcon1 = document.getElementById('toggleIcon1');

form.addEventListener('submit', e => {
    e.preventDefault();
    if (validateInputs()) {
        register();
    }
});

// Add event listener to trigger form submission on Enter key press
form.addEventListener('keydown', e => {
    if (e.key === 'Enter') {
        e.preventDefault();
        login();
    }
});

// Function to toggle password visibility
togglePasswordButton.addEventListener('click', e => {
    e.preventDefault(); // Prevent the form from submitting

    const type = password.getAttribute('type') === 'password' ? 'text' : 'password';
    password.setAttribute('type', type);

    // Toggle image source and alt text
    if (type === 'password') {
        toggleIcon.src = './assets/show.png';
        toggleIcon.alt = 'Show Password';
    } else {
        toggleIcon.src = './assets/hide.png';
        toggleIcon.alt = 'Hide Password';
    }
});

// Function to toggle password visibility
togglePasswordButton1.addEventListener('click', e => {
    e.preventDefault(); // Prevent the form from submitting

    const type = password2.getAttribute('type') === 'password' ? 'text' : 'password';
    password2.setAttribute('type', type);

    // Toggle image source and alt text
    if (type === 'password') {
        toggleIcon1.src = './assets/show.png';
        toggleIcon1.alt = 'Show Password';
    } else {
        toggleIcon1.src = './assets/hide.png';
        toggleIcon1.alt = 'Hide Password';
    }
});

const setError = (element, message) => {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector('.error');

    errorDisplay.innerText = message;
    inputControl.classList.add('error');
    inputControl.classList.remove('success');
}

const setSuccess = element => {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector('.error');

    errorDisplay.innerText = '';
    inputControl.classList.add('success');
    inputControl.classList.remove('error');
};

const isValidEmail = email => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

const validateInputs = () => {
    const usernameValue = username.value.trim();
    const emailValue = email.value.trim();
    const passwordValue = password.value.trim();
    const password2Value = password2.value.trim();

    let isValid = true;

    if (usernameValue === '') {
        setError(username, 'Username is required');
        isValid = false;
    } else {
        setSuccess(username);
    }

    if (emailValue === '') {
        setError(email, 'Email is required');
        isValid = false;
    } else if (!isValidEmail(emailValue)) {
        setError(email, 'Provide a valid email address');
        isValid = false;
    } else {
        setSuccess(email);
    }

    if (passwordValue === '') {
        setError(password, 'Password is required');
        isValid = false;
    } else if (passwordValue.length < 8) {
        setError(password, 'Password must be at least 8 characters.');
        isValid = false;
    } else {
        setSuccess(password);
    }

    if (password2Value === '') {
        setError(password2, 'Please confirm your password');
        isValid = false;
    } else if (password2Value !== passwordValue) {
        setError(password2, "Passwords don't match");
        isValid = false;
    } else {
        setSuccess(password2);
    }

    return isValid;
};

const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_AUTH_DOMAIN",
    databaseURL: "YOUR_DATABASE_URL",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_STORAGE_BUCKET",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID",
    measurementId: "YOUR_MEASUREMENT_ID"
};

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const database = firebase.database();

const checkUsernameAvailability = (username) => {
    return database.ref('users').orderByChild('username').equalTo(username).once('value')
        .then(snapshot => !snapshot.exists());
};

const register = () => {
    const emailValue = email.value.trim();
    const passwordValue = password.value.trim();
    const usernameValue = username.value.trim();

    auth.createUserWithEmailAndPassword(emailValue, passwordValue)
        .then(userCredential => {
            const user = userCredential.user;

            // Send email verification
            user.sendEmailVerification()
                .then(() => {
                    // Email verification sent
                    Swal.fire({
                        icon: 'info',
                        title: 'Verification Email Sent',
                        text: 'Please check your email to verify your account.',
                        confirmButtonColor: '#33a6ff'
                    }).then(() => {
                        window.location.href = 'login.html';
                    });
                }).catch(error => {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: error.message,
                        confirmButtonColor: '#33a6ff'
                    });
                });

            // Set display name
            user.updateProfile({
                displayName: usernameValue
            }).then(() => {
                // Update additional user data in Realtime Database
                database.ref('users/' + user.uid).set({
                    username: usernameValue,
                    email: emailValue,
                    emailVerified: false // Mark email as not verified initially
                });
            }).catch(error => {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: error.message,
                    confirmButtonColor: '#33a6ff'
                });
            });

        })
        .catch(error => {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: error.message,
                confirmButtonColor: '#33a6ff'
            });
        });
};