// check if is the first time the user is visiting the site

if (localStorage.getItem('firstVisit') === null) {
    localStorage.setItem('firstVisit', 1);
    showTutorial();
} else if (parseInt(localStorage.getItem('firstVisit')) <= 3) {
    localStorage.setItem('firstVisit', parseInt(localStorage.getItem('firstVisit')) + 1);
    showTutorial();
} else {
    gsap.set("#instruction-right", {
        display: "none",
    });
    
    gsap.set("#instruction-left", {
        display: "none",
    });
    
    gsap.set("#instruction-down", {
        display: "none",
    });
}

function showTutorial() {
    gsap.set("#instruction-right", {
        transformOrigin: "right center",
        rotationY: 90,
        perspective: 1000,
    });
    
    gsap.to("#instruction-right", {
        delay: 2,
        duration: 2,
        rotationY: 0,
        ease: "elastic.out(1, 0.5)",
    });
    
    gsap.to("#instruction-right", {
        delay: 5,
        duration: 1,
        rotationY: 90,
        display: "none",
        ease: "power3.out"
    });
    
    
    gsap.set("#instruction-left", {
        transformOrigin: "left center",
        rotationY: -90,
        perspective: 1000,
    });
    
    gsap.to("#instruction-left", {
        delay: 6,
        duration: 2,
        rotationY: 0,
        ease: "elastic.out(1, 0.5)",
    });
    
    gsap.to("#instruction-left", {
        delay: 9,
        duration: 1,
        rotationY: -90,
        display: "none",
        ease: "power3.out"
    });
    
    if (screen.width > 786) {
        gsap.set("#instruction-down", {
            transformOrigin: "center bottom",
            rotationX: 90,
            perspective: 1000,
        });
    
        gsap.to("#instruction-down", {
            delay: 10,
            duration: 2,
            rotationX: 0,
            ease: "elastic.out(1, 0.5)",
        });
    
        gsap.to("#instruction-down", {
            delay: 13,
            duration: 1,
            rotationX: 90,
            display: "none",
            ease: "power3.out"
        });
    } else {
        gsap.set("#instruction-down", {
            display: "none",
        });
    }
}