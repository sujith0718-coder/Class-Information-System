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
announcements.forEach(function (announcement) {
    announcementList.innerHTML += `<div class="announcement-card">
        <h3>${announcement.title}</h3>
        <p>${announcement.priority}</p>
    </div>`


});
if (announcements.length === 0) {
    📢

You're all caught up!

No announcements today.

}
