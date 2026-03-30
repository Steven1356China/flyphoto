// 这个脚本的主要功能是：
// 1. 在 album.html 页面，从URL获取相册名，并加载对应图片。

document.addEventListener('DOMContentLoaded', function() {
    // 只有 album.html 页面需要动态加载图片
    if (document.getElementById('photos-container')) {
        loadAlbumPhotos();
    }
});

function loadAlbumPhotos() {
    // 从URL获取相册文件夹名，例如 `.../album.html?album=holiday-2026`
    const urlParams = new URLSearchParams(window.location.search);
    const albumName = urlParams.get('album');

    if (!albumName) {
        document.getElementById('photos-container').innerHTML = '<p>未指定相册。</p>';
        return;
    }

    // 更新页面标题
    document.getElementById('album-name').textContent = decodeURIComponent(albumName);

    // 注意：这里我们假设图片是 1.jpg, 2.jpg ... 你可以按需修改规则
    // 这是一个简单的示例，实际图片名需你手动维护。
    const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp'];
    const photosContainer = document.getElementById('photos-container');
    photosContainer.innerHTML = ''; // 清空

    // 模拟一个图片列表。**这里是关键：你需要手动更新这个数组，或改为从文件读取。**
    // 为了极简，我们假设相册文件夹里除了 cover.jpg 以外的图片都是要展示的。
    // 但静态站无法读取服务器文件列表，所以我们“写死”图片名。
    // 举例：如果你在 `holiday-2026` 文件夹里有 1.jpg, 2.jpg, 3.jpg
    const manualImageList = ['1.jpg', '2.jpg', '3.jpg']; // <-- 你必须手动修改这里！

    manualImageList.forEach(imgName => {
        const imgPath = `albums/${albumName}/${imgName}`;
        const div = document.createElement('div');
        div.className = 'photo-item';
        div.innerHTML = `<img src="${imgPath}" alt="${imgName}" loading="lazy">`;
        photosContainer.appendChild(div);
    });

    // 如果手动列表为空，显示提示
    if (manualImageList.length === 0) {
        photosContainer.innerHTML = '<p>此相册暂无照片。</p>';
    }
}
