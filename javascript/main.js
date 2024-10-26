document.addEventListener('DOMContentLoaded', (event) => {
    if (typeof Cookies === 'undefined') {
        console.error('Cookies.js library is not loaded.');
    } else {
        console.log('Cookies.js library loaded successfully.');
    }

    const observer = new IntersectionObserver(entries => {
        // Loop over the entries
        entries.forEach(entry => {
            if (entry.isIntersecting) { // If the element is visible
                entry.target.classList.add('animateScrollUp'); // Add the animation class
                observer.unobserve(entry.target); // Stops observing to preserve memory
            }
        });
    });
      
    document.querySelectorAll('.animateOnScroll').forEach(element => {
        observer.observe(element);
    });

    // JavaScript to handle the modal
    document.querySelectorAll('.close').forEach(closeBtn => {
        closeBtn.onclick = function() {
            const loginPopup = document.getElementById('loginPopup');
            const creditCardPopup = document.getElementById('creditCardPopup');
            const mainContent = document.getElementById('mainContent');
            if (loginPopup) {
                loginPopup.style.display = 'none';
            }
            if (creditCardPopup) {
                creditCardPopup.style.display = 'none';
            }
            if (mainContent) {
                mainContent.classList.remove('blur');
            }
        }
    });

    window.onclick = function(event) {
        const loginPopup = document.getElementById('loginPopup');
        const creditCardPopup = document.getElementById('creditCardPopup');
        const mainContent = document.getElementById('mainContent');
        if (event.target == loginPopup) {
            loginPopup.style.display = 'none';
            if (mainContent) {
                mainContent.classList.remove('blur');
            }
        }
        if (event.target == creditCardPopup) {
            creditCardPopup.style.display = 'none';
            if (mainContent) {
                mainContent.classList.remove('blur');
            }
        }
    }

    // Login credentials and catching
    const loginBtn = document.getElementById("loginBtn");
    if (loginBtn) {
        loginBtn.addEventListener("click", (e) => {
            e.preventDefault(); // Prevent form submission
            console.log("Login button clicked"); // Debugging statement
            const loginForm = document.getElementById("loginContent");
            const username = loginForm.username.value;
            const password = loginForm.password.value;
            console.log("Username:", username); // Debugging statement
            console.log("Password:", password); // Debugging statement
        
            // Call rememberMe function
            rememberMe();
        
            if (username === "czx" && password === "P@ssw0rd!23") { // Username and password
                console.log("Setting cookie with js-cookie"); // Debugging statement
                Cookies.set('username', username, { path: '/' });
                console.log("Cookie set: " + Cookies.get('username')); // Debugging statement
                loginPopup.style.display = "none";
                console.log("About to reload the page"); // Debugging statement
                alert("Welcome " + username + ", you have successfully logged in.");
                location.reload();
            } else {
                console.log("Invalid login credentials"); // Debugging statement
                document.getElementById("invalidLogin").style.display = "block";
            }
        });
    }

    // Login cookie checker for each page to enable logout button
    function getCookie(cname) {
        const cookieValue = Cookies.get(cname);
        console.log(`Getting cookie: ${cname} = ${cookieValue}`); // Debugging statement
        return cookieValue || "";
    }

    function checkLogin() {
        console.log("Checking login status..."); // Debugging statement
        let loggedUserCookie = getCookie("username");
        console.log("Retrieved cookie:", loggedUserCookie); // Debugging statement
        const navLoginBtn = document.getElementById("navLoginBtn");
        if (navLoginBtn) {
            if (loggedUserCookie != "") {
                console.log("User is logged in."); // Debugging statement
                navLoginBtn.textContent = "Logout";
            } else {
                console.log("User is not logged in."); // Debugging statement
                navLoginBtn.textContent = "Login";
            }
        }
    }

    // Logout button
    function loginLogoutTxt() {
        console.log("loginLogoutTxt function called"); // Debugging statement
        const navLoginBtn = document.getElementById("navLoginBtn");
        if (navLoginBtn && navLoginBtn.textContent === "Logout") {
            if (confirm("Are you sure you want to logout?")) {
                Cookies.remove('username', { path: '/' });
                location.reload();
            }
        } else {
            const loginPopup = document.getElementById("loginPopup");
            if (loginPopup) {
                loginPopup.style.display = "block";
                const mainContent = document.getElementById('mainContent');
                if (mainContent) {
                    mainContent.classList.add('blur');
                }
            }
        }
    }

    // Set the onclick event for the navLoginBtn button
    const navLoginBtn = document.getElementById('navLoginBtn');
    if (navLoginBtn) {
        navLoginBtn.onclick = loginLogoutTxt;
    }

    // Continue to reservation button
    const bookingForm = document.getElementById("bookingForm");
    if (bookingForm) {
        bookingForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const creditCardPopup = document.getElementById("creditCardPopup");
            if (creditCardPopup) {
                creditCardPopup.style.display = "block";
                const mainContent = document.getElementById('mainContent');
                if (mainContent) {
                    mainContent.classList.add('blur');
                }
            }
        });
    }

    // Min date for pickup date
    const pickUpDate = document.getElementById("pickUpDate");
    if (pickUpDate) {
        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth() + 1;
        var yyyy = today.getFullYear();
        if (dd < 10) {
           dd = '0' + dd;
        }

        if (mm < 10) {
           mm = '0' + mm;
        }
        today = yyyy + '-' + mm + '-' + dd;
        pickUpDate.setAttribute("min", today);

        // Sets min return date to be 1 day after pickup date
        pickUpDate.addEventListener("change", (e) => {
            var pickUpDateValue = new Date(pickUpDate.value);
            pickUpDateValue.setDate(pickUpDateValue.getDate() + 1)

            var dd = pickUpDateValue.getDate();
            var mm = pickUpDateValue.getMonth() + 1;
            var yyyy = pickUpDateValue.getFullYear();
            if (dd < 10) {
                dd = '0' + dd;
            }
            if (mm < 10) {
                mm = '0' + mm;
            }
            minRental = yyyy + '-' + mm + '-' + dd;
            document.getElementById("returnDate").setAttribute("min", minRental);
        });
    }

    // Credit card validation
    const cardNumber = document.getElementById("cardNumber");
    if (cardNumber) {
        let visa = document.getElementById("visa");
        let mastercard = document.getElementById("mastercard");
        let amex = document.getElementById("amex");
        cardNumber.onkeyup = function() {

            visa.classList.add("transparent");
            mastercard.classList.add("transparent");
            amex.classList.add("transparent");

            var visaRegEx = /^4[0-9]{12}(?:[0-9]{3})?$/;
            var masterRegEx = /^5[1-5][0-9]{14}$|^2(?:2(?:2[1-9]|[3-9][0-9])|[3-6][0-9][0-9]|7(?:[01][0-9]|20))[0-9]{12}$/;
            var amexRegEx = /^3[47][0-9]{13}$/;
            
            if (cardNumber.value.replace(/\s/g, "").match(visaRegEx)) { // Toggles respective card that has been keyed in, based on regex
                visa.classList.remove("transparent");
            } else if (cardNumber.value.replace(/\s/g, "").match(masterRegEx)) {
                mastercard.classList.remove("transparent");
            } else if (cardNumber.value.replace(/\s/g, "").match(amexRegEx)) {
                amex.classList.remove("transparent");
            }
        }
    }

    // Reservation confirmed
    const creditCardContent = document.getElementById("creditCardContent");
    if (creditCardContent) {
        creditCardContent.addEventListener("submit", (e) => {
            e.preventDefault();
            
            if (visa.classList.contains("transparent") && mastercard.classList.contains("transparent") && amex.classList.contains("transparent")) {
                alert("Please check your card details.")
            } else {
                location.href='confirm.html'
            }
        });
    }

    // Ensure checkLogin is defined globally
    window.checkLogin = checkLogin;

    // Call checkLogin on page load
    checkLogin();
});