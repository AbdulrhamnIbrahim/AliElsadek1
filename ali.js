// إرسال نموذج عبر فتح واتساب مع محتوى الحجز
document.getElementById("sendBtn").addEventListener("click", function () {
  const name = (document.getElementById("name").value || "—").trim();
  const phone = (document.getElementById("phone").value || "—").trim();
  const type = (document.getElementById("type").value || "—").trim();
  const msg = (document.getElementById("msg").value || "—").trim();

  // غيّر رقم الواتساب هنا لرقم الشيخ علي (بدون +)
  const waNumber = "201055551234";

  const text = `طلب حجز\nالاسم: ${name}\nالهاتف: ${phone}\nنوع المناسبة: ${type}\nالتفاصيل: ${msg}`;
  const encoded = encodeURIComponent(text);

  const url = `https://wa.me/${waNumber}?text=${encoded}`;
  window.open(url, "_blank");
});
// في ali.js
const sections = document.querySelectorAll("section");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
      }
    });
  },
  {
    threshold: 0.2,
  }
);

sections.forEach((section) => observer.observe(section));
const selectBox = document.getElementById("customSelect");
const selectHead = document.getElementById("selectHead");
const selectOptions = selectBox.querySelectorAll(".choose");
const hiddenInput = document.getElementById("type");

selectHead.addEventListener("click", () => {
  selectBox.classList.toggle("active");
});

selectOptions.forEach((option) => {
  option.addEventListener("click", () => {
    selectHead.textContent = option.textContent;
    hiddenInput.value = option.textContent;
    selectBox.classList.remove("active");
  });
});

// غلق عند الضغط خارج العنصر
document.addEventListener("click", (e) => {
  if (!selectBox.contains(e.target)) {
    selectBox.classList.remove("active");
  }
});
const toggleBtn = document.getElementById("themeToggle");

const savedTheme = localStorage.getItem("theme");
if(savedTheme === "light"){
  document.body.classList.add("light-theme");
  toggleBtn.textContent = "☀️";
}

toggleBtn.onclick = () =>{
  document.body.classList.toggle("light-theme");

  if(document.body.classList.contains("light-theme")){
    localStorage.setItem("theme","light");
    toggleBtn.textContent = "☀️";
  }else{
    localStorage.setItem("theme","dark");
    toggleBtn.textContent = "🌙";
  }
};
const clickSound = document.getElementById("clickSound");

document.querySelectorAll("button,.btn,.choose").forEach(el=>{
  el.addEventListener("click",()=>{
    clickSound.currentTime = 0;
    clickSound.play();
  });
});
["name","phone","msg"].forEach(id=>{
  const field = document.getElementById(id);
  field.value = localStorage.getItem(id) || "";

  field.oninput = ()=>{
    localStorage.setItem(id, field.value);
  };
});
if("Notification" in window){
  Notification.requestPermission();
}

document.getElementById("sendBtn").onclick = ()=>{
  if(Notification.permission === "granted"){
    new Notification("تم إرسال طلبك ✅",{
      body:"سنقوم بالتواصل معك في أقرب وقت"
    });
  }
};

document.addEventListener("DOMContentLoaded", function () {
  const videos = document.querySelectorAll(".lazy-video");

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const video = entry.target;
        const source = video.querySelector("source");

        if (source.dataset.src) {
          source.src = source.dataset.src;
          video.load();
          observer.unobserve(video);
        }
      }
    });
  }, {
    rootMargin: "200px"
  });

  videos.forEach((video) => observer.observe(video));
});


// بديل: استبدال أي صور فاشلة بصورة افتراضية
(function () {
  const imgs = document.querySelectorAll("img");
  imgs.forEach((i) => {
    i.addEventListener("error", () => {
      i.src =
        "data:image/svg+xml;charset=utf-8," +
        encodeURIComponent(
          `<svg xmlns="http://www.w3.org/2000/svg" width="600" height="400"><rect width="100%" height="100%" fill="#111827"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="#94a3b8" font-size="20">الصورة غير متاحة</text></svg>`
        );
    });
  });
})();
