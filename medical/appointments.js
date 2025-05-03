// Appointment Management System
class AppointmentManager {
    constructor() {
        this.appointments = JSON.parse(localStorage.getItem('appointments')) || [];
        this.initializeEventListeners();
    }

    initializeEventListeners() {
        // Form submission
        const appointmentForm = document.getElementById('appointment-form');
        if (appointmentForm) {
            appointmentForm.addEventListener('submit', (e) => this.handleAppointmentSubmit(e));
        }

        // Load appointments table if it exists
        const appointmentsTable = document.getElementById('appointments-table');
        if (appointmentsTable) {
            this.loadAppointments();
        }
    }

    handleAppointmentSubmit(e) {
        e.preventDefault();
        
        const appointment = {
            id: Date.now(),
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            date: document.getElementById('date').value,
            service: document.getElementById('service')?.value || 'General Checkup',
            status: 'Scheduled'
        };

        this.addAppointment(appointment);
        e.target.reset();
        
        alert(`Thank you ${appointment.name}! Your appointment has been scheduled for ${appointment.date}. We will contact you shortly at ${appointment.email} or ${appointment.phone}.`);
    }

    addAppointment(appointment) {
        this.appointments.push(appointment);
        this.saveAppointments();
        this.loadAppointments();
    }

    deleteAppointment(id) {
        this.appointments = this.appointments.filter(apt => apt.id !== id);
        this.saveAppointments();
        this.loadAppointments();
    }

    editAppointment(id, updatedData) {
        const index = this.appointments.findIndex(apt => apt.id === id);
        if (index !== -1) {
            this.appointments[index] = { ...this.appointments[index], ...updatedData };
            this.saveAppointments();
            this.loadAppointments();
        }
    }

    saveAppointments() {
        localStorage.setItem('appointments', JSON.stringify(this.appointments));
    }

    loadAppointments() {
        const tableBody = document.querySelector('#appointments-table tbody');
        if (!tableBody) return;

        tableBody.innerHTML = '';
        
        this.appointments.forEach(apt => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${apt.name}</td>
                <td>${apt.email}</td>
                <td>${apt.phone}</td>
                <td>${apt.date}</td>
                <td>${apt.service}</td>
                <td>${apt.status}</td>
                <td>
                    <button onclick="appointmentManager.editAppointment(${apt.id})" class="edit-btn">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button onclick="appointmentManager.deleteAppointment(${apt.id})" class="delete-btn">
                        <i class="fas fa-trash"></i>
                    </button>
                </td>
            `;
            tableBody.appendChild(row);
        });
    }
}

// Initialize the appointment manager
const appointmentManager = new AppointmentManager(); 