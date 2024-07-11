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

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const database = firebase.database();

auth.onAuthStateChanged(user => {
    if (user) {
        const userId = user.uid;
        database.ref('users/' + userId).once('value')
            .then(snapshot => {
                const userData = snapshot.val();
                document.getElementById('profile-username').innerText = userData.username;
                document.getElementById('profile-email').innerText = userData.email;
            })
            .catch(error => {
                console.error(error);
                alert('Failed to retrieve user data.');
            });
    } else {
        // Redirect to login page if not logged in
        window.location.href = 'login.html';
    }
});

document.getElementById('logout').addEventListener('click', () => {
    auth.signOut().then(() => {
        window.location.href = 'login.html';
    }).catch(error => {
        console.error(error);
        alert('Failed to log out.');
    });
});