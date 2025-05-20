// 興趣頁面 - Three.js 模型加載與旋轉效果
// 作者：陳衍碩


const modelPaths = {
    'invest': './assets/glb/bitcoin.glb',
    'coding': './assets/glb/macbook.glb',
    'gaming': './assets/glb/Xbox.glb',
    'music': './assets/glb/music.glb',
    'drama': './assets/glb/popcorn.glb',
    'basketball': './assets/glb/basketball.glb'
};

// 興趣卡片配置
const interestsConfig = [
    {
        id: 'invest',
        title: '投資',
        model: 'bitcoin.glb',
        images: [
            './assets/images/interests/invest/1.jpg',
            './assets/images/interests/invest/2.jpg',
            './assets/images/interests/invest/3.jpg',
            './assets/images/interests/invest/4.jpg',
            './assets/images/interests/invest/5.jpg'
        ],
        description: '平常有在關注股票和加密貨幣，主要以美股為主，喜歡研究各種產業走勢，也會觀察幣圈風向。雖然偶爾會被割，但學費繳過的都變經驗。'
    },
    {
        id: 'coding',
        title: '程式',
        model: 'macbook.glb',
        images: [
            './assets/images/interests/coding/1.gif',
            './assets/images/interests/coding/2.gif',
            './assets/images/interests/coding/3.jpg',
            './assets/images/interests/coding/4.jpg',
            './assets/images/interests/coding/5.jpg'
        ],
        description: '我常會寫一些沒什麼用但很好玩的小工具，像是自動化、聊天機器人或是奇怪的遊戲，重點是要有趣、有成就感。'
    },
    {
        id: 'gaming',
        title: '電玩',
        model: 'Xbox.glb',
        images: [
            './assets/images/interests/gaming/1.jpg',
            './assets/images/interests/gaming/2.jpg',
            './assets/images/interests/gaming/3.jpg',
            './assets/images/interests/gaming/4.jpg',
            './assets/images/interests/gaming/5.jpg'
        ],
        description: '2K是日常運動，日系 RPG 是我最愛買的最近大推《光與影：33號遠征隊》。也愛玩像《爐石》這種卡牌對戰遊戲，《潛水員戴夫》、《小丑牌》這種有創意的獨立遊戲。'
    },
    {
        id: 'music',
        title: '音樂',
        model: 'music.glb',
        images: [
            './assets/images/interests/music/1.jpg',
            './assets/images/interests/music/2.jpg',
            './assets/images/interests/music/3.jpg',
            './assets/images/interests/music/4.jpg',
            './assets/images/interests/music/5.jpg'
        ],
        description: '喜歡台灣的獨立音樂圈，落日飛車、怕胖團是常駐播放。也喜歡嘻哈像是 Kendrick Lamar 超頂、還有Post Malone 和Chris Brown那種氛圍系，也都愛聽。',
        youtubePlaylist: 'https://www.youtube.com/embed/videoseries?list=PL4fGSI1pDJn5kI81J1fYWK5eZRl1zJ5kM' // YouTube播放清單嵌入連結
    },
    {
        id: 'drama',
        title: '追劇',
        model: 'popcorn.glb',
        images: [
            './assets/images/interests/drama/1.jpg',
            './assets/images/interests/drama/2.jpg',
            './assets/images/interests/drama/3.jpg',
            './assets/images/interests/drama/4.jpg',
            './assets/images/interests/drama/5.jpg'
        ],
        description: '劇齡豐富，愛看那種劇情燒腦、角色立體的作品。像《絕命毒師》、《怪奇物語》、《紙房子》、《黑鏡》、《三體》這類的，都是我會一口氣追爆的類型。'
    },
    {
        id: 'basketball',
        title: '籃球',
        model: 'basketball.glb',
        images: [
            'assets/images/interests/basketball/1.JPG',
            './assets/images/interests/basketball/2.jpg',
            './assets/images/interests/basketball/3.jpg',
            './assets/images/interests/basketball/4.jpg',
            './assets/images/interests/basketball/5.mp4'
        ],
        description: '支持塞爾提克多年，看他們一路成長很有感情。雖然是綠血，但對 LeBron 的敬意還是有的，他的球風、生涯歷程真的沒話說，值得尊敬。'
    }
];

// 當文檔加載完成後執行
document.addEventListener('DOMContentLoaded', function() {
    // 初始化興趣區塊
    initInterestsSection();
});

// 初始化興趣區塊
function initInterestsSection() {
    const interestsContainer = document.getElementById('interests-container');
    if (!interestsContainer) return;

    // 清空容器
    interestsContainer.innerHTML = '';
    
    // 創建興趣卡片
    interestsConfig.forEach(interest => {
        const card = createInterestCard(interest);
        interestsContainer.appendChild(card);
    });

    // 初始化 Three.js 場景
    initThreeJsScenes();
}

// 創建單個興趣卡片
function createInterestCard(interest) {
    const card = document.createElement('div');
    card.className = 'interest-card';
    card.dataset.interest = interest.id;
    
    card.innerHTML = `
        <div class="interest-inner">
            <div class="model-container" id="model-${interest.id}"></div>
            <h4>${interest.title}</h4>
            <div class="interest-overlay">
                <span class="btn btn-primary view-details">查看詳情</span>
            </div>
        </div>
    `;
    
    // 添加點擊事件
    card.querySelector('.view-details').addEventListener('click', function(e) {
        e.preventDefault();
        openInterestModal(interest);
    });
    
    return card;
}

// Three.js 場景、相機和渲染器的集合
const threeInstances = {};

// 初始化所有 Three.js 場景
function initThreeJsScenes() {
    interestsConfig.forEach(interest => {
        initThreeJsScene(interest.id, modelPaths[interest.id]);
    });
}

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
    
    // 次方向光 - 填充陰影
    const fillLight = new THREE.DirectionalLight(0xffffff, 0.5);
    fillLight.position.set(-5, 0, -5);
    scene.add(fillLight);
    
    // 頂部半球光 - 增加真實感
    const hemiLight = new THREE.HemisphereLight(0xffffff, 0x444444, 0.5);
    hemiLight.position.set(0, 20, 0);
    scene.add(hemiLight);
    
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
        
        // 提升模型細節
        model.traverse(function(node) {
            if (node.isMesh) {
                node.castShadow = true;
                node.receiveShadow = true;
                
                // 提升材質質量
                if (node.material) {
                    node.material.envMapIntensity = 1.5;
                    node.material.needsUpdate = true;
                }
            }
        });
        
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
    
    // 處理窗口大小變化
    window.addEventListener('resize', function() {
        updateRenderer(interestId);
    });
}

// 更新渲染器大小
function updateRenderer(interestId) {
    const instance = threeInstances[interestId];
    if (!instance) return;
    
    const container = document.getElementById(`model-${interestId}`);
    if (!container) return;
    
    const width = container.clientWidth;
    const height = container.clientHeight;
    
    instance.camera.aspect = width / height;
    instance.camera.updateProjectionMatrix();
    instance.renderer.setSize(width, height);
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
    
    // 構建輪播項目 - 簡化版
    let carouselItems = '';
    
    // 第一組圖片
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
    
    // 第二組圖片 (無縫循環用)
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

    // YouTube播放器（僅音樂興趣）
    const youtubeEmbed = interest.id === 'music' ? 
        `<div class="youtube-player">
            <iframe width="100%" height="250" src="${interest.youtubePlaylist}" 
            title="YouTube playlist player" frameborder="0" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
            allowfullscreen></iframe>
         </div>` : '';

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
