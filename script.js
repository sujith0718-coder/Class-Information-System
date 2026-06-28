var announcements = [
    {
        title: "DSP Hall Changed",
        priority: "Critical"
    }
    ,
    {
        title: "Record Submission Tomorrow",
        priority: "Important"

    }
    ,
    {
        title: "Faculty Leave",
        priority: "Information"
    }

];

var announcementList = document.getElementById("announcements-list");
announcements.forEach(function (announcement) {
    announcementList.innerHTML += `<div class="announcement-card">
        <h3>${announcement.title}</h3>
        <p>${announcement.priority}</p>
    </div>`


});
