let announcements = JSON.parse(localStorage.getItem("announcements")) || [];
let editIndex = -1;
let currentFilter = "All";
let searchText = "";
let todayChanges = [
    {
        type: "hall",
        priority: "high",
        message: "🏫 DSP Lab moved to B-204"
    },
    {
        type: "faculty",
        priority: "low",
        message: "👨‍🏫 Math Faculty: Present"
    },
    {
        type: "exam",
        priority: "medium",
        message: "⏳ CA-2: 12 Days Left"
    }
    , {
        type: "faculty",
        priority: "high",
        message: "👨‍🏫 Math Faculty: ab"
    },
    {
        type: "exam",
        priority: "high",
        message: "⏳ CA-2: 12 Days come"
    }
];


function del(index) {
    if (!confirm("Are you sure you want to delete this announcement?"))
        return;

    announcements.splice(index, 1);



    displayAnnouncements();
    saveToLocalStorage();
}

const searchInput = document.getElementById("searchInput");
searchInput.addEventListener("input", function () {
    searchText = searchInput.value.trim();
    displayAnnouncements();

});
function edi(index) {
    editIndex = index;
    form.style.display = "block";
    saveBtn.textContent = "Update";
    title.value = announcements[index].title;
    priority.value = announcements[index].priority;
}


const announcementList = document.getElementById("announcement-list");

function displayAnnouncements() {
    let filteredAnnouncements = announcements;

    if (currentFilter !== "All") {
        filteredAnnouncements = announcements.filter(function (announcement) {
            return announcement.priority === currentFilter;
        })
    };

    if (searchText !== "") {
        filteredAnnouncements = filteredAnnouncements.filter(function (announcement) {
            return announcement.title.toLowerCase().includes(searchText.toLowerCase());
        })
    }


    if (announcements.length === 0) {
        announcementList.innerHTML = `
        <div class="announcement-card">
            <h3 >📢 You're all caught up!</h3>
            <p >No announcements today.</p>
        </div>
    `;
    }
    else if (filteredAnnouncements.length === 0) {
        announcementList.innerHTML = `
        <div class="announcement-card">
            <h3 >🔍 No announcements found.</h3>
            <p >Try a different search.</p>
        </div>
    `;
    }
    else {
        announcementList.innerHTML = "";

        filteredAnnouncements.forEach(function (announcement) {
            const oriIndex = announcements.indexOf(announcement);
            let priorityClass = "";
            if (announcement.priority == "🔴 Critical") {
                priorityClass = "critical";

            }
            else if (announcement.priority == "🟠 Important") {
                priorityClass = "important";

            }
            else priorityClass = "info";
            const date = new Date(announcement.createdAt);
            const formattedDate = date.toLocaleDateString("en-GB", {
                day: "numeric",
                month: "short",
                year: "numeric"

            });
            const formattedTime = date.toLocaleTimeString("en-US", {
                hour: "numeric",
                minute: "2-digit",
                hour12: true


            });

            announcementList.innerHTML += `<div class="announcement-card announcement-card-${priorityClass}">
        <h3 >${announcement.title}</h3>
        <p >${announcement.priority}</p>
        <small>${formattedDate} • ${formattedTime}</small>
        <div class="btn-group">
        <button class="edit-Btn" onclick="edi(${oriIndex})">Edit</button>
        <button class="delete-Btn" onclick="del(${oriIndex})">Delete</button>
        </div>
    </div>`




        });

    }



}
displayAnnouncements();

const addBtn = document.getElementById("add-btn");
const allBtn = document.getElementById("allBtn");
const criticalBtn = document.getElementById("criticalBtn");
const importantBtn = document.getElementById("importantBtn");
const infoBtn = document.getElementById("infoBtn");

const filterButtons = [allBtn, criticalBtn, importantBtn, infoBtn];
function setActiveButton(activeButton) {

    filterButtons.forEach(btn => btn.classList.remove("active-filter"));
    activeButton.classList.add("active-filter");
    searchText = "";
    searchInput.value = "";



}
allBtn.addEventListener("click", function () {
    currentFilter = "All";
    setActiveButton(allBtn);
    displayAnnouncements();
});
criticalBtn.addEventListener("click", function () {
    currentFilter = "🔴 Critical";
    setActiveButton(criticalBtn);
    displayAnnouncements();
});
importantBtn.addEventListener("click", function () {
    currentFilter = "🟠 Important";
    setActiveButton(importantBtn);
    displayAnnouncements();
});
infoBtn.addEventListener("click", function () {
    currentFilter = "🟢 Information";
    setActiveButton(infoBtn);
    displayAnnouncements();
});

const form = document.getElementById("announcement-form");
const title = document.getElementById("title-input");
const priority = document.getElementById("priority-input");
addBtn.addEventListener("click", function () { form.style.display = "block"; title.focus(); });
const cancelBtn = document.getElementById("cancelBtn")
cancelBtn.addEventListener("click", function () { form.style.display = "none"; title.value = ""; priority.selectedIndex = 0; editIndex = -1; saveBtn.textContent = "Save"; });
const saveBtn = document.getElementById("saveBtn");
saveBtn.addEventListener("click", function () {

    if (title.value.trim() === "") {
        alert("Please enter an announcement.")
        return;
    }

    const newAnnouncement = {
        title: title.value.trim(),
        priority: priority.value,
        createdAt: new Date()

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
setActiveButton(allBtn);

function getColor(priority) {
    switch (priority) {
        case "high":
            return "#ef4444";   // Red
        case "medium":
            return "#f59e0b";   // Orange
        case "low":
            return "#22c55e";   // Green
        default:
            return "#3b82f6";   // Blue
    }
}
function displayImportantUpdates() {
    const changes = document.getElementById("changes");
    const importantUpdates = document.getElementById("importantUpdates");
    importantUpdates.innerHTML += `<h3>📢 Latest Important Updates</h3>`;

    todayChanges.forEach(function (item) {
        if (item.priority === "high") {
            importantUpdates.innerHTML += `
                <div class="announcement-card">
                    <p>${item.message}</p>
                </div>
            `;
        }
    });
}

function displayTodayChanges() {
    const changes = document.getElementById("changes");


    changes.innerHTML = `
        <h2>🚨 Today's Changes</h2>

        <button id="sameBtn">🔄 Same as Previous</button>
        <button id="newBtn">➕ New Changes</button>
        <div id="todayChangesList"></div>
        <div id="importantUpdates"></div>
    `;
    const todayChangesList = document.getElementById("todayChangesList");
    todayChanges.forEach(function (item) {
        todayChangesList.innerHTML += `
            <div class="announcement-card"
                 style="border-left:5px solid ${getColor(item.priority)}">
                <p>${item.message}</p>
            </div>
        `;
    });
    const sameBtn = document.getElementById("sameBtn");

    sameBtn.addEventListener("click", function () {
        alert("Showing previous day's changes.");
    });
}

displayTodayChanges();
displayImportantUpdates();



