const usernameInput = document.getElementById("inputName");
const passwordInput = document.getElementById("inputPassword");


// Username validation
usernameInput.addEventListener("blur", function () {

    const username = usernameInput.value.trim();

    if (username !== "" && username !== "admin") {

        alert("Username must be 'admin'");

        setTimeout(() => {
            usernameInput.focus();
            usernameInput.select();
        }, 0);

    }

});


// Password validation
passwordInput.addEventListener("blur", function () {

    const password = passwordInput.value.trim();

    if (password !== "" && password !== "admin123") {

        alert("Password must be 'admin123'");

        setTimeout(() => {
            passwordInput.focus();
            passwordInput.select();
        }, 0);

    }

});


// Login button click
document.getElementById("signInBtn").addEventListener("click", function () {

    const username = usernameInput.value.trim();
    const password = passwordInput.value.trim();

    if (username === "admin" && password === "admin123") {

        alert("Login successful! Redirecting to Home Page...");

        window.location.href = "home.html";

    } else {

        alert("Invalid username or password");

        passwordInput.value = "";
        passwordInput.focus();

    }

});