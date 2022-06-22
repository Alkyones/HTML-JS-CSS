var login_button = document.getElementById('login');

// evet listener for login
login_button.onclick = function () {
    const registered_users = { 'username': 'admin', 'password': 'admin' }
  
    // username
    const username = document.getElementById('username').value;
    console.log(username);
    // password 
    const password = document.getElementById('password').value;
    console.log(password);

    if(username === 'admin' && password === 'admin') {
        // fetch('logged.html')
        // .then(response => response.text())
        // .then(text => document.getElementById('body').innerHTML = text);
        alert('login successful');
    }
}