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

        announcements.forEach(function (announcement) {
            announcementList.innerHTML += `<div class="announcement-card">
        <h3>${announcement.title}</h3>
        <p>${announcement.priority}</p>
    </div>`


        });
    }
}
displayAnnouncements();

const addBtn = document.getElementById("add-btn");
const form = document.getElementById("announcement-form");
const title = document.getElementById("title-input");

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



