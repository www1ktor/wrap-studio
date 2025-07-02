document.addEventListener("scroll", function () {
    let scrolled = window.scrollY;
    document.querySelectorAll(".aboutslide::before, #home::before").forEach((el) => {
        el.style.transform = `translateY(${scrolled * 0.5}px)`;
    });
});

function centerRightSection() {
    const heroContainer = document.querySelector('#home-hero-container');
    const rightContainer = document.querySelector('#home-right-container');

    if (heroContainer && rightContainer) {
        const heroHeight = heroContainer.offsetHeight; 
        const rightHeight = rightContainer.offsetHeight; 

        const marginTop = (heroHeight - rightHeight) / 2;

        rightContainer.style.marginTop = `${marginTop}px`;
    }
}

window.addEventListener('load', centerRightSection);
window.addEventListener('resize', centerRightSection);

/*function adjustFontSize() {
    let paragraphs = document.querySelectorAll("#home-hero-container p");

    paragraphs.forEach(p => {
        p.style.fontSize = "";
        p.style.letterSpacing = "";

        let fontSize = 10; 
        let maxWidth = p.parentElement.clientWidth; 
        let letterSpacing = 0; 

        do {
            fontSize++;
            p.style.fontSize = fontSize + "px";
        } while (p.scrollWidth <= maxWidth);

        fontSize--;
        p.style.fontSize = fontSize + "px";

        do {
            letterSpacing += 0.1;
            p.style.letterSpacing = letterSpacing + "px";
        } while (p.scrollWidth <= maxWidth);

        letterSpacing -= 0.1;
        p.style.letterSpacing = letterSpacing + "px";
    });
}

window.addEventListener("resize", adjustFontSize);
window.addEventListener("load", adjustFontSize);*/

function scrollToNextSection() {
    const nextSection = document.querySelector("#services");
    nextSection.scrollIntoView({ behavior: "smooth" });
}

window.addEventListener("resize", function() {
    const menu = document.getElementById("menu");
    const body = document.body;

    if (menu.classList.contains("open")) {
        menu.classList.remove("open");
        body.classList.remove("no-scroll");
    }
});

function revealOnScroll() {
    let elements = document.querySelectorAll(".reveal");
    let windowHeight = window.innerHeight;

    elements.forEach(el => {
        let position = el.getBoundingClientRect().top;
        if (position < windowHeight - 50) {
            el.classList.add("visible");
        }
    });
}

window.addEventListener("scroll", revealOnScroll);
document.addEventListener("DOMContentLoaded", revealOnScroll);

function toggleGallery() {
    var gallery = document.querySelector(".gallery");
    var coverableImages = document.querySelectorAll(".coverableimg");
    var toggleBtn = document.getElementById("toggle-btn");

    var isHidden = coverableImages[0].style.display === "none" || !coverableImages[0].classList.contains("visible");

    if (isHidden) {
        coverableImages.forEach(img => {
            img.style.display = "block"; 
            setTimeout(() => img.classList.add("visible"), 10);
        });
        toggleBtn.innerHTML = 'Pokaż mniej &#9650;';
    } else {
        coverableImages.forEach(img => {
            img.classList.remove("visible");
            setTimeout(() => img.style.display = "none", 10);
        });
        toggleBtn.innerHTML = 'Pokaż więcej &#9660;';
    }
}

function checkScreenSize() {
    var toggleBtn = document.getElementById("toggle-btn");
    if (window.innerWidth >= 1024) {
        toggleBtn.style.display = "none"; 
        document.querySelectorAll(".coverableimg").forEach(img => {
            img.style.display = "block"; 
            img.classList.add("visible");
        });
    } else {
        toggleBtn.style.display = "block"; 
        document.querySelectorAll(".coverableimg").forEach(img => {
            img.style.display = "none"; 
            img.classList.remove("visible");
        });
    }
}

window.addEventListener("resize", checkScreenSize);
document.addEventListener("DOMContentLoaded", checkScreenSize);


document.addEventListener("DOMContentLoaded", function() {
    const menuToggle = document.getElementById("menu-toggle");
    const menu = document.getElementById("menu");
    const body = document.body;

    menuToggle.addEventListener("click", function() {
        menu.classList.toggle("open");
        
        let coverableElements = document.getElementsByClassName("coverable");

        if (menu.classList.contains("open")) {
            body.classList.add("no-scroll");
            Array.from(coverableElements).forEach(el => el.style.display = "none");
        } else {
            body.classList.remove("no-scroll");
            Array.from(coverableElements).forEach(el => el.style.display = "flex");
        }
    });

    const menuLinks = document.querySelectorAll("#menu a");
    menuLinks.forEach(link => {
        link.addEventListener("click", function() {
            menu.classList.remove("open");
            body.classList.remove("no-scroll"); 
        });
    });

    let lastScrollTop = 0;
    const header = document.querySelector("header");

    window.addEventListener("scroll", function() {
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        if (scrollTop > lastScrollTop) {
            header.style.top = "-100px";
        } else {
            header.style.top = "0";
        }

        lastScrollTop = scrollTop;
    });
});

function openModal(img, index) {
    let modal = document.getElementById("imageModal");
    let modalImg = document.getElementById("modalImg");

    currentIndex = index; 
    modalImg.src = img.src;
    modal.style.display = "flex";
}

document.addEventListener("DOMContentLoaded", function() {
    let images = document.querySelectorAll(".gallery img"); 
    
    function getIndex(imgElement) {
        let images = document.querySelectorAll(".gallery img");  
        return Array.from(images).indexOf(imgElement);
    }

    if (images.length === 0) { return; }

    images.forEach((img, index) => {
        img.addEventListener("click", function() {
            let currentIndex = getIndex(img);
            openModal(img, index);
        });
    });
});
    
function closeModal() {
    document.getElementById("imageModal").style.display = "none";
}

function changeImage(direction) {
    let images = document.querySelectorAll(".gallery img");
        
    currentIndex += direction;

    if (currentIndex >= images.length) {
        currentIndex = 0;
    } else if (currentIndex < 0) {
        currentIndex = images.length - 1;
    }

    const modalImg = document.getElementById("modalImg");
    
    if (modalImg && images[currentIndex]) {
        modalImg.src = images[currentIndex].src;
    }
}

window.addEventListener("click", function(event) {
    const modal = document.getElementById("imageModal");
    if (event.target === modal) {
        closeModal();
    }
});

document.addEventListener("keydown", function(event) {
    const modal = document.getElementById("imageModal");
    if (modal.style.display === "flex") {
        if (event.key === "ArrowLeft") {
            changeImage(-1);
        } else if (event.key === "ArrowRight") {
            changeImage(1);
        } else if (event.key === "Escape") {
            closeModal();
        }
    }
});

/*
document.addEventListener("DOMContentLoaded", function () {
    const gallery = document.getElementById("portfolio-images");

    let lastScrollY = window.scrollY;

    window.addEventListener("scroll", function () {
        // Zapobiegamy zwijaniu galerii przy przewijaniu do góry
        if (window.scrollY < lastScrollY && window.getComputedStyle(gallery).display === "none") {
            gallery.style.display = "grid";
            gallery.style.minHeight = "1px"; 
        }

        lastScrollY = window.scrollY;
    });

    // Zapobiegamy losowemu ukrywaniu galerii
    setInterval(() => {
        if (window.getComputedStyle(gallery).display === "none") {
            gallery.style.display = "grid";
        }
    }, 500);
});

document.addEventListener("DOMContentLoaded", function () {
    let gallery = document.getElementById("portfolio-images");
    let toggleBtn = document.getElementById("toggle-btn");
    
    // Zapobiegaj przypadkowemu chowaniu galerii na dotykowym ekranie
    let startY, endY;

    gallery.addEventListener("touchstart", function (e) {
        startY = e.touches[0].clientY;
    });

    gallery.addEventListener("touchmove", function (e) {
        endY = e.touches[0].clientY;

        // Sprawdź, czy użytkownik przesuwa palcem w górę o więcej niż 50px (zamykanie)
        if (startY - endY > 50) {
            e.preventDefault(); // Blokujemy przewijanie strony, by uniknąć przypadkowego zamykania galerii
        }
    });

    toggleBtn.addEventListener("click", function () {
        if (gallery.classList.contains("visible")) {
            gallery.classList.remove("visible");
            toggleBtn.innerHTML = "Pokaż więcej &#9660;";
        } else {
            gallery.classList.add("visible");
            toggleBtn.innerHTML = "Pokaż mniej &#9650;";
        }
    });
});
*/


