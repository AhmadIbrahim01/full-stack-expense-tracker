document.getElementById("login").addEventListener("submit", function(event) {
    event.preventDefault();

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    const login_form_data = new URLSearchParams();
    login_form_data.append("username", username);
    login_form_data.append("password", password);

    fetch("login.php", {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: login_form_data
    })
    .then(response => response.json())
    .then(data => {
        if (data.status === "Login Successful") {
            alert("Login Successful");
            console.log("User Data:", data.user);
            window.location.href = "home.html";
        } else {
            alert("Login Failed");
        }
    })
    .catch(error => {
        console.error("Error:", error);
        alert("Try Again");
    });
});
