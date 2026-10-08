# Kevin Adhitya — Executive Portfolio & Company Profile

A modern, high-end portfolio and company profile website crafted with **Apple.com design aesthetics**, minimalist monochrome styling (Black & White), and smooth micro-interactions.

---

## 🌟 Key Highlights & Features

- **Apple-Style Global Navigation Bar**:
  - Translucent frosted glass effect (`backdrop-filter: blur(20px)`).
  - Hover-triggered expandable mega-menu tray showcasing **Experience**, **Education**, **Portfolio**, and **Capabilities**.
  - Dynamic page dimmer backdrop and mobile responsive slide drawer.
  - Built-in Apple Dark Mode (Space Black) & Light Mode (Ceramic White) switch.

- **Executive Company Profile Homepage**:
  - **Hero Keynote Presentation**: Bold typography, core statistics strip, and executive tagline.
  - **Dual Profile Photo Studio**: Interactive toggle between **Executive (Formal)** and **Developer (Casual)** view.
  - **Company Profile / About Kevin**: Architectural rigor, cross-domain adaptability, and engineering philosophy.
  - **Enterprise Internship Journey**:
    - **PT Darodata Teknologi** — Software Engineer Intern (Data Systems & Pipelines)
    - **PT Lion Air Mentari** — IT & Software Systems Intern (Aviation Operations)
    - **PT Sysnetsoft** — Software Development Intern (Enterprise SaaS Applications)
  - **Academic Milestone**:
    - **Binus University (Class of 2024)** — Bachelor of Computer Science (Sarjana Komputer, S.Kom).
  - **Curated Projects Showcase**:
    - Category filters (All, Enterprise Systems, Data Platforms, Web Applications).
    - Device mockups & interactive architectural specification modals.
  - **Capabilities Bento Grid**:
    - Programming languages, frontend craft, backend architecture, databases, and DevOps.
  - **Direct Contact & Channel Links**:
    - Email, LinkedIn, GitHub, and message form.

---

## 📸 Cara Memasang Foto Kamu (Formal & Santai/Casual)

Website sudah dilengkapi dengan 2 placeholder SVG bergaya Apple yang rapi dan elegan. Untuk memasang foto asli kamu:

### Opsi 1: Lewat Tombol di Website (Langsung Preview)
1. Buka website di browser.
2. Di bagian Hero, klik tombol **"Update / Preview Your Photos"** di sebelah kanan tombol CTA.
3. Pilih slot yang ingin kamu ganti (**Formal Executive** atau **Casual Developer**).
4. Drag & drop atau pilih file foto kamu (JPG / PNG). Foto akan langsung tampil seketika!

### Opsi 2: Simpan File ke Folder `assets/images/`
Kamu cukup copy foto kamu ke folder ini dengan nama:
- `assets/images/kevin-formal.jpg` (untuk foto formal jas / kemeja)
- `assets/images/kevin-casual.jpg` (untuk foto semi-formal / santai / ngoding)

Lalu pada `assets/js/main.js` dan `index.html`, ganti path src gambar ke file jpg tersebut.

---

## 🚀 Cara Menjalankan Website

### 1. Buka Langsung (Tanpa Server)
Kamu bisa langsung klik dua kali file [index.html](file:///c:/Users/kevin/Herd/portofolio%20kevin/index.html) di Windows Explorer untuk membukanya di browser (Chrome, Edge, Safari, dll).

### 2. Melalui Local Development Server
Server lokal sudah siap di port `8080`:
```
http://127.0.0.1:8080
```
Atau jika menggunakan Laravel Herd, buka domain Herd kamu.

---

## 📂 Struktur File

```
portofolio kevin/
├── index.html                  # Halaman utama (Apple company profile layout)
├── README.md                   # Panduan & dokumentasi
└── assets/
    ├── css/
    │   └── style.css           # Styling bertema Apple (Dark & Light monochrome)
    ├── js/
    │   └── main.js             # Logika hover navbar, switcher foto, modal, tema
    └── images/
        ├── kevin-formal.svg    # Placeholder portrait formal
        └── kevin-casual.svg    # Placeholder portrait casual
```
