const modal = document.getElementById("modal");
const modalTitle = document.getElementById("modalTitle");
const modalBadges = document.getElementById("modalBadges");
const modalContent = document.getElementById("modalContent");

const imgEl = document.getElementById("galleryImg");
const prevBtn = document.getElementById("galleryPrev");
const nextBtn = document.getElementById("galleryNext");

let imgs = [];
let idx = 0;

function showModal() {
  modal.classList.add("show");
}
function hideModal() {
  modal.classList.remove("show");
}

document.getElementById("modalBackdrop").onclick = hideModal;
document.getElementById("modalCloseBtn").onclick = hideModal;

function setGallery(){
  imgEl.src = imgs[idx] || "";

  const many = imgs.length > 1;
  prevBtn.style.display = many ? "block" : "none";
  nextBtn.style.display = many ? "block" : "none";
}

prevBtn.onclick = ()=>{
  if(imgs.length <= 1) return;
  idx = (idx - 1 + imgs.length) % imgs.length;
  setGallery();
}

nextBtn.onclick = ()=>{
  if(imgs.length <= 1) return;
  idx = (idx + 1) % imgs.length;
  setGallery();
}

document.querySelectorAll(".project.card").forEach((card) => {
  card.onclick = () => {
    modalTitle.textContent = card.querySelector("h3").textContent;
    const tech_lang = card.querySelector(".meta")?.textContent || "";
    modalBadges.innerHTML = "";

    if (tech_lang) {
      const b = document.createElement("span");
      b.className = "badge";
      b.textContent = tech_lang;
      modalBadges.appendChild(b);
    }

    const descBox = card.querySelector(".project-desc");
    const desc = descBox ? descBox.innerHTML : "";
    modalContent.innerHTML = desc || "<p> </p>";

    const imagesAttr = card.dataset.images;
    if(imagesAttr){
      imgs = imagesAttr.split(",").map(s => s.trim()).filter(Boolean);
    }else{
      const oneImg = card.querySelector("img")?.getAttribute("src") || "";
      imgs = oneImg ? [oneImg] : [];
    }

    idx = 0;
    setGallery();
    showModal();
    
  };
});

document.querySelectorAll(".card.cert").forEach(card=>{
  card.onclick = ()=>{
    modalTitle.textContent =
      card.querySelector("h3").textContent;
    modalBadges.innerHTML = "";

    modalContent.innerHTML = "";
    
    //ถ้ามี data-images ใช้, ถ้าไม่มีก็ใช้รูปในการ์ด
    const imagesAttr = card.dataset.images;
    if(imagesAttr){
      imgs = imagesAttr.split(",").map(s => s.trim()).filter(Boolean);
    }else{
      const oneImg = card.querySelector("img")?.getAttribute("src") || "";
      imgs = oneImg ? [oneImg] : [];
    }

    idx = 0;
    setGallery();
    showModal();
  }
});