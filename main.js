/* ============================================
   BUTTERFLY MEDICAL - Main JavaScript
   ============================================ */

document.addEventListener('DOMContentLoaded', function () {
  // Initialize all components
  initNavigation();
  initScrollAnimations();
  initSmoothScroll();
  initHeaderScroll();
  initButterflyAnimation();
});

/* ============================================
   NAVIGATION
   ============================================ */
function initNavigation() {
  const menuToggle = document.querySelector('.menu-toggle');
  const navList = document.querySelector('.nav-list');

  if (menuToggle && navList) {
    menuToggle.addEventListener('click', function () {
      this.classList.toggle('active');
      navList.classList.toggle('active');
    });

    // Close menu when clicking on a link
    document.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        menuToggle.classList.remove('active');
        navList.classList.remove('active');
      });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (!e.target.closest('.nav') && !e.target.closest('.menu-toggle')) {
        menuToggle.classList.remove('active');
        navList.classList.remove('active');
      }
    });
  }

  // Set active nav link based on current page
  setActiveNavLink();
}

function setActiveNavLink() {
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.nav-link');

  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });
}

/* ============================================
   HEADER SCROLL EFFECT
   ============================================ */
function initHeaderScroll() {
  const header = document.querySelector('.header');

  if (header) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 100) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    });
  }
}

/* ============================================
   SCROLL ANIMATIONS (AOS-like)
   ============================================ */
function initScrollAnimations() {
  const animatedElements = document.querySelectorAll('[data-aos]');

  if (animatedElements.length === 0) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Add delay if specified
        const delay = entry.target.getAttribute('data-aos-delay') || 0;
        setTimeout(() => {
          entry.target.classList.add('aos-animate');
        }, delay);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  animatedElements.forEach(el => {
    observer.observe(el);
  });
}

/* ============================================
   SMOOTH SCROLL
   ============================================ */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');

      if (targetId === '#') return;

      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        e.preventDefault();

        const headerHeight = document.querySelector('.header')?.offsetHeight || 0;
        const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - headerHeight;

        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
}

/* ============================================
   COUNTER ANIMATION
   ============================================ */
function animateCounters() {
  const counters = document.querySelectorAll('[data-counter]');

  counters.forEach(counter => {
    const target = parseInt(counter.getAttribute('data-counter'));
    const duration = 2000;
    const step = target / (duration / 16);
    let current = 0;

    const updateCounter = () => {
      current += step;
      if (current < target) {
        counter.textContent = Math.floor(current);
        requestAnimationFrame(updateCounter);
      } else {
        counter.textContent = target;
      }
    };

    // Start animation when element is in view
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          updateCounter();
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    observer.observe(counter);
  });
}

/* ============================================
   FORM VALIDATION
   ============================================ */
function initFormValidation() {
  const forms = document.querySelectorAll('form[data-validate]');

  forms.forEach(form => {
    form.addEventListener('submit', function (e) {
      e.preventDefault();

      let isValid = true;
      const requiredFields = form.querySelectorAll('[required]');

      requiredFields.forEach(field => {
        if (!field.value.trim()) {
          isValid = false;
          field.classList.add('error');
        } else {
          field.classList.remove('error');
        }
      });

      // Email validation
      const emailField = form.querySelector('input[type="email"]');
      if (emailField && emailField.value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(emailField.value)) {
          isValid = false;
          emailField.classList.add('error');
        }
      }

      if (isValid) {
        // Show success message or submit form
        showFormSuccess(form);
      }
    });
  });
}

function showFormSuccess(form) {
  const successMessage = document.createElement('div');
  successMessage.className = 'form-success';
  successMessage.innerHTML = `
    <div class="form-success-icon">✓</div>
    <h4>¡Mensaje Enviado!</h4>
    <p>Nos pondremos en contacto contigo pronto.</p>
  `;

  form.style.display = 'none';
  form.parentNode.appendChild(successMessage);
}

/* ============================================
   GALLERY LIGHTBOX
   ============================================ */
function initLightbox() {
  const galleryItems = document.querySelectorAll('.gallery-item[data-lightbox]');

  galleryItems.forEach(item => {
    item.addEventListener('click', function () {
      const imgSrc = this.querySelector('img').src;
      const lightbox = document.createElement('div');
      lightbox.className = 'lightbox';
      lightbox.innerHTML = `
        <div class="lightbox-overlay"></div>
        <div class="lightbox-content">
          <button class="lightbox-close">&times;</button>
          <img src="${imgSrc}" alt="">
        </div>
      `;

      document.body.appendChild(lightbox);
      document.body.style.overflow = 'hidden';

      setTimeout(() => lightbox.classList.add('active'), 10);

      lightbox.addEventListener('click', (e) => {
        if (e.target.classList.contains('lightbox-overlay') ||
          e.target.classList.contains('lightbox-close')) {
          lightbox.classList.remove('active');
          setTimeout(() => {
            lightbox.remove();
            document.body.style.overflow = '';
          }, 300);
        }
      });
    });
  });
}

/* ============================================
   FILTER FUNCTIONALITY (for gallery)
   ============================================ */
function initFilters() {
  const filterBtns = document.querySelectorAll('[data-filter]');
  const filterItems = document.querySelectorAll('[data-category]');

  if (filterBtns.length === 0) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', function () {
      const filter = this.getAttribute('data-filter');

      // Update active button
      filterBtns.forEach(b => b.classList.remove('active'));
      this.classList.add('active');

      // Filter items
      filterItems.forEach(item => {
        const category = item.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
          item.style.display = '';
          item.classList.add('aos-animate');
        } else {
          item.style.display = 'none';
        }
      });
    });
  });
}

/* ============================================
   TESTIMONIAL SLIDER
   ============================================ */
function initTestimonialSlider() {
  const slider = document.querySelector('.testimonial-slider');
  if (!slider) return;

  const slides = slider.querySelectorAll('.testimonial-slide');
  const prevBtn = slider.querySelector('.slider-prev');
  const nextBtn = slider.querySelector('.slider-next');
  const dots = slider.querySelector('.slider-dots');

  let currentSlide = 0;

  // Create dots
  slides.forEach((_, i) => {
    const dot = document.createElement('button');
    dot.className = `slider-dot ${i === 0 ? 'active' : ''}`;
    dot.addEventListener('click', () => goToSlide(i));
    dots?.appendChild(dot);
  });

  function goToSlide(index) {
    slides.forEach(slide => slide.classList.remove('active'));
    slides[index].classList.add('active');

    if (dots) {
      dots.querySelectorAll('.slider-dot').forEach((dot, i) => {
        dot.classList.toggle('active', i === index);
      });
    }

    currentSlide = index;
  }

  prevBtn?.addEventListener('click', () => {
    const newIndex = currentSlide === 0 ? slides.length - 1 : currentSlide - 1;
    goToSlide(newIndex);
  });

  nextBtn?.addEventListener('click', () => {
    const newIndex = currentSlide === slides.length - 1 ? 0 : currentSlide + 1;
    goToSlide(newIndex);
  });

  // Auto-play
  setInterval(() => {
    const newIndex = currentSlide === slides.length - 1 ? 0 : currentSlide + 1;
    goToSlide(newIndex);
  }, 5000);
}

/* ============================================
   UTILITY FUNCTIONS
   ============================================ */

// Debounce function
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Throttle function
function throttle(func, limit) {
  let inThrottle;
  return function (...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

// WhatsApp link generator
function openWhatsApp(phone, message = '') {
  const encodedMessage = encodeURIComponent(message);
  const url = `https://wa.me/${phone}?text=${encodedMessage}`;
  window.open(url, '_blank');
}

// Initialize additional components if they exist
document.addEventListener('DOMContentLoaded', function () {
  if (document.querySelector('[data-counter]')) {
    animateCounters();
  }
  if (document.querySelector('form[data-validate]')) {
    initFormValidation();
  }
  if (document.querySelector('[data-lightbox]')) {
    initLightbox();
  }
  if (document.querySelector('[data-filter]')) {
    initFilters();
  }
  if (document.querySelector('.testimonial-slider')) {
    initTestimonialSlider();
  }
});

/* ============================================
   BUTTERFLY ANIMATION
   ============================================ */
/* ============================================
   BUTTERFLY ANIMATION
   ============================================ */
function initButterflyAnimation() {
  const hero = document.querySelector('.hero');
  if (!hero) return;

  // Create canvas
  const canvas = document.createElement('canvas');
  canvas.className = 'butterfly-canvas';
  canvas.style.cssText = `
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    z-index: 1;
  `;
  hero.appendChild(canvas);

  const ctx = canvas.getContext('2d');
  let butterflies = [];
  let animationId;

  // Resize canvas
  function resizeCanvas() {
    canvas.width = hero.offsetWidth;
    canvas.height = hero.offsetHeight;
  }

  resizeCanvas();
  window.addEventListener('resize', debounce(resizeCanvas, 250));

  // Butterfly class
  class Butterfly {
    constructor() {
      this.init(true);
    }

    init(randomY = false) {
      this.canvasWidth = canvas.width;
      this.canvasHeight = canvas.height;

      this.x = Math.random() * this.canvasWidth;
      this.y = randomY ? Math.random() * this.canvasHeight : this.canvasHeight + 20;

      this.size = Math.random() * 12 + 8; // Slightly smaller for realism

      // Physics vectors
      this.vx = (Math.random() - 0.5) * 2; // Horizontal velocity
      this.vy = -(Math.random() * 1 + 0.5); // Vertical upward bias

      // Target direction (wander)
      this.wanderAngle = Math.random() * Math.PI * 2;
      this.turnSpeed = Math.random() * 0.05 + 0.02;

      // Rotation and Wing state
      this.rotation = 0;
      this.wingAngle = 0;
      this.wingSpeed = Math.random() * 0.2 + 0.15;
      this.flapRange = 0.5;

      // Appearance
      this.opacity = Math.random() * 0.4 + 0.2;
      this.hue = Math.random() * 30 + 35; // Gold/Champagne range (35-65)
      this.colorVar = Math.random() * 20 - 10;
    }

    update() {
      // 1. Update Wander Angle (chaotic changing of direction)
      // Randomly turn left or right
      this.wanderAngle += (Math.random() - 0.5) * this.turnSpeed;

      // 2. Apply Wander Force to Velocity
      // A small push in the direction of wanderAngle
      const speed = 0.05;
      this.vx += Math.cos(this.wanderAngle) * speed;
      this.vy += Math.sin(this.wanderAngle) * speed;

      // 3. Apply Bias (Tendency to go up)
      this.vy -= 0.01;

      // 4. Limit Speed (Terminal velocity)
      const maxSpeed = 2;
      const velocity = Math.sqrt(this.vx * this.vx + this.vy * this.vy);
      if (velocity > maxSpeed) {
        this.vx = (this.vx / velocity) * maxSpeed;
        this.vy = (this.vy / velocity) * maxSpeed;
      }

      // 5. Update Position
      this.x += this.vx;
      this.y += this.vy;

      // 6. Calculate Banking (Rotation based on movement)
      // Butterflies tilt into the turn. 
      // Desired rotation is aligned with velocity, plus a sine wave for "fluttering"
      const desiredRotation = Math.atan2(this.vy, this.vx) + Math.PI / 2;
      // Smoothly interpolate current rotation to desired rotation
      this.rotation += (desiredRotation - this.rotation) * 0.1;

      // 7. Wing Animation
      // Flap faster when rising rapidly, slower when gliding
      const riseFactor = -this.vy; // Positive when going up
      const currentWingSpeed = this.wingSpeed + (riseFactor * 0.1);
      this.wingAngle += currentWingSpeed;

      // 8. Screen Wrapping
      if (this.y < -50) {
        this.y = this.canvasHeight + 50;
        this.x = Math.random() * this.canvasWidth;
      }
      if (this.x < -50) this.x = this.canvasWidth + 50;
      if (this.x > this.canvasWidth + 50) this.x = -50;
    }

    draw() {
      ctx.save();
      ctx.translate(this.x, this.y);
      ctx.rotate(this.rotation);
      ctx.globalAlpha = this.opacity;

      // Calculate flap (0 to 1, then mirrored etc)
      // Sin wave for flap: goes from -1 (wings down) to 1 (wings up)
      const flap = Math.sin(this.wingAngle);
      // Perspective shortening of wings: 1 = full width, 0.1 = folded up
      // We map sin(-1...1) to scale(0.2 ... 1.0)
      const wingScale = Math.abs(flap) * 0.8 + 0.2;

      const s = this.size;

      // Draw Shadow (simulated depth)
      // Only draw shadow if we want 3D effect, but might be too heavy. 
      // Let's stick to simple flat drawing for performance but cleaner shapes.

      /* RIGHT WING */
      ctx.save();
      ctx.scale(wingScale, 1);

      // Upper Wing
      ctx.beginPath();
      ctx.moveTo(2, 0);
      ctx.bezierCurveTo(s * 0.8, -s * 0.8, s * 1.5, -s * 1.2, s * 2.0, -s * 0.5);
      ctx.bezierCurveTo(s * 2.2, s * 0.2, s * 1.0, s * 0.5, 2, 2);
      // Gradient for wing
      const gradR = ctx.createLinearGradient(0, -s, s * 2, s);
      gradR.addColorStop(0, `hsla(${this.hue + this.colorVar}, 70%, 60%, 0.8)`);
      gradR.addColorStop(1, `hsla(${this.hue + this.colorVar - 10}, 60%, 40%, 0.6)`);
      ctx.fillStyle = gradR;
      ctx.fill();

      // Lower Wing
      ctx.beginPath();
      ctx.moveTo(2, 2);
      ctx.bezierCurveTo(s * 0.5, s * 2.0, s * 1.2, s * 1.8, 2, 0); // Simplified tear shape
      ctx.fillStyle = `hsla(${this.hue + this.colorVar}, 70%, 70%, 0.7)`;
      ctx.fill();

      ctx.restore();


      /* LEFT WING (Mirrored) */
      ctx.save();
      ctx.scale(-wingScale, 1);

      // Upper Wing
      ctx.beginPath();
      ctx.moveTo(2, 0);
      ctx.bezierCurveTo(s * 0.8, -s * 0.8, s * 1.5, -s * 1.2, s * 2.0, -s * 0.5);
      ctx.bezierCurveTo(s * 2.2, s * 0.2, s * 1.0, s * 0.5, 2, 2);
      ctx.fillStyle = gradR; // Reuse gradient
      ctx.fill();

      // Lower Wing
      ctx.beginPath();
      ctx.moveTo(2, 2);
      ctx.bezierCurveTo(s * 0.5, s * 2.0, s * 1.2, s * 1.8, 2, 0);
      ctx.fillStyle = `hsla(${this.hue + this.colorVar}, 70%, 70%, 0.7)`;
      ctx.fill();

      ctx.restore();

      /* BODY */
      ctx.beginPath();
      ctx.moveTo(0, -s * 0.5);
      ctx.lineTo(0, s * 0.5);
      ctx.lineWidth = s * 0.15;
      ctx.strokeStyle = `hsla(${this.hue - 20}, 40%, 30%, 0.9)`;
      ctx.lineCap = 'round';
      ctx.stroke();

      /* ANTENNAE */
      ctx.beginPath();
      ctx.moveTo(0, -s * 0.5);
      ctx.lineTo(-s * 0.3, -s * 0.9);
      ctx.moveTo(0, -s * 0.5);
      ctx.lineTo(s * 0.3, -s * 0.9);
      ctx.lineWidth = 1;
      ctx.strokeStyle = `hsla(${this.hue - 20}, 40%, 30%, 0.5)`;
      ctx.stroke();

      ctx.restore();
    }
  }

  // Create butterflies
  // Calculated for density suitable for desktop headers
  const butterflyCount = Math.min(Math.floor(canvas.width / 150), 12);
  for (let i = 0; i < butterflyCount; i++) {
    butterflies.push(new Butterfly());
  }

  // Animation loop
  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    butterflies.forEach(butterfly => {
      butterfly.update();
      butterfly.draw();
    });

    animationId = requestAnimationFrame(animate);
  }

  animate();

  // Pause when not visible to save battery
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        if (!animationId) animate();
      } else {
        cancelAnimationFrame(animationId);
        animationId = null;
      }
    });
  });

  observer.observe(hero);
}
