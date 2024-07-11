const close_btn = document.querySelector(".lightbox-close");
const imgs = document.querySelectorAll("#img_gallery");
const download = document.querySelectorAll(".download_btn");

const open = (event) => {
    document.getElementById('lightbox').style.display = 'flex';
    document.getElementById('lightbox-img').src = event.target.src;
    document.getElementById('lightbox-img').alt = event.target.alt;
}

const close = () => {
    document.getElementById('lightbox').style.display = 'none';
}

imgs.forEach(img => img.addEventListener('click', open));
close_btn.addEventListener('click', close);

download.forEach(btn => btn.addEventListener('click', (e) => {

    const img = e.target.previousElementSibling;
    const img_url = img.src.split("/");

    const skin_name = img_url[img_url.length - 2];
    const skin_path = "/osu/skins/" + skin_name + "/" + skin_name + ".osk";

    console.log(skin_path);

    const link = document.createElement('a');
    
    link.setAttribute('href', skin_path);
    link.setAttribute('download', skin_name + ".osk");
    link.click();
}));