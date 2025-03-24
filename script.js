// Smooth scrolling for navigation
document.addEventListener('DOMContentLoaded', function() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    for (const link of links) {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerHeight = document.querySelector('.fixed-header').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    }

    // Contact form submission (prevent default for demo)
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Mensagem enviada com sucesso! (Demonstração)');
            contactForm.reset();
        });
    }
});

// Adiciona animação aos elementos quando entram no viewport
document.addEventListener('DOMContentLoaded', function() {
    // Função para verificar se um elemento está no viewport
    function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.bottom >= 0
        );
    }

    // Elementos que receberão animações
    const projectCards = document.querySelectorAll('.project-card');
    const experienceItems = document.querySelectorAll('.experience-item');
    const skillBars = document.querySelectorAll('.skill-percent');

    // Função para animar elementos quando estiverem visíveis
    function animateOnScroll() {
        // Animar cards de projetos
        projectCards.forEach(card => {
            if (isInViewport(card) && !card.classList.contains('animated')) {
                card.style.animation = 'fadeInUp 0.6s ease forwards';
                card.classList.add('animated');
            }
        });

        // Animar itens de experiência
        experienceItems.forEach(item => {
            if (isInViewport(item) && !item.classList.contains('animated')) {
                item.style.animation = 'fadeInLeft 0.6s ease forwards';
                item.classList.add('animated');
            }
        });

        // Animar barras de habilidades
        skillBars.forEach(bar => {
            if (isInViewport(bar) && !bar.classList.contains('animated')) {
                const width = bar.style.width;
                bar.style.width = '0%';
                setTimeout(() => {
                    bar.style.transition = 'width 1s ease-in-out';
                    bar.style.width = width;
                }, 100);
                bar.classList.add('animated');
            }
        });
    }

    // Verificar elementos quando a página carrega
    animateOnScroll();

    // Verificar elementos durante o scroll
    window.addEventListener('scroll', animateOnScroll);
});