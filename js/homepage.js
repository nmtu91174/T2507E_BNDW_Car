// Đường dẫn đến file JSON
const url = "./data/homepage.json";

fetch(url)
  .then(rs => rs.json())
  .then(data => {
    const models = data.models;

    let currentModelIndex = 0;      // index THẬT của model (0..N-1)
    let currentVariantIndex = 0;
    let isTransitioning = false;    // chặn double-click khi đang animate

    const track = document.getElementById("modelTrack");
    const ghostLeft  = document.getElementById("sideLeft");
    const ghostRight = document.getElementById("sideRight");

    /* ---------- Helpers ---------- */
    function createSlide(m, mi, variantIndex = 0) {
      const v = m.variants[variantIndex];
      const slide = document.createElement("div");
      slide.className = "model-content";
      slide.setAttribute("data-mi", String(mi)); // luôn lưu index model thật
      slide.innerHTML = `
        <div class="model-wordmark">
          <img src="${m.wordmark}" alt="Wordmark">
        </div>
        <h1 class="model-slogan">${v.slogan}</h1>
        <div class="hero-car">
          <img src="${v.heroImage}" alt="Hero image">
        </div>
        <h2 class="family-name">${m.family}</h2>
        <div class="model-name-row">
          <ul class="variant-tabs">
            ${m.variants.map((variant, idx) =>
              `<li data-mi="${mi}" data-vi="${idx}" class="${idx === variantIndex ? "active" : ""}">
                 ${variant.label}
               </li>`
            ).join("")}
          </ul>
        </div>
        <div class="actions">
          <a href="${v.link || '#'}" class="btn-gold" target="_blank">EXPLORE THE MODEL →</a>
          <a href="${v.brochure || '#'}" class="btn-white" target="_blank">DOWNLOAD BROCHURE ⬇</a>
        </div>
        <div class="model-info">${v.info}</div>
      `;
      return slide;
    }

    function setGhostImages(mi) {
      const total = models.length;
      const prev = (mi - 1 + total) % total;
      const next = (mi + 1) % total;

      ghostLeft.src  = models[prev].variants[0].heroImage;
      ghostRight.src = models[next].variants[0].heroImage;
    }

    // ĐẶT ghost về trạng thái đứng yên, hiện ngay (dùng khi khởi tạo)
    function showGhostIdle() {
      ghostLeft.style.transition  = "none";
      ghostRight.style.transition = "none";
      ghostLeft.style.opacity  = 0.2;
      ghostRight.style.opacity = 0.2;
      ghostLeft.style.transform  = "translateX(0) translateY(-50%)";
      ghostRight.style.transform = "translateX(0) translateY(-50%)";
    }

    // Animate ghost chạy cùng chiều với main
    function animateGhost(direction) {
      const startX = (direction === 1) ? "100%" : "-100%";

      ghostLeft.style.transition  = "none";
      ghostRight.style.transition = "none";
      ghostLeft.style.opacity  = 0.2;
      ghostRight.style.opacity = 0.2;
      ghostLeft.style.transform  = `translateX(${startX}) translateY(-50%)`;
      ghostRight.style.transform = `translateX(${startX}) translateY(-50%)`;

      // đảm bảo browser apply vị trí start trước khi animate
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          ghostLeft.style.transition  = "transform 0.6s ease, opacity 0.6s ease";
          ghostRight.style.transition = "transform 0.6s ease, opacity 0.6s ease";
          ghostLeft.style.transform  = "translateX(0) translateY(-50%)";
          ghostRight.style.transform = "translateX(0) translateY(-50%)";
          ghostLeft.style.opacity  = 0.5;
          ghostRight.style.opacity = 0.5;

          setTimeout(() => {
            ghostLeft.style.opacity  = 0.2;
            ghostRight.style.opacity = 0.2;
          }, 600);
        });
      });
    }

    /* ---------- Render + Events ---------- */
    function renderSlides() {
      track.innerHTML = "";

      // Clone cuối → đầu
      track.appendChild(createSlide(models[models.length - 1], models.length - 1));

      // Các slide thật
      models.forEach((m, mi) => {
        track.appendChild(createSlide(m, mi));
      });

      // Clone đầu → cuối
      track.appendChild(createSlide(models[0], 0));

      // Bắt đầu đứng tại slide thật đầu tiên (offset -100%)
      track.style.transition = "none";
      track.style.transform  = "translateX(-100%)";

      // Gán event cho tabs (đổi variant tại chỗ, không slide, không ghost)
      track.querySelectorAll(".variant-tabs li").forEach(li => {
        li.addEventListener("click", () => {
          const mi = parseInt(li.getAttribute("data-mi"));
          const vi = parseInt(li.getAttribute("data-vi"));
          currentModelIndex = mi;
          currentVariantIndex = vi;
          updateVariantOnly(mi, vi);
        });
      });
    }

    // Cập nhật nội dung variant trong TẤT CẢ slide có cùng model (cả thật và clone)
    function updateVariantOnly(mi, vi) {
      const v = models[mi].variants[vi];
      const sameModelSlides = [...track.children].filter(el => el.getAttribute("data-mi") === String(mi));
      sameModelSlides.forEach(slide => {
        slide.querySelector(".model-slogan").innerText = v.slogan;
        slide.querySelector(".hero-car img").src = v.heroImage;
        slide.querySelector(".model-info").innerText = v.info;

        const tabs = slide.querySelectorAll(".variant-tabs li");
        tabs.forEach(tab => tab.classList.remove("active"));
        const activeTab = slide.querySelector(`.variant-tabs li[data-vi="${vi}"]`);
        if (activeTab) activeTab.classList.add("active");
      });
    }

    // Đi tới model index mi (có thể -1 hoặc N để đi vào clone)
    function goToSlide(mi, direction = 1) {
      if (isTransitioning) return;
      isTransitioning = true;

      // Cập nhật ghost rồi animate
      setGhostImages((mi + models.length) % models.length);
      animateGhost(direction);

      const offset = -(mi + 1) * 100; // +1 vì đầu track có clone cuối
      track.style.transition = "transform 0.6s ease";
      track.style.transform  = `translateX(${offset}%)`;

      track.addEventListener("transitionend", () => {
        isTransitioning = false;

        // Nếu đang ở clone đầu/cuối thì teleport về slide thật tương ứng
        if (mi < 0) {
          currentModelIndex = models.length - 1;
          track.style.transition = "none";
          track.style.transform  = `translateX(${-models.length * 100}%)`;
          setGhostImages(currentModelIndex);
          showGhostIdle();
        } else if (mi >= models.length) {
          currentModelIndex = 0;
          track.style.transition = "none";
          track.style.transform  = `translateX(-100%)`;
          setGhostImages(currentModelIndex);
          showGhostIdle();
        } else {
          currentModelIndex = mi;
        }
      }, { once: true });
    }

    /* ---------- Init ---------- */
    renderSlides();

    // Khởi tạo ghost NGAY KHI VÀO TRANG
    setGhostImages(0);
    // Nếu ảnh chưa load kịp, vẫn ép hiện thị vị trí/opacity cho chắc
    if (ghostLeft.complete && ghostRight.complete) {
      showGhostIdle();
    } else {
      // hiển thị khi một trong hai ảnh tải xong, đồng thời có fallback
      let shown = false;
      const showOnce = () => { if (!shown) { shown = true; showGhostIdle(); } };
      ghostLeft.addEventListener("load", showOnce, { once: true });
      ghostRight.addEventListener("load", showOnce, { once: true });
      setTimeout(showOnce, 80); // fallback nhỏ để chắc chắn ghost hiện
    }

    // Prev / Next
    document.querySelector(".nav-btn.prev").addEventListener("click", () => {
      goToSlide(currentModelIndex - 1, -1);
    });

    document.querySelector(".nav-btn.next").addEventListener("click", () => {
      goToSlide(currentModelIndex + 1, 1);
    });
  })
  .catch(err => {
    console.error("Không load được data/homepage.json:", err);
  });
