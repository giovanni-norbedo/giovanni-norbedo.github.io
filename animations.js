// Animations using GSAP + ScrollTrigger
// Assicurati di includere GSAP e ScrollTrigger nel tuo HTML prima di questo script:
// <script src="https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/gsap.min.js"></script>
// <script src="https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/ScrollTrigger.min.js"></script>

document.addEventListener('DOMContentLoaded', () => {
  gsap.registerPlugin(ScrollTrigger);

  // Navbar: slide down from top
  gsap.from('nav', { duration: 2.2, y: -60, opacity: 0, ease: 'power2.out' });

  // Profile section: slide up from bottom
  gsap.from('.profile-section', {
    scrollTrigger: {
      trigger: '.profile-section',
      start: 'top 80%',
      toggleActions: 'play none none none'
    },
    duration: 2.5,
    y: 80,
    opacity: 0,
    ease: 'power2.out'
  });

  // Typing effect for profile h1
  const profileH1 = document.querySelector('.profile-section h1');
  if (profileH1) {
    const fullText = profileH1.textContent;
    profileH1.textContent = '';
    let i = 0;
    function typeChar() {
      if (i <= fullText.length) {
        profileH1.textContent = fullText.slice(0, i);
        i++;
        setTimeout(typeChar, 130);
      }
    }
    // Start typing when profile section enters viewport
    ScrollTrigger.create({
      trigger: '.profile-section',
      start: 'top 80%',
      once: true,
      onEnter: typeChar
    });
  }

  // Section titles: fade-in with more evident 3D rotation
  gsap.utils.toArray('section h2').forEach((el) => {
    gsap.from(el, {
      scrollTrigger: {
        trigger: el,
        start: 'top 85%',
        toggleActions: 'play none none none'
      },
      duration: 1.7,
      opacity: 0,
      scale: 0.85,
      rotationY: 120,
      rotationX: 18,
      transformOrigin: 'left center',
      ease: 'back.out(1.7)'
    });
  });

  // Section content: fade-in and slide up from below
  gsap.utils.toArray('section .section-content').forEach((el) => {
    gsap.from(el, {
      scrollTrigger: {
        trigger: el,
        start: 'top 90%',
        toggleActions: 'play none none none'
      },
      duration: 1.9,
      opacity: 0,
      y: 40,
      ease: 'power2.out'
    });
  });

  // Projects section: fade-in from below, slower
  const projects = document.querySelector('#projects .projects-list .title');
  if (projects) {
    gsap.from(projects, {
      scrollTrigger: {
        trigger: projects,
        start: 'top 95%',
        toggleActions: 'play none none none'
      },
      duration: 2.2,
      opacity: 0,
      y: 60,
      ease: 'expo.out'
    });
  }
}); 
