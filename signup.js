const signupForm = document.querySelector('#signup-form');

signupForm.addEventListener('submit', (e) => {
  e.preventDefault();
  
  const username = signupForm['username_signup'].value;
  const email = signupForm['email_signup'].value;
  const password = signupForm['password_signup'].value;
  
  firebase.auth().createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      const userId = user.uid;
      
      // Save user data to Firebase Realtime Database
      const userData = {
        username: username,
        email: email
      };
      
      firebase.database().ref('users/' + userId).set(userData)
        .then(() => {
          console.log('User data saved successfully!');
            alert("done");
        })
        .catch((error) => {
          console.error('Error saving user data:', error);
                alert("Lode lag gye");
        });
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error('Error creating user:', error);
      // Show error message
    });
});
