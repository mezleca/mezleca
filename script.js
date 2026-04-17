const REPO_BASE_URL = "https://github.com/mezleca/mezleca/raw/main";
const NO_IMAGE_URL = `${REPO_BASE_URL}/static/no-image.png`;

const lightbox_element = document.getElementById("lightbox");
const lightbox_image_element = document.getElementById("lightbox-img");
const lightbox_close_button = document.querySelector(".lightbox-close");
const gallery_item_elements = document.querySelectorAll(".gallery-item");

const resolve_image_url = (image_url) => {
    if (!image_url || image_url == "no-image") {
        return NO_IMAGE_URL;
    }

    return image_url;
};

const update_lightbox_image = (image_url) => {
    if (!lightbox_element || !lightbox_image_element) {
        return;
    }

    lightbox_element.style.display = "flex";
    lightbox_image_element.src = resolve_image_url(image_url);
};

const reset_lightbox_image = () => {
    if (!lightbox_element || !lightbox_image_element) {
        return;
    }

    lightbox_element.style.display = "none";
    lightbox_image_element.src = "";
};

const build_item_download_info = (item_name, item_route) => {
    const route_prefix = item_route ? `${item_route}/` : "";
    const file_name = `${item_name}.osk`;
    const file_path = `${REPO_BASE_URL}/${route_prefix}skins/${item_name}/${file_name}`;

    return {
        file_name,
        file_path
    };
};

const trigger_file_download = (file_name, file_path) => {
    const link = document.createElement("a");

    link.setAttribute("href", file_path);
    link.setAttribute("target", "_blank");
    link.setAttribute("download", file_name);
    link.click();
};

const handle_gallery_item_click = (event, item_element) => {
    const clicked_link_btn = event.target.closest(".link_btn");

    if (clicked_link_btn) {
        return;
    }

    const clicked_download_btn = event.target.closest(".download-btn");

    if (!clicked_download_btn) {
        update_lightbox_image(item_element.dataset.bg);
        return;
    }

    const item_name = item_element.dataset.name;

    if (!item_name) {
        console.error(`download failed for ${item_name}`);
        return;
    }

    event.preventDefault();
    event.stopPropagation();

    const download_info = build_item_download_info(item_name, item_element.dataset.route);
    trigger_file_download(download_info.file_name, download_info.file_path);
};

if (lightbox_close_button) {
    lightbox_close_button.addEventListener("click", reset_lightbox_image);
}

for (const item_element of gallery_item_elements) {
    item_element.style.backgroundImage = `url("${resolve_image_url(item_element.dataset.bg)}")`;
    item_element.addEventListener("click", (event) => {
        handle_gallery_item_click(event, item_element);
    });
}
