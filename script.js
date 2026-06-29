const announcements = [
    {
        title: "DSP Hall Changed",
        priority: "🔴 Critical"
    }
    ,
    {
        title: "Record Submission Tomorrow",
        priority: "🟠 Important"

    }
    ,
    {
        title: "Faculty Leave",
        priority: "🟢 Information"
    }

];
delBtn = document.querySelector(".delBtn");
function del(index) {
    if (!confirm("Are you sure you want to delete this announcement?"))
        return;

    announcements.splice(index, 1);



    displayAnnouncements();
}
function edi(index) {
    const newTitle = prompt("Enter new title", announcements[index].title);
    if (newTitle === null)
        return;
    if (newTitle.trim() === "") {
        alert("Please enter an announcement.")
        return;
    }

    announcements[index].title = newTitle.trim();
    announcements[index].priority = "promptz";
    displayAnnouncements();

}


const announcementList = document.getElementById("announcement-list");

function displayAnnouncements() {
    if (announcements.length === 0) {
        announcementList.innerHTML = `
        <div class="announcement-card">
            <h3>📢 You're all caught up!</h3>
            <p>No announcements today.</p>
        </div>
    `;
    }
    else {
        announcementList.innerHTML = "";

        announcements.forEach(function (announcement, index) {
            announcementList.innerHTML += `<div class="announcement-card">
        <h3>${announcement.title}</h3>
        <p>${announcement.priority}</p>
        <button class=editBtn onclick="edi(${index})">Edit</button>
        <button class=delBtn onclick="del(${index})">Delete</button>
    </div>`



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

    announcements.push(newAnnouncement);
    displayAnnouncements();

    title.value = "";
    priority.selectedIndex = 0;


    form.style.display = "none";

});



