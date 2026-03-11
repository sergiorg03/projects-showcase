function reveal() {
    var reveals = document.querySelectorAll(".reveal");
    for (var i = 0; i < reveals.length; i++) {
        var windowHeight = window.innerHeight;
        var elementTop = reveals[i].getBoundingClientRect().top;
        var elementVisible = 150;
        if (elementTop < windowHeight - elementVisible) {
            reveals[i].classList.add("active");
        } else {
            reveals[i].classList.remove("active");
        }
    }
}

window.addEventListener("scroll", reveal);

// Comprobacion inicial y configuración
document.addEventListener("DOMContentLoaded", () => {
    reveal();

    // Email
    const contactBtn = document.getElementById('contact-btn');
    const user = 'sergiorodriguezprofesional';
    const domain = 'gmail.com';
    contactBtn.setAttribute('href', `mailto:${user}@${domain}`) // Asignamos el atributo HREF con el valor correcto para el correo


    // Smooth scroll
    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            if (this.getAttribute('href').startsWith('#')) {
                e.preventDefault();
                const targetId = this.getAttribute('href').substring(1);
                const targetElement = document.getElementById(targetId);
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 80, // Offset para el encabezado.
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
});
