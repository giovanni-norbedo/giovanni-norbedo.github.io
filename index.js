const terminal = document.getElementById("terminal");

messages = [
    'Hello, World!', 
    'git commit -m "Initial commit"', 
    'npm install', 
    'pip install -r requirements.txt', 
    'flutter run', 
    'docker ps', 
    'apt-get update -y', 
    'ssh -i "key.pem" user@host',
    'systemctl start postgresql', 
    'python manage.py runserver',
    'git push origin main',
    'npm run build',
    'docker-compose up',
    'apt-get upgrade',
    'systemctl restart nginx',
    'rm -rf /',
    'nmap -sC -sV -o scan',
    'nano .zshrc',
    'cat /etc/passwd',
    'usermod -aG sudo user',
    'fastfetch -l pearos',
    'kitty +kitten icat image.png',
    'python -m http.server 8000',
    'ip addr show',
    'nmcli device wifi list',
    'ufw allow 80',
    'journalctl -xe',
    'omz update',
    'chmod +x script.sh',
    'pip cache purge',
    'gcc main.c -o main',
    'dpkg -i package.deb',
    'dart pub get',
    'vue create app',
    'npx create-react-app app',
]

let typingInterval;
let cursorBlinkingInterval;
let typingInProgress = false;

function typeMessage(message, callback) {
    let index = 0;
    typingInProgress = true;
    terminal.textContent = "$ ";

    function type() {
        if (!typingInProgress) return;
        if (index < message.length) {
            terminal.textContent += message.charAt(index);
            index++;
            typingInterval = setTimeout(type, 70); // typing speed
        } else if (callback) {
            callback();
        }
    }
    
    type();
}

function eraseMessage(callback) {
    let message = terminal.textContent.slice(2); // Remove "$ " prefix
    let index = message.length;

    function erase() {
        if (index > 0) {
            terminal.textContent = "$ " + message.slice(0, index - 1);
            index--;
            setTimeout(erase, 30); // erasing speed
        } else if (callback) {
            callback();
        }
    }
    
    erase();
}

function cancelTyping() {
    clearTimeout(typingInterval);
    typingInProgress = false;
}

function blinkCursor() {
    let blinking = true;
    cursorBlinkingInterval = setInterval(() => {
        if (!blinking) {
            terminal.textContent = terminal.textContent.replace(/_$/, '');
        } else {
            terminal.textContent += "_";
        }
        blinking = !blinking;
    }, 500);
}

function stopCursorBlinking() {
    clearInterval(cursorBlinkingInterval);
    terminal.textContent = terminal.textContent.replace(/_$/, '');
}

function cycleMessages() {
    cancelTyping();
    stopCursorBlinking();

    let message = messages[Math.floor(Math.random() * messages.length)];

    typeMessage(message, () => {
        setTimeout(() => {
            blinkCursor();

            setTimeout(() => {
                stopCursorBlinking();
                eraseMessage(() => {
                    terminal.textContent = "$ ";
                    setTimeout(cycleMessages, 1000); // Wait before restarting
                });
            }, 3000); // How long to show the message before erasing
        }, 500); // Delay after typing
    });
}

cycleMessages();


/* animate elements when they become visible */

gsap.set(".page *", {
    autoAlpha: 0,
    y: "50px",
    rotation: 5,
    transform: "scale(0.5)",
});

gsap.set("#about", {
    x: "200px",
});

gsap.set("#skills", {
    rotation: 0,
});

const animateVisible = (block, ratio, isIntersecting) => {
    if (isIntersecting && ratio > 0) {
        gsap.to(block.getElementsByTagName("*"), {
            duration: 1,
            autoAlpha: 1,
            y: 0,
            x: 0,
            rotation: 0,
            transform: "scale(1)",
            stagger: 0.2,
            ease: "power3.out",
        });
    } else {
        gsap.set(block.querySelector("*"), {
            autoAlpha: 0,
        });
    }
};

const blocks = document.querySelectorAll(".page");

const blockObserver = new IntersectionObserver((entries) => {
    return entries.forEach((event) => {
        const { target, intersectionRatio, isIntersecting } = event;
        animateVisible(target, intersectionRatio, isIntersecting);
    });
}, {threshold: 0.5,});

for (const block of blocks) {
    blockObserver.observe(block);
}


gsap.set("#links", {
    autoAlpha: 0,
    x: "-300px",
});

gsap.to("#links", {
    duration: 2,
    autoAlpha: 1,
    x: 0,
    ease: "power3.out",
});

gsap.set("#contactme", {
    autoAlpha: 0,
    y: "300px",
    rotation: 300,
    scale: -1.5,
});

gsap.to("#contactme", {
    duration: 2,
    autoAlpha: 1,
    y: 0,
    rotation: 0,
    ease: "power3.out",
    scale: 1,
});


gsap.set("#take", {
    autoAlpha: 0,
    x: "-300px",
});

gsap.to("#take", {
    delay: 14,
    duration: 2,
    autoAlpha: 1,
    x: 0,
    ease: "power3.out",
});

gsap.set("#space", {
    width: "0%",
    height: "0%",
    position: "absolute",
    top: "50%",
    left: "50%",
    x: "-50%",
    y: "-50%",
});


take = document.getElementById("take");

take.addEventListener("click", (event) => {
    event.stopPropagation();

    window.open("https://norbedo.xyz/projects.html", "_blank");
});

window.addEventListener('scroll', function(event) {
    event.preventDefault(); // Prevent default scrolling
    window.scrollTo(0, 0);  // Keep scroll position at the top
});

window.addEventListener('wheel', function(event) {
    event.preventDefault();  // Disable mouse wheel scroll
}, { passive: false });

window.addEventListener('touchmove', function(event) {
    event.preventDefault();  // Prevent touch scrolling
}, { passive: false });



document.addEventListener('keydown', function(event) {
    const scrollContainer = document.getElementById('root');

    switch (event.key) {
        case 'ArrowLeft':
            scrollContainer.scrollBy({
                top: -window.innerHeight, // Scroll up by the height of the viewport
                behavior: 'smooth'
            });
            break;
        case 'ArrowRight':
            scrollContainer.scrollBy({
                top: window.innerHeight, // Scroll down by the height of the viewport
                behavior: 'smooth'
            });
            break;
    }
});

/* tap the right side of the screen to scroll down */
document.addEventListener('click', function(event) {
    const scrollContainer = document.getElementById('root');
    const { clientX, clientY } = event;

    if (event.target === take) {
        return;
    }

    if (clientX > window.innerWidth / 2) {
        scrollContainer.scrollBy({
            top: window.innerHeight, // Scroll down by the height of the viewport
            behavior: 'smooth'
        });
    } else {
        scrollContainer.scrollBy({
            top: -window.innerHeight, // Scroll up by the height of the viewport
            behavior: 'smooth'
        });
    }
});