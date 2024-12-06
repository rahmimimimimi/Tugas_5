// Menunggu DOM selesai dimuat
document.addEventListener("DOMContentLoaded", () => {
    // Scroll ke bagian tertentu saat menu diklik
    const menuItems = document.querySelectorAll(".header-list li, .footer-list li");
    const sections = document.querySelectorAll("section");
    
    menuItems.forEach((item, index) => {
        item.addEventListener("click", () => {
            sections[index]?.scrollIntoView({ behavior: "smooth" });
        });
    });

    // Highlight menu aktif saat menggulir
    const observerOptions = {
        root: null,
        rootMargin: "0px",
        threshold: 0.6, // Bagian terlihat minimal 60% untuk dianggap aktif
    };

    const observerCallback = (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                menuItems.forEach((item) => item.classList.remove("active"));
                const sectionIndex = Array.from(sections).indexOf(entry.target);
                menuItems[sectionIndex]?.classList.add("active");
            }
        });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    sections.forEach((section) => observer.observe(section));

    // Menampilkan popup informasi fenomena cuaca
    const contentItems = document.querySelectorAll(".contents-item");
    contentItems.forEach((item) => {
        item.addEventListener("click", () => {
            const title = item.querySelector("h3").textContent;
            const description = item.querySelector("p").textContent;

            // Buat elemen popup
            const popup = document.createElement("div");
            popup.className = "popup";
            popup.innerHTML = `
                <div class="popup-content">
                    <h3>${title}</h3>
                    <p>${description}</p>
                    <button class="close-btn">Tutup</button>
                </div>
            `;
            document.body.appendChild(popup);

            // Tutup popup
            popup.querySelector(".close-btn").addEventListener("click", () => {
                popup.remove();
            });
        });
    });

    // Tombol untuk mengubah tema
    const themeToggle = document.createElement("button");
    themeToggle.textContent = "Ganti Tema";
    themeToggle.className = "theme-toggle";
    document.body.appendChild(themeToggle);

    themeToggle.addEventListener("click", () => {
        document.body.classList.toggle("dark-theme");
        themeToggle.textContent = document.body.classList.contains("dark-theme") 
            ? "Tema Terang" 
            : "Ganti Tema";
    });
});
