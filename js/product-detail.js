// --- GALLERY MULTI-SECTION --- //
initGallery("#gallery1");
initGallery("#gallery2");

function initGallery(selector) {
  const gallery = document.querySelector(selector);
  const slides = gallery.querySelectorAll(".slide");
  const dots = gallery.querySelectorAll(".dot");
  const prevBtn = gallery.querySelector(".nav.prev");
  const nextBtn = gallery.querySelector(".nav.next");

  let current = 0;
  let autoPlay;

  function showSlide(index) {
    slides.forEach((s, i) => {
      s.classList.toggle("active", i === index);
      dots[i].classList.toggle("active", i === index);
    });
    current = index;
  }

  prevBtn.addEventListener("click", () => {
    let newIndex = (current - 1 + slides.length) % slides.length;
    showSlide(newIndex);
    resetAutoPlay();
  });

  nextBtn.addEventListener("click", () => {
    let newIndex = (current + 1) % slides.length;
    showSlide(newIndex);
    resetAutoPlay();
  });

  dots.forEach((d, i) => {
    d.addEventListener("click", () => {
      showSlide(i);
      resetAutoPlay();
    });
  });

  function startAutoPlay() {
    autoPlay = setInterval(() => {
      let newIndex = (current + 1) % slides.length;
      showSlide(newIndex);
    }, 5000);
  }

  function resetAutoPlay() {
    clearInterval(autoPlay);
    startAutoPlay();
  }

  startAutoPlay();
}


// --- FEATURE HIGHLIGHTS --- //
const featureSection = document.querySelector(".design-section.feature");
const tabs = featureSection.querySelectorAll(".variant-tabs li");
const videoContainer = featureSection.querySelector(".design-video");
const subtitleEl = featureSection.querySelector(".feature-subtitle");
const titleEl = featureSection.querySelector(".design-text h2");
const descEl = featureSection.querySelector(".design-text .feature-desc");

// Dữ liệu cho từng tab
const featureData = {
  "SPACEFRAME": {
    type: "video",
    src: "videos/featured-1.mp4",
    title: "SPACEFRAME",
    desc: ` Made entirely of aluminum, the frame debuts a new high-strength alloy 
            for high-pressure castings, the use of high-strength hydroformed 
            extrusions, and an increase in the number of hollow castings with thin 
            closed inertia profiles, already introduced on the rear frame of the Revuelto, 
            achieved through the use of internal cores. These technologies allowed for the minimization 
            of the constructional complexity of the spaceframe, a high level of functional integration 
            linked to the installation of the new hybrid powertrain (over 50% fewer components compared 
            to the same perimeter of application on the Huracán), and a significant reduction in the number 
            of welds with heat input (over 80% less total weld bead length compared to the Huracán). The new 
            construction archetype has, therefore, allowed increases in torsional stiffness of over 20% compared
            to the previous generation spaceframe. It also offers the greatest possible level of vehicle weight 
            limitation, guarantees the highest level of occupant safety and significantly contributes to the vehicle's 
            excellent driving dynamics.`
    },
  "POWERTRAIN": {
    type: "video",
    src: "videos/featured-2.mp4",
    title: "POWERTRAIN",
    desc: `The new engine was designed from scratch in Sant’Agata Bolognese to provide driving performance and emotions that could exceed those of the current Huracán range. It combines the high progression linearity that has made the Lamborghini V10 famous with the high-power and specific torque of a new-generation turbo engine.The V8 twin-turbo engine has a 4.0 l displacement and excellent 200 CV/l specific output. The combustion engine provides maximum power of 800 CV between 9,000 and 9,750 rpm, reaching maximum revolutions of 10,000 rpm. This value is usually only seen in racing engines, making the new V8 unique and without precedent within the landscape of street-legal supercars.  The hybrid system combines the twin-turbo V8 with three electric motors and the 8-speed dual-clutch transmission. It generates an overall maximum power of 920 CV and 730 Nm torque, which allow it to accelerate from 0 to 100 km/h in only 2.7 seconds and generate a maximum speed of 343 km/h.`
  },
  "AERODYNAMICS": {
    type: "video",
    src: "videos/featured-3.mp4",
    title: "AERODYNAMICS",
    desc: `With Temerario, Lamborghini reaches the peak of aerodynamic efficiency, contributing to the attainment of three primary design objectives: high-speed stability, increased cooling performance, and maximum braking efficiency.Lamborghini's engineers started with a white sheet to design the entire vehicle body, both in terms of body and underbody. They also considered the requirements derived from introducing the new hybrid powertrain and the objective of increasing the aerodynamic load, especially at the rear. This allowed them to attain +118% compared to the Huracán EVO, which increases to +158% in the Alleggerita Package version.Each element was designed to combine excellent aerodynamic performance with unique style characteristics, from the front daytime running lights, which become aerodynamic elements due to the air intakes with deflectors, to the roof with a concave profile that directs the air toward the rear spoiler, and the bottom equipped with vortex generators that provide optimum flows toward the diffuser.`
  },
  "DRIVING MODES": {
    type: "image",
    src: "images/featured/1.webp",
    title: "DRIVING MODES",
    desc: `Temerario delivers unparalleled driving emotions thanks to newly developed driving modes that will make you feel like you’re sitting in the cockpit of a racecar. Electric performance strategies can be combined with driving modes to create optimal driving conditions, adapting the characteristics of your Temerario to the situation at hand. 

Città, Strada, Sport, and Corsa can be paired with different energy modes in up to 13 combinations to maximize the hybrid powertrain's potential.`
  },
  "LDVI 2.0": {
    type: "image",
    src: "images/featured/2.webp",
    title: "LDVI 2.0",
    desc: `Temerario features a new, even more advanced version of the Lamborghini Integrated Vehicle Dynamics. Thanks to the Integrated Traction Control feature, the system can predict the terrain grip and adjust acceleration and braking power accordingly. It also comes with an extended feature for drift enhancement, allowing the driver to adjust the drift level via three dedicated modes.`
  },
  "HMI & INFOTAINMENT": {
    type: "image",
    src: "images/featured/3.webp",
    title: "HMI & INFOTAINMENT",
    desc: `Temerario offers a new Human Machine Interface system (HMI). This enhanced version consists of three displays: a digital instrument cluster, a central monitor, and a passenger display. All three displays are controlled by a single “electronic brain” that ensures maximum consistency in terms of layout and user experience. Graphics have been updated to include 3D and animations, with the dashboard offering new customization possibilities to allow the user to select the view they prefer among three options. Customization choices have also been added to the Infotainment system, which allows the user to create a truly immersive experience based on their preferences. The swipe feature allows content to be moved from the central monitor to the driver and passenger displays with a movement as easy as the swipe of one finger, just like on a smartphone display.

The updated look of the HMI system is consistent with the all-new Lamborghini Electrified Range feeling, which made its debut on Revuelto.`
  }
};

// Xử lý khi click tab
tabs.forEach(tab => {
  tab.addEventListener("click", () => {
    // Đổi tab active
    tabs.forEach(t => t.classList.remove("active"));
    tab.classList.add("active");

    const key = tab.textContent.trim();
    const data = featureData[key];
    if (!data) return;

    // Cập nhật nội dung text
    subtitleEl.textContent = "FEATURE HIGHLIGHTS";
    titleEl.textContent = data.title;
    descEl.textContent = data.desc;

    // Cập nhật video / ảnh
    videoContainer.innerHTML = "";
    if (data.type === "video") {
      videoContainer.innerHTML = `
        <video autoplay muted loop playsinline width="470" height="540" style="object-fit:cover">
          <source src="${data.src}" type="video/mp4">
        </video>`;
    } else {
      videoContainer.innerHTML = `
        <img src="${data.src}" alt="${data.title}" width="470" height="540" style="object-fit:cover">`;
    }
  });
});

// === FEEL THE ENGINE ===
const audio = document.getElementById("engine-sound"); // Âm thanh động cơ
const playBtn = document.getElementById("play-btn");   // Nút Play/Pause
const barsGroup = document.getElementById("bars");     // Nhóm SVG chứa các thanh bars và vòng tròn

if (audio && playBtn && barsGroup) {
  // 🔹 Xoá vòng tròn mặc định (nếu HTML có sẵn — tránh trùng 2 vòng)
  const oldCircle = barsGroup.parentNode.querySelector("circle");
  if (oldCircle) oldCircle.remove();

  // --- Cấu hình tổng quát ---
  const numBars = 120;   // ✅ số lượng thanh bars (tăng để mịn, giảm để thưa)
  const center = 100;    // ✅ tâm của SVG (cố định, không cần chỉnh)

  // --- Tuỳ chỉnh khoảng cách và độ dài ---
  // 👉 Đây là 3 giá trị bạn có thể điều chỉnh để đổi layout:
  const baseRadius = 80;   // 🔸 bán kính vòng tròn (càng lớn → vòng tròn càng xa nút)
  const innerRadius = 193;  // 🔸 điểm đầu mỗi thanh (gần vòng tròn)
  const outerRadius = 225;  // 🔸 điểm cuối mỗi thanh (độ dài thanh ban đầu)
  // Gợi ý:
  // - Tăng baseRadius & innerRadius → đẩy vòng tròn và thanh ra xa nút.
  // - Tăng outerRadius → kéo dài thanh bars ra xa hơn.
  // - Giảm innerRadius → làm bars "bắt đầu" gần nút hơn.

  // --- Vẽ 1 vòng tròn duy nhất ---
  const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
  circle.setAttribute("cx", center);              // Tâm X
  circle.setAttribute("cy", center);              // Tâm Y
  circle.setAttribute("r", baseRadius);           // 🔸 Bán kính vòng tròn (gần nút)
  circle.setAttribute("stroke", "#e6b800");       // Màu vàng (Lamborghini)
  circle.setAttribute("stroke-width", "1.4");     // Độ dày đường tròn
  circle.setAttribute("fill", "none");            // Không tô màu trong
  circle.setAttribute("opacity", "0.9");          // Độ trong suốt nhẹ
  barsGroup.appendChild(circle);

  // --- Vẽ các thanh bars (hướng ra ngoài) ---
  for (let i = 0; i < numBars; i++) {
    const line = document.createElementNS("http://www.w3.org/2000/svg", "line");

    // 🔸 Các điểm tọa độ (vẽ từ trong → ra ngoài)
    line.setAttribute("x1", center);
    line.setAttribute("y1", innerRadius);  // điểm gần vòng tròn
    line.setAttribute("x2", center);
    line.setAttribute("y2", outerRadius);  // điểm ngoài cùng (xa hơn)
    
    // 🔸 Style của thanh
    line.setAttribute("stroke", "#ffffff");        // Màu trắng
    line.setAttribute("stroke-width", "1.6");      // Độ dày thanh
    line.setAttribute("stroke-linecap", "round");  // Bo tròn đầu thanh

    // 🔸 Quay thanh quanh tâm (để tạo vòng 360°)
    line.setAttribute("transform", `rotate(${i * (360 / numBars)} ${center} ${center})`);
    
    barsGroup.appendChild(line);
  }

  // --- Thiết lập Audio Context ---
  const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  const analyser = audioCtx.createAnalyser();
  const source = audioCtx.createMediaElementSource(audio);
  source.connect(analyser);
  analyser.connect(audioCtx.destination);
  analyser.fftSize = 256; // độ phân giải phân tích tần số (cao hơn → mịn hơn)

  const bufferLength = analyser.frequencyBinCount;
  const dataArray = new Uint8Array(bufferLength);
  const lines = barsGroup.querySelectorAll("line");

  // --- Hiệu ứng bars khi phát nhạc ---
  function animateBars() {
    requestAnimationFrame(animateBars);
    analyser.getByteFrequencyData(dataArray);

    lines.forEach((line, i) => {
      const amplitude = dataArray[i % bufferLength] / 4;  // 🔸 độ mạnh của tần số
      const dynamicOuter = outerRadius + amplitude * 1.2;  // 🔸 bars dài thêm khi âm thanh mạnh
      // 👉 Muốn bars rung mạnh hơn → tăng hệ số *1.2 (ví dụ *1.6)
      line.setAttribute("y2", dynamicOuter);
    });
  }
  animateBars();

  // --- Khi click vào nút Play ---
  playBtn.addEventListener("click", async () => {
    try {
      if (audioCtx.state === "suspended") {
        await audioCtx.resume(); // cần thiết trên Chrome / Safari
      }

      if (audio.paused) {
        await audio.play(); // phát âm thanh
        playBtn.textContent = "❚❚"; // đổi icon
        playBtn.classList.add("active");
      } else {
        audio.pause(); // tạm dừng
        playBtn.textContent = "▶";
        playBtn.classList.remove("active");
      }
    } catch (err) {
      console.error("Audio play error:", err);
    }
  });
}

