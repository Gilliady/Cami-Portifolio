const translations = {
    en: {
        "page-title": "Camila Ferreira - Audiovisual Producer",
        "hero-title": "AUDIOVISUAL<br>PRODUCER",
        "hero-subtitle": "The intersection of design, art, and technology.",
        "hero-desc": "Creating visual experiences for a digital world.<br>Unleashing your project's full potential.",
        "about-title": "ABOUT",
        "about-p1": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed condimentum purus eu cursus fermentum. Sed lacinia purus eget ullamcorper faucibus. Phasellus pharetra gravida enim at maximus. Cras consectetur luctus egestas. Curabitur interdum nisi eu pharetra bibendum. Nunc fermentum luctus ultricies. Aliquam dui eros, congue id lobortis a, iaculis non neque. Quisque eget placerat mi. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.",
        "about-p2": "Phasellus a congue lacus, et lobortis ante. Donec consequat, massa in hendrerit vehicula, quam nisi luctus magna, in vestibulum nulla sem sed felis. Phasellus vitae leo ullamcorper lacus blandit vulputate. Praesent volutpat suscipit gravida. Aliquam euismod sodales commodo. In tristique nisi id tempor tempus. Integer at nunc et nulla varius vulputate eu in tortor. Vivamus vel arcu non est tincidunt mollis id sit amet ipsum.",
        "stat-1": "years of<br>experience",
        "stat-2": "awards and<br>nominations",
        "stat-3": "successful<br>deliveries",
        "stat-4": "total views<br>generated",
        "projects-title": "PROJECTS",
        "contact-title": "CONTACT",
        "label-name": "Name",
        "label-email": "E-mail",
        "label-message": "Message",
        "btn-submit": "Contact Us"
    },
    pt: {
        "page-title": "Camila Ferreira - Produtora Audiovisual",
        "hero-title": "PRODUTORA<br>AUDIOVISUAL",
        "hero-subtitle": "A intersecção do design, arte e tecnologia.",
        "hero-desc": "Criando experiências visuais para um mundo digital.<br>Desbloqueando todo o potencial do seu projeto.",
        "about-title": "SOBRE",
        "about-p1": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed condimentum purus eu cursus fermentum. Sed lacinia purus eget ullamcorper faucibus. Phasellus pharetra gravida enim at maximus. Cras consectetur luctus egestas. Curabitur interdum nisi eu pharetra bibendum. Nunc fermentum luctus ultricies. Aliquam dui eros, congue id lobortis a, iaculis non neque. Quisque eget placerat mi. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.",
        "about-p2": "Phasellus a congue lacus, et lobortis ante. Donec consequat, massa in hendrerit vehicula, quam nisi luctus magna, in vestibulum nulla sem sed felis. Phasellus vitae leo ullamcorper lacus blandit vulputate. Praesent volutpat suscipit gravida. Aliquam euismod sodales commodo. In tristique nisi id tempor tempus. Integer at nunc et nulla varius vulputate eu in tortor. Vivamus vel arcu non est tincidunt mollis id sit amet ipsum.",
        "stat-1": "anos de<br>experiência",
        "stat-2": "prêmios e<br>indicações",
        "stat-3": "entregas de<br>sucesso",
        "stat-4": "total de views<br>geradas",
        "projects-title": "PROJETOS",
        "contact-title": "CONTATO",
        "label-name": "Nome",
        "label-email": "E-mail",
        "label-message": "Mensagem",
        "btn-submit": "Fale Conosco"
    }
};

document.addEventListener("DOMContentLoaded", () => {
    const langElements = document.querySelectorAll("[data-i18n]");
    const enBtn = document.getElementById("btn-en");
    const ptBtn = document.getElementById("btn-pt");

    function setLanguage(lang) {
        langElements.forEach(el => {
            if (el.tagName !== "TITLE") {
                el.classList.add("fade-out");
            }
        });

        setTimeout(() => {
            langElements.forEach(el => {
                const key = el.getAttribute("data-i18n");
                if (translations[lang][key]) {
                    if (el.tagName === "TITLE") {
                        document.title = translations[lang][key];
                    } else {
                        el.innerHTML = translations[lang][key];
                        el.classList.remove("fade-out");
                    }
                }
            });
        }, 300);

        if (lang === "en") {
            enBtn.classList.add("active");
            ptBtn.classList.remove("active");
        } else {
            ptBtn.classList.add("active");
            enBtn.classList.remove("active");
        }
    }

    if (enBtn) {
        enBtn.addEventListener("click", () => setLanguage("en"));
    }
    if (ptBtn) {
        ptBtn.addEventListener("click", () => setLanguage("pt"));
    }
});

/* =========================================
   PROJECT FILTER
========================================= */
const filterBtns = document.querySelectorAll('.filter-btn');
const projectItems = document.querySelectorAll('.project-item');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filter = btn.getAttribute('data-filter');

        projectItems.forEach(item => {
            if (item.getAttribute('data-category') === filter) {
                item.classList.remove('hidden');
            } else {
                item.classList.add('hidden');
            }
        });
    });
});
