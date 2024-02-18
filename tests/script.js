const position = { x: 0, y: 0 };

interact(".container").draggable({
    listeners: {
        start(event) {
            console.log(event.type, event.target);
        },
        move(event) {
            position.x += event.dx;
            position.y += event.dy;

            event.target.style.transform = `translate(${position.x}px, ${position.y}px)`;
        },
    },
});

interact(".item").draggable({
    inertia: true,

    modifiers: [
        interact.modifiers.restrictRect({
            restriction: "parent",
            endOnly: true,
        }),
    ],

    autoScroll: true,

    listeners: {
        move: dragMoveListener,
        end(event) {},
    },
});

function dragMoveListener(event) {
    var target = event.target;
    var x = (parseFloat(target.getAttribute("data-x")) || 0) + event.dx;
    var y = (parseFloat(target.getAttribute("data-y")) || 0) + event.dy;

    target.style.transform = "translate(" + x + "px, " + y + "px)";

    target.setAttribute("data-x", x);
    target.setAttribute("data-y", y);
}

// this function is used later in the resizing and gesture demos
window.dragMoveListener = dragMoveListener;

const skills = [
    "Mathematical Analysis",
    "Linear Algebra",
    "Affine Geometry",
    "Statistics",
    "Physics",
    "Software Testing",
    "MATLAB",
    "R (Programming Language)",
    "C (Programming Language)",
    "Python (Programming Language)",
    "NumPy",
    "Pandas",
    "Matplotlib",
    "Scikit-Learn",
    "Jupyter",
    "Kivy",
    "Flask",
    "Django",
    "Django REST Framework",
    "API Management",
    "JSON",
    "SQL",
    "Object-Relational Mapping (ORM)",
    "Markdown",
    "LaTeX",
    "HTML",
    "CSS",
    "Bootstrap",
    "Tailwind CSS",
    "Git",
    "GitHub",
    "GitLab",
    "Bitbucket",
    "Visual Studio Code",
    "Linux Ricing",
    "Linux",
    "ServerLinux Server",
    "Debian",
    "Ubuntu",
    "VirtualBox",
    "Penetration Testing",
    "CTF",
    "Hack The Box"
];

skills.forEach(skill => {
    const skillDiv = document.createElement("div");
    skillDiv.className = "item";
    skillDiv.textContent = skill;

    const container = document.getElementsByClassName("container")[0];
    container.appendChild(skillDiv);
});