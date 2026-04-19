const list = document.getElementById("headerPageList");
document.getElementById("headerMenuButton").addEventListener("click", () => {
  list.classList.add("active");
});
document.getElementById("mobileHeaderCloseBtn").addEventListener("click", () => {
  list.classList.remove("active");
});