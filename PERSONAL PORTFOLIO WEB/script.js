// DOM Content Loaded Handler
document.addEventListener("DOMContentLoaded", () => {
  
  // 1. Mobile Menu Toggle
  const menuBtn = document.getElementById("menu-btn");
  const mobileMenu = document.getElementById("mobile-menu");
  const mobileLinks = mobileMenu ? mobileMenu.querySelectorAll("a") : [];

  if (menuBtn && mobileMenu) {
    // Toggle Menu on button click
    menuBtn.addEventListener("click", () => {
      mobileMenu.classList.toggle("hidden");
      mobileMenu.classList.toggle("flex");
    });

    // Close Menu when any mobile link is clicked (UX Polish)
    mobileLinks.forEach(link => {
      link.addEventListener("click", () => {
        mobileMenu.classList.add("hidden");
        mobileMenu.classList.remove("flex");
      });
    });
  }

  // 2. Scroll Reveal & Dynamic Progress Bar Animation
  const skillCards = document.querySelectorAll(".skill-card");

  const revealSkillsOnScroll = () => {
    const triggerBottom = window.innerHeight * 0.85;

    skillCards.forEach((card, i) => {
      const cardTop = card.getBoundingClientRect().top;

      if (cardTop < triggerBottom) {
        setTimeout(() => {
          // Reveal the card
          card.classList.remove("opacity-0", "translate-y-10");
          card.classList.add("opacity-100", "translate-y-0");

          // Find progress bar inside the card and animate dynamically
          const progressBar = card.querySelector(".progress-bar");
          if (progressBar) {
            const targetLevel = progressBar.getAttribute("data-level") || "0%";
            progressBar.style.width = targetLevel;
          }
        }, i * 150); // elegant staggered delay
      }
    });
  };

  window.addEventListener("scroll", revealSkillsOnScroll);
  revealSkillsOnScroll(); // Trigger on initial load

  // 3. Interactive Contact Form Handler (Premium Feedback)
  const contactForm = document.querySelector("form");
  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault(); // Prevent standard page refresh
      
      const submitBtn = contactForm.querySelector("button[type='submit']");
      const originalText = submitBtn ? submitBtn.innerText : "Send Message";
      
      if (submitBtn) {
        // Visual Feedback: Loading State
        submitBtn.disabled = true;
        submitBtn.innerHTML = `<i class="fa-solid fa-circle-notch animate-spin mr-2"></i> Sending...`;
        submitBtn.classList.add("opacity-80");

        setTimeout(() => {
          // Visual Feedback: Success State
          submitBtn.innerHTML = `<i class="fa-solid fa-circle-check mr-2"></i> Message Sent!`;
          submitBtn.classList.remove("bg-gradient-to-r", "from-yellow-400", "to-amber-500", "hover:from-yellow-500", "hover:to-amber-600");
          submitBtn.classList.add("bg-green-500", "text-white");
          
          // Reset form
          contactForm.reset();

          // Revert button state after 3 seconds
          setTimeout(() => {
            submitBtn.disabled = false;
            submitBtn.innerText = originalText;
            submitBtn.classList.remove("bg-green-500", "text-white");
            submitBtn.classList.add("bg-gradient-to-r", "from-yellow-400", "to-amber-500", "hover:from-yellow-500", "hover:to-amber-600");
          }, 3000);
        }, 1500);
      }
    });
  }

  // 4. Dynamic Typing Animation Effect
  const words = ["Frontend Developer", "React Developer", "Mobile Developer"];
  let wordIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  const typedTextSpan = document.getElementById("typed-text");

  const type = () => {
    if (!typedTextSpan) return;
    const currentWord = words[wordIndex];
    
    if (isDeleting) {
      typedTextSpan.textContent = currentWord.substring(0, charIndex - 1);
      charIndex--;
    } else {
      typedTextSpan.textContent = currentWord.substring(0, charIndex + 1);
      charIndex++;
    }
    
    let typeSpeed = 100;
    if (isDeleting) {
      typeSpeed /= 2; // delete twice as fast
    }
    
    if (!isDeleting && charIndex === currentWord.length) {
      typeSpeed = 1500; // pause on completed word
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      wordIndex = (wordIndex + 1) % words.length;
      typeSpeed = 500; // pause before typing next word
    }
    
    setTimeout(type, typeSpeed);
  };

  type();

});
