const form = document.getElementById('form');
const email = document.getElementById('email');
const password = document.getElementById('password');
const togglePasswordButton = document.getElementById('togglePasswordButton');
const toggleIcon = document.getElementById('toggleIcon');

form.addEventListener('submit', e => {
    e.preventDefault();
    if (validateInputs()) {
        login();
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

const setError = (element, message) => {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector('.error');

    errorDisplay.innerText = message;
    inputControl.classList.add('error');
    inputControl.classList.remove('success');
}

const setSuccess = (element) => {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector('.error');

    errorDisplay.innerText = '';
    inputControl.classList.remove('error');
    inputControl.classList.add('success');
};

const isValidEmail = email => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

const validateInputs = () => {
    const emailValue = email.value.trim();
    const passwordValue = password.value.trim();

    let isValid = true;

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
    } else {
        setSuccess(password);
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

const login = () => {
    const emailValue = email.value.trim();
    const passwordValue = password.value.trim();

    auth.signInWithEmailAndPassword(emailValue, passwordValue)
        .then(userCredential => {
            const user = userCredential.user;

            if (user.emailVerified) {
                window.location.href = 'profile.html';
            } else {
                setError(email, 'Email not verified');
                auth.signOut();
            }
        })
        .catch(error => {
            setError(email, 'Wrong email or password');
        });
};

const forgotPasswordLink = document.getElementById('forgotPassword');
forgotPasswordLink.addEventListener('click', e => {
    e.preventDefault();
    const emailValue = email.value.trim();

    if (emailValue === '') {
        setError(email, 'Email is required to reset password');
        return;
    }

    auth.sendPasswordResetEmail(emailValue)
        .then(() => {
            Swal.fire({
                icon: 'success',
                title: 'Password reset email sent!',
                text: 'Check your email to reset your password.',
                confirmButtonColor: '#33a6ff'
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
});