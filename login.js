function login() {
    fetch('./login.json')
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        if ((document.getElementById("username").value == data.username) 
            && (document.getElementById("password").value == data.password)) {
                document.getElementById('loginform').hidden=true;
                document.getElementById('loggedin').hidden=false;
                document.getElementById('loggedin').textContent = "Welcome back \n" + data.username;
        }
        else {
            alert("Incorrect Username and/or Password")
        }
        
    })
    .catch(function (err) {
        console.log('error: ' + err);
    });
}

function signup() {
    fetch('./login.json')
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        console.log("JSON retrieved in signup()");
        for (i = 0; i < data.length; i++) {
            if (data[i].username == document.getElementById("username").value) {
                console.log("username exists in json file");
                return true;
            }
        }
        console.log("username not found, creating new entry");
        data.users.push({
                username: document.getElementById("username").value,
                password: document.getElementById("password").value
        });
        return false;
    })
    .catch(function (err) {
        console.log('error: ' + err);
    });
}
