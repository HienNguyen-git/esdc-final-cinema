const schedulePanel = document.querySelector('.schedule-panel')
const myLocalhost = location.origin

schedulePanel.addEventListener('click', (e) => {
    if (e.target.classList.contains("schedule-item")) {
        console.log(e.target.dataset.show)
        location.href = myLocalhost + "/booking/option?id=" + e.target.dataset.show
    }
})