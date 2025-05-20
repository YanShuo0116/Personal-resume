# 個人履歷網站特色效果

本文檔記錄了個人履歷網站中使用的特色JavaScript和CSS效果，展示網站的互動性和視覺設計。
訪問網站：[https://yanshuo0116.github.io/Personal-resume/](https://yanshuo0116.github.io/Personal-resume/)

## 特色JavaScript效果

### 1. 滑鼠跟隨光暈效果

在專業領域卡片上實現的滑鼠跟隨效果，使光暈跟隨滑鼠位置移動。

```javascript
// main.js
// 為專業領域卡片添加滑鼠跟隨效果
$(document).ready(function() {
    // 滑鼠跟隨效果
    $('.choose_list_item').each(function() {
        $(this).on('mousemove', function(e) {
            const card = $(this);
            const circle = card.find('.hover-circle');
            
            // 獲取卡片位置
            const cardOffset = card.offset();
            
            // 計算滑鼠在卡片內的相對位置
            const mouseX = e.pageX - cardOffset.left;
            const mouseY = e.pageY - cardOffset.top;
            
            // 設置光暈位置
            circle.css({
                'opacity': 1,
                'left': mouseX + 'px',
                'top': mouseY + 'px'
            });
        });
        
        $(this).on('mouseleave', function() {
            const circle = $(this).find('.hover-circle');
            circle.css('opacity', 0);
        });
    });
});
```

### 2. WOW.js視覺差動畫

使用WOW.js庫實現元素進入視窗時的動畫效果，增強頁面視覺體驗。

```javascript
// main.js
var wow = new WOW({
    mobile: false // 設置只在非移動設備上觸發
});
wow.init();

// 卡片進入視口時添加動畫效果
$('.choose_list_item').each(function(index) {
    $(this).addClass('wow fadeInRight');
    $(this).attr('data-wow-delay', (0.2 + index * 0.2) + 's');
});
```

### 3. Three.js 3D模型加載與旋轉

使用Three.js加載並展示3D GLB模型，實現模型自動旋轉效果。

```javascript
// interests.js
// 初始化單個 Three.js 場景
function initThreeJsScene(interestId, modelPath) {
    const container = document.getElementById(`model-${interestId}`);
    if (!container) return;
    
    // 創建場景
    const scene = new THREE.Scene();
    scene.background = null; // 透明背景
    
    // 創建相機
    const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
    camera.position.z = 5;
    
    // 創建渲染器
    const renderer = new THREE.WebGLRenderer({ 
        antialias: true,
        alpha: true // 啟用透明度
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setClearColor(0x000000, 0); // 透明背景
    renderer.outputEncoding = THREE.sRGBEncoding; // 改善色彩呈現
    renderer.physicallyCorrectLights = true; // 物理正確的光照
    renderer.toneMapping = THREE.ACESFilmicToneMapping; // 更好的色調映射
    renderer.toneMappingExposure = 1.5; // 增加曝光度
    container.appendChild(renderer.domElement);
    
    // 添加多種光源以增強視覺效果
    // 環境光 - 柔和的整體照明
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);
    
    // 主方向光 - 模擬太陽光
    const mainLight = new THREE.DirectionalLight(0xffffff, 1.2);
    mainLight.position.set(5, 10, 7);
    mainLight.castShadow = true;
    scene.add(mainLight);
    
    // 加載 GLB 模型
    const loader = new THREE.GLTFLoader();
    let model;
    
    loader.load(modelPath, function(gltf) {
        model = gltf.scene;
        
        // 調整模型大小和位置
        const box = new THREE.Box3().setFromObject(model);
        const size = box.getSize(new THREE.Vector3());
        const maxDim = Math.max(size.x, size.y, size.z);
        const scale = 4 / maxDim; // 模型放大兩倍
        model.scale.set(scale, scale, scale);
        
        // 將模型居中
        const center = box.getCenter(new THREE.Vector3());
        model.position.x = -center.x * scale;
        model.position.y = -center.y * scale;
        model.position.z = -center.z * scale;
        
        scene.add(model);
    });
    
    // 存儲 Three.js 實例
    threeInstances[interestId] = {
        scene: scene,
        camera: camera,
        renderer: renderer,
        getModel: () => model
    };
    
    // 啟動動畫循環
    animate(interestId);
}

// 動畫循環
function animate(interestId) {
    const instance = threeInstances[interestId];
    if (!instance) return;
    
    requestAnimationFrame(() => animate(interestId));
    
    const model = instance.getModel();
    if (model) {
        // 平滑旋轉模型（速度調慢）
        model.rotation.y += 0.005;
    }
    
    instance.renderer.render(instance.scene, instance.camera);
}
```

### 4. 媒體格式自動識別與適配

自動識別不同的媒體類型（圖片、GIF、視頻），並創建相應的HTML元素。

```javascript
// interests.js
// 構建輪播項目
interest.images.forEach((image, index) => {
    // 檢查文件類型
    const fileExt = image.split('.').pop().toLowerCase();
    const isVideo = fileExt === 'mp4' || fileExt === 'webm' || fileExt === 'ogg';
    const isGif = fileExt === 'gif';
    
    let mediaContent;
    if (isVideo) {
        mediaContent = 
            `<video controls autoplay loop muted>
                <source src="${image}" type="video/${image.split('.').pop()}">
                您的瀏覽器不支援影片播放。
            </video>`;
    } else {
        // 特別處理GIF，確保它作為圖片顯示
        mediaContent = `<img src="${image}" alt="${interest.title} ${index + 1}" ${isGif ? 'class="gif-image"' : ''}>`;
    }
    
    carouselItems += `
        <div class="carousel-item" data-index="${index}">
            ${mediaContent}
        </div>
    `;
});
```

### 5. 無縫輪播與自動循環

實現無縫循環的圖片輪播效果，使用CSS動畫控制輪播移動。

```javascript
// interests.js
// 構建完整的模態框 HTML
modal.innerHTML = `
    <button class="back-button">
        <i class="fa fa-arrow-left"></i>
    </button>
    <div class="modal-content">
        <span class="close-modal">&times;</span>
        <h3>${interest.title}</h3>
        <div class="carousel fullscreen-carousel">
            <div class="carousel-track">
                ${carouselItems}
            </div>
        </div>
        <div class="interest-description">
            <p>${interest.description}</p>
            ${youtubeEmbed}
        </div>
    </div>
`;
```

```css
/* interests.css */
/* 輪播軌道 */
.carousel-track {
    display: flex;
    width: 1000%; /* 10張圖片，每張佔10% */
    height: 100%;
    position: relative;
    animation: slideshow 30s linear infinite; /* 更慢 */
}

/* 滑動動畫 */
@keyframes slideshow {
    0% {
        transform: translateX(0);
    }
    100% {
        transform: translateX(-50%); /* 只需滑動一半 */
    }
}
```

### 6. 粒子效果互動

使用Particle.js創建互動式粒子背景效果。

```javascript
// Particle.js
particlesJS("particles-js", {
    "particles": {
      "number": {
        "value": 80
      },
      "size": {
        "value": 3
      }
    },
    "interactivity": {
      "events": {
        "onhover": {
          "enable": true,
          "mode": "repulse"
        }
      }
    }
});
```

### 7. 模態框動態創建與動畫

動態創建模態框並添加平滑的動畫效果。

```javascript
// interests.js
// 打開興趣詳情模態框
function openInterestModal(interest) {
    // 移除任何已存在的模態框
    const existingModal = document.getElementById('interest-modal');
    if (existingModal) {
        existingModal.remove();
    }
    
    // 創建模態框元素
    const modal = document.createElement('div');
    modal.id = 'interest-modal';
    modal.className = 'interest-modal';
    
    // ... 構建模態框內容 ...
    
    // 添加到文檔
    document.body.appendChild(modal);
    
    // 顯示模態框
    setTimeout(() => {
        modal.classList.add('show');
    }, 10);
    
    // 關閉按鈕和返回按鈕事件
    modal.querySelector('.close-modal').addEventListener('click', function() {
        closeInterestModal();
    });
    
    modal.querySelector('.back-button').addEventListener('click', function() {
        closeInterestModal();
    });
    
    // 按ESC鍵關閉模態框
    document.addEventListener('keydown', function handleEsc(e) {
        if (e.key === 'Escape') {
            closeInterestModal();
            document.removeEventListener('keydown', handleEsc);
        }
    });
}

// 關閉興趣詳情模態框
function closeInterestModal() {
    const modal = document.getElementById('interest-modal');
    if (modal) {
        modal.classList.remove('show');
        
        // 移除模態框
        setTimeout(() => {
            modal.remove();
        }, 300); // 等待過渡動畫完成
    }
} 
```

## 特色CSS效果

### 1. 3D翻轉卡片效果

使用3D變換和透視效果創建卡片懸停時的立體翻轉效果。

```css
/* interests.css */
.interest-card {
    margin-bottom: 30px;
    transition: all 0.3s ease;
    perspective: 1000px;
    width: 33.333%; /* 電腦版三欄 */
    padding: 0 15px;
    box-sizing: border-box;
}

.interest-inner {
    background-color: #fff;
    border-radius: 16px;
    overflow: hidden;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
    position: relative;
    height: 360px; /* 更高的卡片 */
    transform-style: preserve-3d;
    transition: transform 0.5s;
}

.interest-card:hover .interest-inner {
    transform: translateY(-15px);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.25);
}
```

### 2. 漸變按鈕與懸停動畫

創建具有漸變背景和懸停動畫效果的按鈕。

```css
/* interests.css */
/* 按鈕樣式 */
.btn-primary {
    background: linear-gradient(to right, #4a90e2, #5ca9fb);
    border: none;
    transition: all 0.3s ease;
}

.btn-primary:hover {
    background: linear-gradient(to right, #357abd, #4a90e2);
    transform: scale(1.05);
}

/* style.css */
.choose_btn .btn-primary {
    background: linear-gradient(to right, #4a90e2, #5ca9fb);
    color: #fff;
    padding: 12px 25px;
    font-size: 1rem;
    border-radius: 30px;
    border: none;
    box-shadow: 0 4px 10px rgba(74,144,226,0.3);
    transition: all 0.3s ease;
}

.choose_btn .btn-primary:hover {
    background: linear-gradient(to right, #357abd, #4a90e2);
    transform: scale(1.05);
    box-shadow: 0 6px 15px rgba(74,144,226,0.4);
}
```

### 3. 自定義滾動條樣式

自定義滾動條的外觀，增強用戶體驗。

```css
/* interests.css */
/* 增加描述區域的滾動條樣式 */
.interest-description::-webkit-scrollbar {
    width: 8px;
}

.interest-description::-webkit-scrollbar-track {
    background: rgba(0, 0, 0, 0.1);
    border-radius: 4px;
}

.interest-description::-webkit-scrollbar-thumb {
    background: rgba(0, 0, 0, 0.3);
    border-radius: 4px;
}

.interest-description::-webkit-scrollbar-thumb:hover {
    background: rgba(0, 0, 0, 0.5);
}
```

### 4. 漸變背景與浮動效果

使用漸變背景和陰影創建浮動效果。

```css
/* interests.css */
/* 模型容器 */
.model-container {
    height: 280px; /* 更大的模型容器 */
    position: relative;
    background: linear-gradient(135deg, #f0f8ff 0%, #e6f0fa 100%); /* 更亮的背景 */
    display: flex;
    justify-content: center;
    align-items: center;
}

/* style.css */
.choose_list_item {
    background-color: #fff;
    border-radius: 5px;
    overflow: hidden;
    margin-bottom: 30px;
    position: relative;
    z-index: 5;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.08);
    transition: all 0.3s ease;
    padding: 40px 20px;
    display: flex;
    align-items: center;
}

.choose_list_item:hover {
    transform: translateY(-10px);
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.15);
}
```

### 5. 響應式設計適配

使用媒體查詢實現在不同設備上的最佳顯示效果。

```css
/* interests.css */
/* 響應式設計 */
@media (max-width: 992px) {
    .interest-inner {
        height: 340px;
    }
    
    .model-container {
        height: 260px;
    }
    
    .carousel {
        height: 400px;
    }
}

@media (max-width: 768px) {
    #interests-container {
        padding: 0 10px;
    }
    
    .interest-card {
        width: 50%; /* 手機版兩欄 */
        padding: 0 10px;
        margin-bottom: 20px;
    }
    
    .interest-inner {
        height: 320px;
    }
    
    .model-container {
        height: 240px;
    }
    
    .carousel {
        height: 350px;
    }
    
    .modal-content {
        width: 95%;
    }
    
    .interest-modal h3 {
        font-size: 22px;
        padding: 20px;
    }
    
    .interest-description p {
        font-size: 16px;
    }
    
    /* 確保手機版是 2x3 佈局 */
    .interest-card:nth-child(odd) {
        clear: left;
    }
}
```

### 6. 模態框淡入淡出動畫

實現模態框的平滑淡入淡出效果。

```css
/* interests.css */
/* 模態框 - 全屏式設計 */
.interest-modal {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.85); /* 更深的背景顏色 */
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
    opacity: 0;
    visibility: hidden;
    transition: opacity 0.3s ease, visibility 0.3s ease;
}

.interest-modal.show {
    opacity: 1;
    visibility: visible;
}

@keyframes modalFadeIn {
    from {
        opacity: 0;
        transform: translateY(50px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}
```

### 7. 懸停光暈效果

創建卡片懸停時的光暈效果，增強視覺吸引力。

```css
/* style.css */
.choose_list_item .hover-circle {
    position: absolute;
    width: 150px;
    height: 150px;
    background: radial-gradient(circle, rgba(74,144,226,0.2) 0%, rgba(74,144,226,0) 70%);
    border-radius: 50%;
    transform: translate(-50%, -50%);
    pointer-events: none;
    opacity: 0;
    transition: opacity 0.3s ease;
    z-index: 0;
}

/* interests.css */
/* 覆蓋層 */
.interest-overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.6);
    display: flex;
    justify-content: center;
    align-items: center;
    opacity: 0;
    transition: opacity 0.3s ease;
}

.interest-card:hover .interest-overlay {
    opacity: 1;
}

.view-details {
    padding: 12px 25px;
    transform: translateY(20px);
    transition: transform 0.3s ease;
    font-size: 18px;
    font-weight: 500;
}

.interest-card:hover .view-details {
    transform: translateY(0);
}
```

這些JavaScript和CSS效果共同為網站創造了豐富的互動體驗和視覺效果，使個人履歷網站更加生動和專業。
