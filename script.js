let announcements = JSON.parse(localStorage.getItem("announcements")) || [];
let editIndex = -1;

delBtn = document.querySelector(".delBtn");
function del(index) {
    if (!confirm("Are you sure you want to delete this announcement?"))
        return;

    announcements.splice(index, 1);



    displayAnnouncements();
    saveToLocalStorage();
}
function edi(index) {
    editIndex = index;
    form.style.display = "block";
    saveBtn.textContent = "Update";
    title.value = announcements[index].title;
    priority.value = announcements[index].priority;
}


const announcementList = document.getElementById("announcement-list");

function displayAnnouncements() {


    if (announcements.length === 0) {
        announcementList.innerHTML = `
        <div class="announcement-card">
            <h3 >📢 You're all caught up!</h3>
            <p >No announcements today.</p>
        </div>
    `;
    }
    else {
        announcementList.innerHTML = "";

        announcements.forEach(function (announcement, index) {
            let priorityClass = "";
            announcementList.innerHTML += `<div class="announcement-card ${priorityClass}">
        <h3 >${announcement.title}</h3>
        <p >${announcement.priority}</p>
        <button class=editBtn onclick="edi(${index})">Edit</button>
        <button class=delBtn onclick="del(${index})">Delete</button>
    </div>`
            if (announcement.priority == "🔴 Critical") {
                priorityClass = "critical";

            }
            else if (announcement.priority == "🟠 Important") {
                priorityClass = "important";

            }
            else priorityClass = "info";



        });

    }



}
displayAnnouncements();

const addBtn = document.getElementById("add-btn");
const form = document.getElementById("announcement-form");
const title = document.getElementById("title-input");
const priority = document.getElementById("priority-input");
addBtn.addEventListener("click", function () { form.style.display = "block"; title.focus(); });


const saveBtn = document.getElementById("saveBtn");
saveBtn.addEventListener("click", function () {

    if (title.value.trim() === "") {
        alert("Please enter an announcement.")
        return;
    }

    const newAnnouncement = {
        title: title.value.trim(), priority: priority.value

    };

    if (editIndex === -1) {
        announcements.push(newAnnouncement);
    }
    else {
        announcements[editIndex].title = title.value;
        announcements[editIndex].priority = priority.value;
        editIndex = -1;
    }

    displayAnnouncements();
    saveToLocalStorage();

    title.value = "";
    priority.selectedIndex = 0;


    form.style.display = "none";
    saveBtn.textContent = "Save";


});

function saveToLocalStorage() {
    localStorage.setItem("announcements", JSON.stringify(announcements));
};




