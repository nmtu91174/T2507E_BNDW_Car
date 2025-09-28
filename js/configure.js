// Đường dẫn tới file JSON
fetch("data/configure.json")
  .then(res => res.json())
  .then(data => {
    const variants = data.variants;

    const tabs = document.querySelectorAll(".variant-tabs a");
    const titleEl = document.querySelector(".configure-text h1");
    const imgEl = document.querySelector(".configure-image img");
    const infoEl = document.querySelector(".configure-info");

    tabs.forEach(tab => {
      tab.addEventListener("click", e => {
        e.preventDefault();

        // Xóa active cũ
        document.querySelector(".variant-tabs a.active").classList.remove("active");
        tab.classList.add("active");

        // Lấy id từ text tab (TEMERARIO / REVUELTO / URUS SE)
        const id = tab.textContent.trim().toLowerCase().replace(" ", "-");

        // Tìm variant tương ứng trong JSON
        const variant = variants.find(v => v.id === id);
        if (!variant) return;

        // Cập nhật nội dung
        titleEl.textContent = variant.title;
        imgEl.src = variant.image;
        infoEl.textContent = variant.info;
      });
    });
  })
  .catch(err => console.error("Lỗi khi tải configure.json:", err));
