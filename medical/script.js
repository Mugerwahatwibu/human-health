// Animation observer
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate__animated', 'animate__fadeInUp');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all elements with animation classes
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    animatedElements.forEach(element => {
        observer.observe(element);
    });
});

// Modal functionality
function showModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

// Close modal when clicking outside
window.onclick = function(event) {
    if (event.target.classList.contains('modal')) {
        event.target.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

// Form handling
function handleAppointmentSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const appointment = {
        id: Date.now(),
        name: formData.get('name'),
        email: formData.get('email'),
        phone: formData.get('phone'),
        date: formData.get('date'),
        service: formData.get('service'),
        status: 'scheduled',
        createdAt: new Date().toISOString()
    };

    // Get existing appointments
    let appointments = JSON.parse(localStorage.getItem('appointments')) || [];
    appointments.push(appointment);
    localStorage.setItem('appointments', JSON.stringify(appointments));

    // Close modal and show success message
    closeModal('appointmentModal');
    alert('Appointment scheduled successfully!');
    event.target.reset();
}

function handleRegistrationSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const registration = {
        id: Date.now(),
        name: formData.get('name'),
        email: formData.get('email'),
        phone: formData.get('phone'),
        service: formData.get('service'),
        createdAt: new Date().toISOString()
    };

    // Get existing registrations
    let registrations = JSON.parse(localStorage.getItem('registrations')) || [];
    registrations.push(registration);
    localStorage.setItem('registrations', JSON.stringify(registrations));

    // Close modal and show success message
    closeModal('registrationModal');
    alert('Registration successful! You will receive access details via email.');
    event.target.reset();
}

// Initialize forms
document.addEventListener('DOMContentLoaded', () => {
    const appointmentForm = document.getElementById('appointmentForm');
    const registrationForm = document.getElementById('registrationForm');

    if (appointmentForm) {
        appointmentForm.addEventListener('submit', handleAppointmentSubmit);
    }

    if (registrationForm) {
        registrationForm.addEventListener('submit', handleRegistrationSubmit);
    }
}); 