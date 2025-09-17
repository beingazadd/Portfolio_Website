/* ======================== Toggle Icon Navbar (for Mobile) ======================== */
let scrollTopBtn = document.querySelector('#scrollTopBtn'); // <-- ADD THIS LINE

// ... (rest of the code)

let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');

menuIcon.onclick = () => {
    menuIcon.classList.toggle('fa-xmark'); // Toggles the hamburger icon to a close icon (X)
    navbar.classList.toggle('active'); // Toggles the visibility of the navigation menu
};

/* ======================== Scroll Section Active Link ======================== */
let sections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('header nav a');

window.onscroll = () => {
    sections.forEach(sec => {
        let top = window.scrollY;
        let offset = sec.offsetTop - 150; // 150px offset for better trigger timing
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');

         let header = document.querySelector('.header');
    header.classList.toggle('sticky', window.scrollY > 100);

     if (window.scrollY > 400) { // Show button after scrolling 400px
        scrollTopBtn.classList.add('show');
    } else {
        scrollTopBtn.classList.remove('show');
    }

        if (top >= offset && top < offset + height) {
            // Remove 'active' class from all navigation links
            navLinks.forEach(link => {
                link.classList.remove('active');
            });
            // Add 'active' class to the link corresponding to the current section
            document.querySelector('header nav a[href*=' + id + ']').classList.add('active');
        }

         menuIcon.classList.remove('fa-xmark');
    navbar.classList.remove('active');
    });

    /* ======================== Sticky Navbar ======================== */
    let header = document.querySelector('.header');
    header.classList.toggle('sticky', window.scrollY > 100);

    /* ======================== Remove Toggle Icon and Navbar When Click Navbar Link (scroll) ======================== */
    menuIcon.classList.remove('fa-xmark');
    navbar.classList.remove('active');
};

/* ======================== Scroll Reveal Animations ======================== */
ScrollReveal({
    // reset: true, // Uncomment to make animations repeat on scroll up
    distance: '80px',
    duration: 2000,
    delay: 200
});

ScrollReveal().reveal('.home-content, .heading', { origin: 'top' });
ScrollReveal().reveal('.home-img, .skills-container, .portfolio-box, .achievements-container, .contact form', { origin: 'bottom' });
ScrollReveal().reveal('.home-content h1, .about-img', { origin: 'left' });
ScrollReveal().reveal('.home-content p, .about-content', { origin: 'right' });
ScrollReveal().reveal('.timeline-item', { interval: 200, origin: 'bottom' });


/* ======================== Contact Form Submission Logic ======================== */
const form = document.getElementById('contact-form');
const result = document.getElementById('result');

form.addEventListener('submit', function(e) {
    e.preventDefault(); // Prevents the default form submission (page reload)
    
    const formData = new FormData(form);
    const object = {};
    formData.forEach((value, key) => {
        object[key] = value;
    });
    
    const json = JSON.stringify(object);
    result.innerHTML = "Sending..."; // Let the user know something is happening

    fetch('https://api.web3forms.com/submit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: json
        })
        .then(async (response) => {
            let json = await response.json();
            if (response.status == 200) {
                result.innerHTML = "Message sent successfully!";
                result.style.color = "#0ef"; // Green for success
            } else {
                console.log(response);
                result.innerHTML = json.message;
                result.style.color = "red"; // Red for error
            }
        })
        .catch(error => {
            console.log(error);
            result.innerHTML = "Something went wrong!";
            result.style.color = "red";
        })
        .then(function() {
            form.reset(); // Clear the form fields
            setTimeout(() => {
                result.innerHTML = ""; // Hide the message after 5 seconds
            }, 5000);
        });
});

/* ======================== Typed.js (Typing Animation) ======================== */
const typed = new Typed('.multiple-text', {
    strings: ['App Developer', 'Web Developer', 'UI/UX Designer'],
    typeSpeed: 100,
    backSpeed: 100,
    backDelay: 1000,
    loop: true
});