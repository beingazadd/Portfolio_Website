let scrollTopBtn = document.querySelector('#scrollTopBtn'); 

let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');

menuIcon.onclick = () => {
    menuIcon.classList.toggle('fa-xmark'); 
    navbar.classList.toggle('active'); 
};

let sections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('header nav a');

window.onscroll = () => {
    sections.forEach(sec => {
        let top = window.scrollY;
        let offset = sec.offsetTop - 150; 
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');

         let header = document.querySelector('.header');
    header.classList.toggle('sticky', window.scrollY > 100);

     if (window.scrollY > 400) { 
        scrollTopBtn.classList.add('show');
    } else {
        scrollTopBtn.classList.remove('show');
    }

        if (top >= offset && top < offset + height) {
            navLinks.forEach(link => {
                link.classList.remove('active');
            });
            document.querySelector('header nav a[href*=' + id + ']').classList.add('active');
        }

         menuIcon.classList.remove('fa-xmark');
    navbar.classList.remove('active');
    });

    let header = document.querySelector('.header');
    header.classList.toggle('sticky', window.scrollY > 100);

    menuIcon.classList.remove('fa-xmark');
    navbar.classList.remove('active');
};


ScrollReveal({
    distance: '80px',
    duration: 2000,
    delay: 200
});

ScrollReveal().reveal('.home-content, .heading', { origin: 'top' });
ScrollReveal().reveal('.home-img, .skills-container, .portfolio-box, .achievements-container, .contact form', { origin: 'bottom' });
ScrollReveal().reveal('.home-content h1, .about-img', { origin: 'left' });
ScrollReveal().reveal('.home-content p, .about-content', { origin: 'right' });
ScrollReveal().reveal('.timeline-item', { interval: 200, origin: 'bottom' });


const form = document.getElementById('contact-form');
const result = document.getElementById('result');

form.addEventListener('submit', function(e) {
    e.preventDefault(); 
    
    const formData = new FormData(form);
    const object = {};
    formData.forEach((value, key) => {
        object[key] = value;
    });
    
    const json = JSON.stringify(object);
    result.innerHTML = "Sending..."; 

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
                result.style.color = "#0ef"; 
            } else {
                console.log(response);
                result.innerHTML = json.message;
                result.style.color = "red"; 
            }
        })
        .catch(error => {
            console.log(error);
            result.innerHTML = "Something went wrong!";
            result.style.color = "red";
        })
        .then(function() {
            form.reset(); 
            setTimeout(() => {
                result.innerHTML = ""; 
            }, 5000);
        });
});

const typed = new Typed('.multiple-text', {
    strings: ['App Developer', 'Web Developer', 'UI/UX Designer'],
    typeSpeed: 100,
    backSpeed: 100,
    backDelay: 1000,
    loop: true
});