const muteBtn = document.querySelectorAll(".mute_btn");
muteBtn.forEach((item) => {
  item.addEventListener("click", () => {
    item.classList.toggle("active");
  });
});

let currentPageIndex = 0;
const pages = document.querySelectorAll(".page");
const totalPages = pages.length;

document.querySelectorAll(".next-btn").forEach((button) => {
  button.addEventListener("click", function () {
    goToNextPage();
  });
});

function goToNextPage() {
  if (currentPageIndex === 1) {
    pages.forEach((item) => {
      item.style.transform = "translateX(-200%)";
    });
  }
  if (currentPageIndex === 0) {
    currentPageIndex++;
    pages.forEach((item) => {
      item.style.transform = "translateX(-100%)";
    });
  }
}
