/* =================================
   SUMIT DIGITAL ASSIST
   MAIN JAVASCRIPT
================================ */


/* ================================
   MOBILE MENU
================================ */

const menuToggle =
    document.getElementById("menuToggle");

const mobileMenu =
    document.getElementById("mobileMenu");


function setMobileMenu(open) {

    mobileMenu.classList.toggle("active", open);

    menuToggle.setAttribute(
        "aria-expanded",
        String(open)
    );

    menuToggle.setAttribute(
        "aria-label",
        open ? "Close menu" : "Open menu"
    );

    mobileMenu.setAttribute(
        "aria-hidden",
        String(!open)
    );

}


menuToggle.addEventListener("click", () => {

    setMobileMenu(
        !mobileMenu.classList.contains("active")
    );

});


document
    .querySelectorAll(".mobile-menu a")
    .forEach(link => {

        link.addEventListener("click", () => {

            setMobileMenu(false);

        });

    });


document.addEventListener("click", event => {

    if (
        mobileMenu.classList.contains("active") &&
        !mobileMenu.contains(event.target) &&
        !menuToggle.contains(event.target)
    ) {

        setMobileMenu(false);

    }

});


window.addEventListener("resize", () => {

    if (window.innerWidth > 850) {

        setMobileMenu(false);

    }

});


/* ================================
   DARK MODE
================================ */

const themeToggle =
    document.getElementById("themeToggle");


const savedTheme =
    localStorage.getItem("sumitTheme");


const themeColorMeta =
    document.getElementById("themeColorMeta");


function updateThemeUI(darkMode) {

    themeToggle.textContent =
        darkMode ? "☀" : "☾";

    themeToggle.setAttribute(
        "aria-pressed",
        String(darkMode)
    );

    themeToggle.setAttribute(
        "aria-label",
        darkMode
            ? "Switch to light mode"
            : "Switch to dark mode"
    );


    if (themeColorMeta) {

        themeColorMeta.setAttribute(
            "content",
            darkMode ? "#000000" : "#ffffff"
        );

    }

}


if (savedTheme === "dark") {

    document.body.classList.add("dark");

}


updateThemeUI(
    document.body.classList.contains("dark")
);


themeToggle.addEventListener("click", () => {

    document.body.classList.toggle("dark");


    const darkMode =
        document.body.classList.contains("dark");


    updateThemeUI(darkMode);


    localStorage.setItem(
        "sumitTheme",
        darkMode ? "dark" : "light"
    );

});


/* ================================
   SERVICE CAROUSEL
================================ */

const services = [

    {
        title: "Passport Assistance",
        category: "GOVERNMENT DOCUMENT",
        description:
            "Professional assistance with your passport application and related online process.",
        price: "₹499",
        fee: "+ official fee",
        icon: "PASSPORT",
        image: "images/services images/passport.png"
    },

    {
        title: "PAN Card",
        category: "TAX & IDENTITY",
        description:
            "Get assistance with your PAN Card application and online submission process.",
        price: "₹199",
        fee: "+ official fee",
        icon: "PAN CARD",
        image: "images/services images/pan.png"
    },

    {
        title: "PAN Correction",
        category: "TAX & IDENTITY",
        description:
            "Need to update or correct your PAN details? Get step-by-step assistance.",
        price: "₹199",
        fee: "+ official fee",
        icon: "PAN UPDATE",
        image: "images/services images/pan.png"
    },

    {
        title: "Voter ID",
        category: "IDENTITY DOCUMENT",
        description:
            "Assistance with new Voter ID applications and related online services.",
        price: "₹149",
        fee: "service charge",
        icon: "VOTER ID",
        image: "images/services images/voter.jpg"
    },

    {
        title: "PF / EPFO",
        category: "EMPLOYEE SERVICES",
        description:
            "Get assistance with PF-related online services, claims and EPFO processes.",
        price: "₹299",
        fee: "onwards",
        icon: "EPFO",
        image: "images/services images/epfo.jpg"
    },

    {
        title: "ESIC",
        category: "EMPLOYEE SERVICES",
        description:
            "Professional assistance for ESIC-related online services and forms.",
        price: "₹299",
        fee: "onwards",
        icon: "ESIC",
        image: "images/services images/esic.png"
    },

    {
        title: "Himcare Card",
        category: "HEALTH BENEFIT",
        description:
            "Assistance with Himcare card application and related online processes.",
        price: "₹199",
        fee: "onwards",
        icon: "HIMCARE",
        image: "images/services images/himcare.jpg"
    },

    {
        title: "Aadhaar Assistance",
        category: "IDENTITY DOCUMENT",
        description:
            "Assistance with Aadhaar-related online services and document processes.",
        price: "₹149",
        fee: "onwards",
        icon: "AADHAAR",
        image: "images/services images/adhhar.png"
    },

    {
        title: "Online Forms",
        category: "DIGITAL ASSISTANCE",
        description:
            "Professional assistance for online applications, forms and submissions.",
        price: "₹99",
        fee: "onwards",
        icon: "ONLINE FORM",
        image: "images/services images/online form.jpg"
    },

    {
        title: "Normal Train Ticket",
        category: "TRAVEL ASSISTANCE",
        description:
            "Assistance with normal train ticket booking and online reservation process.",
        price: "₹99",
        fee: "/ ticket",
        icon: "TRAIN",
        image: "images/services images/train.png"
    },

    {
        title: "Tatkal Booking Assistance",
        category: "TRAVEL ASSISTANCE",
        description:
            "Fast assistance with Tatkal train booking and related online process.",
        price: "₹199",
        fee: "/ ticket",
        icon: "TATKAL",
        image: "images/services images/train.png"
    },

    {
        title: "Other Document Services",
        category: "DIGITAL ASSISTANCE",
        description:
            "Need help with another document or online service? Contact us for assistance.",
        price: "₹199",
        fee: "onwards",
        icon: "MORE",
        image: "images/services images/other documents.jpg"
    }

];


let currentService = 0;

let isServiceAnimating = false;


const stage =
    document.querySelector(".service-stage");


const serviceContent =
    stage.querySelector(".service-content");


const serviceVisual =
    stage.querySelector(".service-visual");


const serviceNumber =
    document.getElementById("serviceNumber");


const serviceCategory =
    document.getElementById("serviceCategory");


const serviceTitle =
    document.getElementById("serviceTitle");


const serviceDescription =
    document.getElementById("serviceDescription");


const servicePrice =
    document.getElementById("servicePrice");


const serviceFee =
    document.getElementById("serviceFee");


const documentNumber =
    document.getElementById("documentNumber");


const documentIcon =
    document.getElementById("documentIcon");


const serviceImage =
    document.getElementById("serviceImage");


const documentLines =
    document.getElementById("documentLines");


const nextService =
    document.getElementById("nextService");


const prevService =
    document.getElementById("prevService");


const serviceDots =
    document.getElementById("serviceDots");


/* ================================
   RENDER SERVICE
================================ */

function renderService() {

    const service =
        services[currentService];


    const number =
        String(currentService + 1)
            .padStart(2, "0");


    serviceNumber.textContent =
        number;


    serviceCategory.textContent =
        service.category;


    serviceTitle.textContent =
        service.title;


    serviceDescription.textContent =
        service.description;


    servicePrice.textContent =
        service.price;


    serviceFee.textContent =
        service.fee;


    documentNumber.textContent =
        `${number} / ${services.length}`;


    documentIcon.textContent =
        service.icon;


    if (service.image) {

        serviceImage.src = service.image;
        serviceImage.alt = service.title;
        serviceImage.hidden = false;
        documentIcon.hidden = true;
        documentLines.classList.add("has-image");

    }

    else {

        serviceImage.hidden = true;
        serviceImage.removeAttribute("src");
        serviceImage.alt = "";
        documentIcon.hidden = false;
        documentLines.classList.remove("has-image");

    }


    document
        .querySelectorAll(".service-dot")
        .forEach((dot, index) => {

            dot.classList.toggle(
                "active",
                index === currentService
            );

        });

}


/* ================================
   CREATE DOTS
================================ */

services.forEach((_, index) => {

    const dot =
        document.createElement("button");


    dot.className =
        "service-dot";


    dot.type =
        "button";


    dot.setAttribute(
        "aria-label",
        `Go to service ${index + 1}`
    );


    dot.addEventListener("click", () => {

        if (
            isServiceAnimating ||
            index === currentService
        ) {

            return;

        }


        const direction =
            index > currentService
                ? "next"
                : "prev";


        changeService(
            direction,
            index
        );

    });


    serviceDots.appendChild(dot);

});


/* ================================
   ANIMATION HELPER
================================ */

function animateElement(
    element,
    keyframes,
    options
) {

    if (!element) {

        return Promise.resolve();

    }


    return new Promise(resolve => {

        const animation =
            element.animate(
                keyframes,
                options
            );


        animation.onfinish = () => {

            animation.cancel();

            resolve();

        };


        animation.oncancel = () => {

            resolve();

        };

    });

}


/* ================================
   CHANGE SERVICE
================================ */

async function changeService(
    direction,
    targetIndex = null
) {

    if (isServiceAnimating) {

        return;

    }


    isServiceAnimating = true;


    const isNext =
        direction === "next";


    /*
        NEXT

        Old → LEFT
        New ← RIGHT


        PREVIOUS

        Old → RIGHT
        New ← LEFT
    */


    const exitX =
        isNext ? -130 : 130;


    const enterX =
        isNext ? 130 : -130;


    /* =========================
       OLD SERVICE GOES OUT
    ========================= */

    await Promise.all([

        animateElement(
            serviceContent,

            [
                {
                    transform:
                        "translate3d(0,0,0)",

                    opacity: 1,

                    filter:
                        "blur(0px)"
                },

                {
                    transform:
                        `translate3d(${exitX}px,0,0)`,

                    opacity: 0,

                    filter:
                        "blur(8px)"
                }
            ],

            {
                duration: 520,

                easing:
                    "cubic-bezier(0.65,0,0.35,1)",

                fill: "forwards"
            }
        ),


        animateElement(
            serviceVisual,

            [
                {
                    transform:
                        "translate3d(0,0,0)",

                    opacity: 1,

                    filter:
                        "blur(0px)"
                },

                {
                    transform:
                        `translate3d(${exitX}px,0,0)`,

                    opacity: 0,

                    filter:
                        "blur(8px)"
                }
            ],

            {
                duration: 520,

                easing:
                    "cubic-bezier(0.65,0,0.35,1)",

                fill: "forwards"
            }
        )

    ]);


    /* =========================
       CHANGE DATA
    ========================= */

    if (targetIndex !== null) {

        currentService =
            targetIndex;

    }

    else if (isNext) {

        currentService =
            (currentService + 1)
            % services.length;

    }

    else {

        currentService =
            (
                currentService - 1
                + services.length
            )
            % services.length;

    }


    renderService();


    /* =========================
       NEW SERVICE START POSITION
    ========================= */

    serviceContent.style.transform =
        `translate3d(${enterX}px,0,0)`;


    serviceContent.style.opacity =
        "0";


    serviceContent.style.filter =
        "blur(8px)";


    serviceVisual.style.transform =
        `translate3d(${enterX}px,0,0)`;


    serviceVisual.style.opacity =
        "0";


    serviceVisual.style.filter =
        "blur(8px)";


    /* Force repaint */

    void stage.offsetWidth;


    /* =========================
       NEW SERVICE COMES IN
    ========================= */

    await Promise.all([

        animateElement(
            serviceContent,

            [
                {
                    transform:
                        `translate3d(${enterX}px,0,0)`,

                    opacity: 0,

                    filter:
                        "blur(8px)"
                },

                {
                    transform:
                        "translate3d(0,0,0)",

                    opacity: 1,

                    filter:
                        "blur(0px)"
                }
            ],

            {
                duration: 680,

                easing:
                    "cubic-bezier(0.22,1,0.36,1)",

                fill: "forwards"
            }
        ),


        animateElement(
            serviceVisual,

            [
                {
                    transform:
                        `translate3d(${enterX}px,0,0)`,

                    opacity: 0,

                    filter:
                        "blur(8px)"
                },

                {
                    transform:
                        "translate3d(0,0,0)",

                    opacity: 1,

                    filter:
                        "blur(0px)"
                }
            ],

            {
                duration: 680,

                easing:
                    "cubic-bezier(0.22,1,0.36,1)",

                fill: "forwards"
            }
        )

    ]);


    /* =========================
       CLEANUP
    ========================= */

    serviceContent.style.transform =
        "";

    serviceContent.style.opacity =
        "";

    serviceContent.style.filter =
        "";


    serviceVisual.style.transform =
        "";

    serviceVisual.style.opacity =
        "";

    serviceVisual.style.filter =
        "";


    isServiceAnimating = false;

}


/* ================================
   NEXT
================================ */

nextService.addEventListener(
    "click",
    () => {

        changeService("next");

    }
);


/* ================================
   PREVIOUS
================================ */

prevService.addEventListener(
    "click",
    () => {

        changeService("prev");

    }
);


/* ================================
   INITIAL SERVICE
================================ */

renderService();


/* ================================
   APPLY NOW
================================ */

const serviceApply =
    document.getElementById(
        "serviceApply"
    );


serviceApply.addEventListener(
    "click",
    () => {

        const contact =
            document.getElementById(
                "contact"
            );


        const serviceSelect =
            document.getElementById(
                "serviceSelect"
            );


        const currentTitle =
            services[currentService].title;


        const option =
            [
                ...serviceSelect.options
            ].find(
                option =>
                    option.value.toLowerCase()
                    === currentTitle.toLowerCase()
            );


        if (option) {

            serviceSelect.value =
                option.value;

        }


        contact.scrollIntoView({
            behavior: "smooth"
        });

    }
);


/* ================================
   TOUCH SWIPE
================================ */

let touchStartX = 0;

let touchEndX = 0;


stage.addEventListener(
    "touchstart",
    event => {

        touchStartX =
            event.changedTouches[0].screenX;

    },
    {
        passive: true
    }
);


stage.addEventListener(
    "touchend",
    event => {

        touchEndX =
            event.changedTouches[0].screenX;


        const difference =
            touchEndX - touchStartX;


        if (
            Math.abs(difference) < 50
        ) {

            return;

        }


        if (difference < 0) {

            changeService("next");

        }

        else {

            changeService("prev");

        }

    },
    {
        passive: true
    }
);


/* ================================
   KEYBOARD
================================ */

document.addEventListener(
    "keydown",
    event => {

        const activeTag =
            document.activeElement?.tagName;


        const isEditing =
            [
                "INPUT",
                "TEXTAREA",
                "SELECT"
            ].includes(activeTag) ||
            document.activeElement?.isContentEditable;


        if (
            event.key === "Escape" &&
            mobileMenu.classList.contains("active")
        ) {

            setMobileMenu(false);

            menuToggle.focus();

            return;

        }


        if (isEditing) {

            return;

        }


        if (
            event.key === "ArrowRight"
        ) {

            changeService("next");

        }


        if (
            event.key === "ArrowLeft"
        ) {

            changeService("prev");

        }

    }
);


/* ================================
   SCROLL REVEAL
================================ */

const revealElements =
    document.querySelectorAll(
        ".reveal"
    );


const revealObserver =
    new IntersectionObserver(
        entries => {

            entries.forEach(entry => {

                if (
                    entry.isIntersecting
                ) {

                    entry.target
                        .classList
                        .add("visible");


                    revealObserver
                        .unobserve(
                            entry.target
                        );

                }

            });

        },

        {
            threshold: 0.12
        }
    );


revealElements.forEach(element => {

    revealObserver.observe(
        element
    );

});


/* ================================
   CONTACT FORM
================================ */

const contactForm =
    document.getElementById(
        "contactForm"
    );


const formMessage =
    document.getElementById(
        "formMessage"
    );


contactForm.addEventListener(
    "submit",
    async event => {

        event.preventDefault();


        const name =
            document
                .getElementById("name")
                .value
                .trim();


        const email =
            document
                .getElementById("email")
                .value
                .trim();


        const service =
            document
                .getElementById("serviceSelect")
                .value;


        if (
            !name ||
            !email ||
            !service
        ) {

            formMessage.textContent =
                "Please fill in the required details.";

            return;

        }


        formMessage.textContent =
            "Sending your request...";


        const submitButton =
            contactForm.querySelector(
                'button[type="submit"]'
            );


        submitButton.disabled = true;


        submitButton.setAttribute(
            "aria-busy",
            "true"
        );


        const formData =
            new FormData(contactForm);


        try {

            const response =
                await fetch(
                    "https://formsubmit.co/ajax/sumiit.singh@zohomail.in",
                    {
                        method: "POST",

                        body: formData,

                        headers: {
                            Accept:
                                "application/json"
                        }
                    }
                );


            if (response.ok) {

                formMessage.textContent =
                    "Thank you! Your request has been received. We will contact you soon.";


                contactForm.reset();

            }

            else {

                formMessage.textContent =
                    "Something went wrong. Please try again.";

            }

        }

        catch (error) {

            formMessage.textContent =
                "Unable to send request. Please try again later.";

        }

        finally {

            submitButton.disabled =
                false;

            submitButton.removeAttribute(
                "aria-busy"
            );

        }

    }
);


/* ================================
   WHATSAPP
================================ */

const whatsappBtn =
    document.getElementById(
        "whatsappBtn"
    );


whatsappBtn.addEventListener(
    "click",
    () => {

        const selectedService =
            document
                .getElementById(
                    "serviceSelect"
                )
                .value ||
            services[currentService].title;


        const message =
            `Hello Sumit Digital Assist, I need help with ${selectedService}.`;


        whatsappBtn.href =
            `https://wa.me/?text=${encodeURIComponent(message)}`;

    }
);


/* ================================
   SMOOTH NAVIGATION
================================ */

document
    .querySelectorAll(
        'a[href^="#"]'
    )
    .forEach(link => {

        link.addEventListener(
            "click",
            function(event) {

                const targetId =
                    this.getAttribute(
                        "href"
                    );


                if (
                    targetId === "#"
                ) {

                    return;

                }


                const target =
                    document.querySelector(
                        targetId
                    );


                if (!target) {

                    return;

                }


                event.preventDefault();


                target.scrollIntoView({
                    behavior: "smooth"
                });

            }
        );

    });