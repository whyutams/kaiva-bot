function createCircularImage(imageUrl, size = 64, callback) {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = function () {
        const canvas = document.createElement("canvas");
        canvas.width = size;
        canvas.height = size;
        const ctx = canvas.getContext("2d");

        ctx.beginPath();
        ctx.arc(size / 2, size / 2, size / 2, 0, Math.PI * 2);
        ctx.closePath();
        ctx.clip();

        ctx.drawImage(img, 0, 0, size, size);

        callback(canvas.toDataURL("image/png"));
    };
    img.src = imageUrl;
}