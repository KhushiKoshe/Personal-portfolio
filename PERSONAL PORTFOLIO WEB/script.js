// Mobile Menu Toggle
document.addEventListener("DOMContentLoaded", () => {
  const menuBtn = document.getElementById("menu-btn");
  const mobileMenu = document.getElementById("mobile-menu");

  menuBtn.addEventListener("click", () => {
    mobileMenu.classList.toggle("hidden");
    mobileMenu.classList.toggle("flex");
  });
});



// Animate skill bars on scroll
function animateSkills() {
  const skillBars = document.querySelectorAll(".skill-bar");
  skillBars.forEach(bar => {
    const target = bar.getAttribute("data-skill");
    bar.style.width = target;
    bar.style.transition = "width 1.5s ease-in-out";
  });
}

document.addEventListener("scroll", () => {
  const skillsSection = document.getElementById("skills");
  const rect = skillsSection.getBoundingClientRect();
  if (rect.top < window.innerHeight - 100) {
    animateSkills();
  }
});

// Scroll Reveal Animation with Progress Bars
document.addEventListener("DOMContentLoaded", () => {
  const skills = document.querySelectorAll(".skill-card");

  const revealOnScroll = () => {
    const triggerBottom = window.innerHeight * 0.85;

    skills.forEach((skill, i) => {
      const skillTop = skill.getBoundingClientRect().top;

      if (skillTop < triggerBottom) {
        setTimeout(() => {
          skill.classList.add("opacity-100", "translate-y-0");

          // Animate progress bars
          if (skill.querySelector(".progress-bar-html")) {
            skill.querySelector(".progress-bar-html").style.width = "90%";
          }
          if (skill.querySelector(".progress-bar-css")) {
            skill.querySelector(".progress-bar-css").style.width = "85%";
          }
          if (skill.querySelector(".progress-bar-js")) {
            skill.querySelector(".progress-bar-js").style.width = "75%";
          }

        }, i * 200); // stagger delay
      }
    });
  };

  window.addEventListener("scroll", revealOnScroll);
  revealOnScroll(); // Run on load
});


