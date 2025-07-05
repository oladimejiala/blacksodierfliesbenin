firebase.auth().onAuthStateChanged(user => {
  if (user) {
    if (user.email === 'admin@amtech.com') {
      window.location.href = 'admin.html';
    } else {
      window.location.href = 'dashboard.html';
    }
  }
});
