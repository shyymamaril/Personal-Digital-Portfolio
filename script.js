
// MOBILE NAVIGATION
const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");

if (menuBtn && navLinks) {
  menuBtn.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("active");
    menuBtn.setAttribute("aria-expanded", isOpen);
    menuBtn.textContent = isOpen ? "×" : "☰";
  });

  document.querySelectorAll(".nav-links a").forEach(link => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("active");
      menuBtn.setAttribute("aria-expanded", "false");
      menuBtn.textContent = "☰";
    });
  });
}

// CERTIFICATE POPUP
const certificateFiles = [
  "certificates/certificate-1.jpg",
  "certificates/certificate-2.jpg",
  "certificates/certificate-3.jpg",
  "certificates/certificate-4.jpg",
  "certificates/certificate-5.jpg"
];

const certificateModal = document.getElementById("certificateModal");
const certificateImage = document.getElementById("certificateImage");

function openCertificate(index) {
  if (!certificateModal || !certificateImage || !certificateFiles[index]) return;

  certificateImage.src = certificateFiles[index];
  certificateImage.alt = "Certificate " + (index + 1);

  certificateModal.classList.add("show");
  document.body.style.overflow = "hidden";
}

function closeCertificate() {
  if (!certificateModal || !certificateImage) return;

  certificateModal.classList.remove("show");
  certificateImage.src = "";
  document.body.style.overflow = "";
}

// PROJECT SCREENSHOT GALLERY
const projectImages = {
  dormitory: [
    "images/dormitory-1.jpg",
    "images/dormitory-2.jpg",
    "images/dormitory-3.jpg",
    "images/dormitory-4.jpg"
  ],

  capstone: [
    "projects/capstone-1.jpg"
  ]
};

const galleryModal = document.getElementById("galleryModal");
const galleryImages = document.getElementById("galleryImages");
const galleryTitle = document.getElementById("galleryTitle");

function openGallery(project) {
  if (!galleryModal || !galleryImages || !galleryTitle) return;

  galleryImages.innerHTML = "";
  galleryImages.classList.remove("single-image");

  const images = projectImages[project];

  if (!images) return;

  const isCapstone = project === "capstone";

  galleryTitle.textContent = isCapstone
    ? "AGRICULTURAL DATA MANAGEMENT SYSTEM"
    : "DORMITORY ASSIGNMENT SYSTEM";

  if (isCapstone) {
    galleryImages.classList.add("single-image");
  }

  images.forEach((src, index) => {
    const img = document.createElement("img");

    img.src = src;
    img.alt = project + " screenshot " + (index + 1);
    img.loading = "lazy";

    img.onerror = () => {
      img.alt = "Image not found. Please check the filename: " + src;
    };

    galleryImages.appendChild(img);
  });

  galleryModal.classList.add("show");
  document.body.style.overflow = "hidden";
}

function closeGallery() {
  if (!galleryModal || !galleryImages) return;

  galleryModal.classList.remove("show");
  galleryImages.innerHTML = "";
  galleryImages.classList.remove("single-image");
  document.body.style.overflow = "";
}

// VIDEO DEMONSTRATION
const videoModal = document.getElementById("videoModal");
const projectVideo = document.getElementById("projectVideo");

function openVideo() {
  if (!videoModal) return;

  videoModal.classList.add("show");
  document.body.style.overflow = "hidden";
}

function closeVideo() {
  if (!videoModal) return;

  if (projectVideo) {
    projectVideo.pause();
    projectVideo.currentTime = 0;
  }

  videoModal.classList.remove("show");
  document.body.style.overflow = "";
}

// CLOSE POPUPS WHEN CLICKING OUTSIDE
[certificateModal, galleryModal, videoModal]
  .filter(Boolean)
  .forEach(modal => {
    modal.addEventListener("click", event => {
      if (event.target === modal) {
        if (modal === certificateModal) closeCertificate();
        if (modal === galleryModal) closeGallery();
        if (modal === videoModal) closeVideo();
      }
    });
  });

// CLOSE POPUPS USING ESCAPE KEY
document.addEventListener("keydown", event => {
  if (event.key === "Escape") {
    closeCertificate();
    closeGallery();
    closeVideo();
  }
});

// BACK TO TOP
const backToTop = document.getElementById("backToTop");

if (backToTop) {
  window.addEventListener("scroll", () => {
    if (window.scrollY > 350) {
      backToTop.classList.add("visible");
    } else {
      backToTop.classList.remove("visible");
    }
  });

  backToTop.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  });
}

// CONTACT MESSAGE FORM
const contactForm = document.getElementById("contactForm");

if (contactForm) {
  contactForm.addEventListener("submit", event => {
    event.preventDefault();

    const name = document.getElementById("senderName").value.trim();
    const email = document.getElementById("senderEmail").value.trim();
    const message = document.getElementById("senderMessage").value.trim();

    if (!name || !email || !message) {
      alert("Please complete all the required fields.");
      return;
    }

    const subject = encodeURIComponent("Portfolio Inquiry from " + name);

    const body = encodeURIComponent(
      "Name: " + name +
      "\nEmail: " + email +
      "\n\nMessage:\n" + message
    );

    window.location.href =
      "mailto:shyymamaril@gmail.com?subject=" +
      subject + "&body=" + body;
  });
}
