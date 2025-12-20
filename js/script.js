const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("navLinks");

function showUnavailable(event) {
    event.preventDefault();
    document.getElementById("projectModal").style.display = "flex";
}

function closeModal() {
    document.getElementById("projectModal").style.display = "none";
}

hamburger.addEventListener("click", () => {
navLinks.classList.toggle("active");
});