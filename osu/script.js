const close_btn = document.querySelector(".lightbox-close");
const imgs = document.querySelectorAll("#img_gallery");
const lightbox = document.getElementById("lightbox-img");
const items = [...document.querySelectorAll(".gallery-item")];

const REPO_BASE_URL = "https://github.com/mezleca/mezleca/raw/main/osu";

const update_lightbox_image = (img) => {
    document.getElementById("lightbox").style.display = "flex";
    document.getElementById("lightbox-img").src = img;
}

const reset_lightbox_image = () => {
    document.getElementById("lightbox").style.display = "none";
    document.getElementById("lightbox-img").src = "";
}

imgs.forEach((img) => img.addEventListener("click", update_lightbox_image));
close_btn.addEventListener("click", reset_lightbox_image);

for (const item of items) {
    item.style.backgroundImage = `url("${item.dataset.bg}")`;

    item.addEventListener("click", (e) => {
        const name = item.dataset.name;

        if (!name || !e.target.classList.contains("title")) {
            update_lightbox_image(item.dataset.bg);
            return;
        }

        const item_name = `${name}.osk`;
        const item_path = `${REPO_BASE_URL}/skins/${name}/${item_name}`;

        console.log("attempting to download", item_path);
        
        const link = document.createElement("a");
        
        link.setAttribute("href", item_path);
        link.setAttribute("target", "_blank");
        link.setAttribute("download", item_name);
        link.click();
    });
};