// Remember me function for login
function rememberMe() {
    const rememberCB = document.getElementById("rememberMeCB"),
          rUsername = document.getElementById("usernameField");
    if (rememberCB && rUsername) {
        if (rememberCB.checked && rUsername.value !== "") {
            localStorage.setItem('username', rUsername.value);
            localStorage.setItem('checkbox', rememberCB.value);
        } else {
            localStorage.removeItem('username');
            localStorage.removeItem('checkbox');
        }
    }
}

// Call rememberMe on page load to set the initial state
document.addEventListener('DOMContentLoaded', (event) => {
    const rememberCB = document.getElementById("rememberMeCB"),
          rUsername = document.getElementById("usernameField");
    if (rememberCB && rUsername) {
        if (localStorage.getItem('checkbox')) {
            rememberCB.checked = true;
            rUsername.value = localStorage.getItem('username');
        } else {
            rememberCB.checked = false;
            rUsername.value = "";
        }
    }
});