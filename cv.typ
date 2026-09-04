#set page(
  paper: "a4",
  margin: (x: 1.6cm, top: 1.4cm, bottom: 1.4cm),
)

#set text(
  font: "Roboto",
  size: 10pt,
  fill: rgb("#111111"),
  lang: "en",
)

#set par(
  justify: true,
  leading: 0.6em,
)

#let section-heading(title) = {
  v(0.85em)
  text(weight: "bold", size: 1.08em, fill: rgb("#000000"))[#smallcaps(title)]
  v(-0.35em)
  line(length: 100%, stroke: 0.5pt + rgb("#bbbbbb"))
  v(0.25em)
}

#let item-header(title, details, date) = {
  grid(
    columns: (1fr, auto),
    align: (left, right),
    [
      #text(weight: "bold", fill: rgb("#000000"))[#title]#if details != "" [ #text(fill: rgb("#333333"))[#details]]
    ],
    [
      #text(style: "italic", fill: rgb("#444444"), size: 0.95em)[#date]
    ]
  )
}

#align(center)[
  #text(weight: "bold", size: 1.9em, fill: rgb("#000000"))[Giovanni Norbedo]
  #v(0.15em)
  #text(size: 1.05em, fill: rgb("#222222"))[
    MSc Student · Foundations of AI & ML · Trieste, Italy
  ]
  #v(0.3em)
  #text(size: 0.92em)[
    #link("mailto:norbedo@proton.me")[norbedo\@proton.me]
    #h(0.75em) | #h(0.75em)
    #link("https://norbedo.xyz")[norbedo.xyz]
    #h(0.75em) | #h(0.75em)
    #link("https://github.com/giovanni-norbedo")[github.com/giovanni-norbedo]
    #h(0.75em) | #h(0.75em)
    #link("https://linkedin.com/in/norbedo")[linkedin.com/in/norbedo]
  ]
]

#v(0.2em)

#section-heading("Education")

#item-header(
  "University of Trieste",
  [· MSc, Data Science & Artificial Intelligence (Foundations of AI & ML)],
  "2026 - Present"
)

#v(0.4em)

#item-header(
  "University of Trieste",
  [· BSc, AI & Data Analytics],
  "2023 - 2026"
)

#section-heading("Selected Projects")

#item-header(
  "Hastings-Powell Chaos Simulation",
  [· #link("https://github.com/giovanni-norbedo/progetto_sistemi_complessi")[_code_]],
  "2025"
)
#v(-0.3em)
- Numerical analysis of tri-trophic chaotic ODEs, strange attractors, bifurcation cascades, and chaos suppression via prey harvesting.

#v(0.4em)

#item-header(
  "TensorForth: Parallel C Interpreter",
  [· #link("https://github.com/giovanni-norbedo/progetto_programmazione_avanzata_e_parallela")[_code_]],
  "2025"
)
#v(-0.3em)
- Stack-based C99 interpreter with OpenMP multi-threading for parallel 1D/2D tensor operations and cellular automata.

#v(0.4em)

#item-header(
  "Minesweeper3D & Constraint Solver",
  [· #link("https://github.com/giovanni-norbedo/Minesweeper3D")[_code_]],
  "2024"
)
#v(-0.3em)
- 3D puzzle engine in Python/Ursina with an exact solver based on linear integer constraint satisfaction.

#section-heading("Certifications & Skills")

#grid(
  columns: (135pt, 1fr),
  row-gutter: 0.55em,
  [*Scientific Computing:*], [PyTorch, Scikit-Learn, NumPy, SciPy, Gurobi, Z3 SMT Solver, SageMath, Statsmodels],
  [*Programming & Systems:*], [Python, C/C++, OpenMP, MATLAB, R, SQL, Bash, Linux, Docker, Git],
  [*Certifications:*], [Business Plan & Case Modeling (UniTS / Bestr)],
  [*Languages:*], [Italian (Native), English (B2 Upper-Intermediate, Cambridge English FCE)]
)
