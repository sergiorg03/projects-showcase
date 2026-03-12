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
    const contactLinks = document.querySelectorAll('.contact-link');
    const user = 'sergiorodriguezprofesional';
    const domain = 'gmail.com';
    contactLinks.forEach(link => {
        link.setAttribute('href', `mailto:${user}@${domain}`);
    });


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

    // Formulario de Ideas
    const ideasForm = document.getElementById('ideas-form');
    if (ideasForm) {
        ideasForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const submitBtn = ideasForm.querySelector('.submit-btn');
            const originalText = submitBtn.innerText;
            const userEmail = `${user}@${domain}`; // Reutilizamos las variables del correo
            
            // Feedback Visual
            submitBtn.innerText = 'Enviando...';
            submitBtn.disabled = true;

            try {
                const response = await fetch(`https://formspree.io/f/xlgpbznk`, {
                    method: 'POST',
                    body: new FormData(ideasForm),
                    headers: {
                        'Accept': 'application/json'
                    }
                });

                if (response.ok) {
                    submitBtn.innerText = '¡Enviado con éxito!';
                    submitBtn.style.background = '#10b981'; // Success
                    ideasForm.reset();
                } else {
                    const data = await response.json();
                    if (data.errors) {
                        throw new Error(data.errors.map(error => error.message).join(', '));
                    } else {
                        throw new Error('Error al enviar el formulario');
                    }
                }
            } catch (error) {
                console.error('Error:', error);
                submitBtn.innerText = 'Error al enviar';
                submitBtn.style.background = '#ef4444'; // Error 
            } finally {
                setTimeout(() => {
                    submitBtn.innerText = originalText;
                    submitBtn.style.background = '';
                    submitBtn.disabled = false;
                }, 4000);
            }
        });
    }
});
