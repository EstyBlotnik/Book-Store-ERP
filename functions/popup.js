document.addEventListener("DOMContentLoaded", () => {
    const openPopup = document.getElementById("openPopup");
    const popup = document.getElementById("popup");
    const closePopup = document.getElementById("closePopup");
    const submit = document.getElementById("submit");
    // פונקציה לפתיחת ה-popup
    openPopup.addEventListener("click", () => {
        popup.classList.remove("hidden");
    });

    // פונקציה לסגירת ה-popup
    closePopup.addEventListener("click", () => {
        popup.classList.add("hidden");
    });

    submit.addEventListener("click", () => {
        popup.classList.add("hidden");
    });

    // לסגור את ה-popup כשנלחץ מחוץ לו
    window.addEventListener("click", (event) => {
        if (event.target === popup) {
            popup.classList.add("hidden");
        }
    });
});
