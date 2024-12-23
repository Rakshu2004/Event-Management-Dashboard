let events = [];
let attendees = [];
let tasks = [];

function clearFormFields(fields) {
    fields.forEach(id => document.getElementById(id).value = '');
}

function addEvent() {
    const name = document.getElementById('eventName').value;
    const description = document.getElementById('eventDescription').value;
    const location = document.getElementById('eventLocation').value;
    const date = document.getElementById('eventDate').value;
    if (name && description && location && date) {
        events.push({ name, description, location, date });
        displayEvents();
        clearFormFields(['eventName', 'eventDescription', 'eventLocation', 'eventDate']);
        alert('Event added successfully!');
    } else alert('Fill all fields!');
}

function displayEvents() {
    const list = document.getElementById('eventList');
    list.innerHTML = events.map((e, i) => `
        <div class="event-item">
            <span>${e.name} (${e.date})</span>
            <div class="event-actions">
                <button onclick="editEvent(${i})">Edit</button>
                <button onclick="deleteEvent(${i})">Delete</button>
            </div>
        </div>`).join('');
}

function editEvent(index) {
    const event = events[index];
    document.getElementById('eventName').value = event.name;
    document.getElementById('eventDescription').value = event.description;
    document.getElementById('eventLocation').value = event.location;
    document.getElementById('eventDate').value = event.date;
    deleteEvent(index);
    
}

function deleteEvent(index) {
    events.splice(index, 1);
    displayEvents();
    
}

function addAttendee() {
    const name = document.getElementById('attendeeName').value;
    const email = document.getElementById('attendeeEmail').value;
    if (name && email) {
        attendees.push({ name, email });
        displayAttendees();
        clearFormFields(['attendeeName', 'attendeeEmail']);
        alert('Attendee added successfully!');

    } else alert('Fill all fields!');
}

function displayAttendees() {
    const list = document.getElementById('attendeeList');
    list.innerHTML = attendees.map((a, i) => `
        <div class="attendee-item">
            <span>${a.name} (${a.email})</span>
            <div class="attendee-actions">
                <button onclick="deleteAttendee(${i})">Delete</button>
            </div>
            
        </div>`).join('');
        
}

function deleteAttendee(index) {
    attendees.splice(index, 1);
    displayAttendees();
    
}

function addTask() {
    const name = document.getElementById('taskName').value;
    const deadline = document.getElementById('deadline').value;
    if (name && deadline) {
        tasks.push({ name, deadline, status: 'Pending' });
        displayTasks();
        updateProgress();
        clearFormFields(['taskName', 'deadline']);
        alert('Task added successfully!');
    } else alert('Fill all fields!');
}

function updateTaskStatus() {
    const selectedTask = document.getElementById('taskSelect').value;
    const status = document.getElementById('taskStatus').value;
    if (selectedTask !== '') {
        tasks[selectedTask].status = status;
        updateProgress();
        
        clearFormFields(['taskSelect', 'taskStatus']);
    } else alert('Select a task to update!');
}

function displayTasks() {
     const taskSelect = document.getElementById('taskSelect');
     taskSelect.innerHTML = '<option value="">Select Task</option>';
     tasks.forEach((task, index) => {
         taskSelect.innerHTML += `<option value="${index}">${task.name} (Due: ${task.deadline})</option>`;
     });
 }

 function updateProgress() {
    const completed = tasks.filter(t => t.status === 'Completed').length;
    const progress = tasks.length > 0 ? (completed / tasks.length) * 100 : 0;
    document.getElementById('taskProgress').style.width = progress + '%';
}
