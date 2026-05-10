const container = document.getElementById('letter-container');
const startBtn = document.getElementById('start-btn');
// 【加上这一行】让 JS 认识封面盒子
const coverSection = document.getElementById('cover-section');
// 信件内容配置（数组按顺序执行）
const letterContent = [
    { type: 'text', content: "亲爱的赵彩霞女士：\n" },
    { type: 'text', content: "    你好，转眼又是一年母亲节。恭喜你已经度过了18年母亲节了！\n" },
    {type:'fireworks'},
    {type: 'text', content: "戳戳我的脸👇\n" },   
    {
        type:'toggle-photo',
        url1:'baby.jpg',
        desc1:"刚开始我们还不熟，但一直感觉到一个很温暖的怀抱。戳戳我的脸吧",
        url2:'18.jpg',
        desc2:"结果我转眼就成为一个不算成熟的大人了"
    },
    {type: 'text', content: "如果18这个节点是小孩长大成人的时刻，那也同样是母亲“短暂”毕业的时刻✨\n" },
    {type: 'text', content: "承认吧妈妈，其实你也很为我和妹妹骄傲吧！长成了三观正五官也正的人🥳\n" },
    // 这里的 src 后续替换成你本地的 ./assets/图片名.jpg
    // 这里的 src 后续替换成你本地的 ./assets/图片名.jpg
    { type: 'image', src: "1.jpg", alt: "老照片" },
    { type: 'text', content: "还记得小时候我和妹妹总是要吵架打架，每次都要喊你过来拉架，但没过一会我们两自己又和好了，现在想想真觉得这两小孩挺烦的\n" },
    { type:'text',content:"现在社会上掀起一场厌小孩风波，都觉得小孩很烦，很吵，好像小孩周边的空气都有毒。"},
    { type: 'text',content:"可是大家都在批判，却忽略了背后每一位的母亲的伟大，就像我有时候爱哭爱生闷气，陈语菲又霸道听不进去别人建议，把我们两放网上绝对又要引起网友的骂声，但你作为一个时时刻刻都陪伴在我们旁边，看着我们做一些成年人理解不了的幼稚行为，却没有弃养我们嘿嘿，而是把我们带大到现在，成为两个正常的人，甚至是有点优秀的人"},
    { type: 'text',content:"世界上所有的妈妈都很伟大！但因为你是我们的母亲，所以你最伟大！\n"},
    { type: 'heart-burst' },
    { type: 'text',content:"虽然有时候我会说气话，说你们把妹妹宠坏了，但是从来没和你说过我的真心话："},
    { type: 'tear-paper', tip: '撕开' },
    
    // 👇 因为有上面那行卡着，这行字必须等撕完才会开始打出来！
    { type: 'highlight-text', content: "妈妈，你真的特别厉害！既要工作，又要忙家里的事，还都做得非常好！简直是史无前例，后无来者" },
    { type: 'image',src:"3.jpg", alt:"老照片" },
    { type: 'text',content:"现在我和陈语菲都要长大了，你也可以不用那么操心我们两了，可以去找找自己喜欢的东西呀，实话说，听到你和爸爸之前打🎾我还挺震惊的，因为再没看到你们打过了，现在是时候活成18岁了！你想做什么我都支持，就是最好别去玩高危项目（最近太危险了）\n最后的最后，送你个礼物🎁吧，虽然实体的还买不了，但电子的总可以吧"},
    { type: 'gift-box', tip: '打开' },
    { type: 'text', content: " \n" },
    { type: 'center-text', content: "妈妈，母亲节快乐🎉，我爱你❤️" },
    { type: 'hug' },

// 6. 核心控制器：点击按钮后执行的流程
async function startLetter() {
    // 隐藏整个封面区域，显示信纸容器
    coverSection.style.display = 'none'; 
    container.style.display = 'block';

    // 【终极必杀技】直接用 JS 强行把背景改成粉黄渐变！并且固定住不随页面滚动！
    document.body.style.background = 'linear-gradient(135deg, #FFF0A5 0%, #FFB6C1 100%)';
    document.body.style.backgroundAttachment = 'fixed';

    for (const item of letterContent) {
        if (item.type === 'text') {
            await typeWriter(item.content);
        } else if (item.type === 'image') {
            await showImage(item.src, item.alt);
        }
    }
}
]

startBtn.addEventListener('click', startLetter);
// 辅助函数：控制节奏的延迟器
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// 处理打字机效果
async function typeWriter(text) {
    const p = document.createElement('div');
    p.className = 'text-paragraph';
    container.appendChild(p);

    for (let i = 0; i < text.length; i++) {
        if (text[i] === '\n') {
            p.appendChild(document.createElement('br'));
        } else {
            p.innerHTML += text[i];
        }
        await delay(120); // 这里的 120 决定了打字速度（毫秒），你可以自由调整
    }
    await delay(600); // 段落写完后稍微停顿一下
}
// 🌟 专门用来打“居中段落”的打字机
async function typeWriterCenter(text) {
    const p = document.createElement('p');
    p.className = 'center-text'; // 穿上居中外衣
    container.appendChild(p);

    for (let i = 0; i < text.length; i++) {
        p.innerHTML += text.charAt(i);
        window.scrollTo({
            top: document.body.scrollHeight,
            behavior: 'smooth'
        });
        await delay(150); // 结尾的话，打得慢一点、庄重一点
    }
    await delay(1000); 
}
// 🌟 处理“双向奔赴拥抱”动画的函数
function showHugAnimation() {
    return new Promise((resolve) => {
        const wrapper = document.createElement('div');
        wrapper.className = 'hug-wrapper';
        
        // 放入女儿、妈妈和爱心的 Emoji
        wrapper.innerHTML = `
            <div class="hug-emoji hug-left">👧</div>
            <div class="hug-emoji hug-right">👩</div>
            <div class="hug-heart">💖</div>
        `;
        
        container.appendChild(wrapper);
        
        // 自动往下滚一点，让居中的字和动画都能看清
        window.scrollTo({
            top: document.body.scrollHeight,
            behavior: 'smooth'
        });
        
        // 动画大概需要 4.5 秒（2秒跑动 + 2.5秒爱心），等播完再往下执行
        setTimeout(() => {
            resolve();
        }, 4500);
    });
}
// 🌟 专门用来打“强调句”的打字机
async function typeWriterHighlight(text) {
    const p = document.createElement('p');
    p.className = 'highlight-text'; // 穿上我们在 CSS 里写的强调外衣
    container.appendChild(p);

    // 一字一字打出来的逻辑
    for (let i = 0; i < text.length; i++) {
        p.innerHTML += text.charAt(i);
        
        // 自动向下滚动，保证妈妈能看到最新的字
        window.scrollTo({
            top: document.body.scrollHeight,
            behavior: 'smooth'
        });
        
        // 强调的话，可以打得稍微慢一点点，显得更郑重（这里设了 150 毫秒）
        await delay(150); 
    }
    
    // 这句话打完后，多停顿一会儿，给妈妈时间感动
    await delay(1000); 
}
// 处理图片淡入效果
async function showImage(src, alt) {
    const img = document.createElement('img');
    img.src = src;
    img.alt = alt;
    img.className = 'photo';
    container.appendChild(img);

    // 等待极短时间确保 DOM 渲染，再添加淡入 class
    await delay(50);
    img.classList.add('visible');
    
    // 等待 CSS 动画执行完毕 (2秒) 再进入下一个环节
    await delay(2000); 
}
// main.js
// ... 原本的 showImage 函数 ...

// 🌟 新增：处理可切换老照片效果
// 🌟 处理可切换老照片效果（纯净无字版）
async function showTogglingPhoto(item) {
    // 1. 创建图片容器 div
    const wrapper = document.createElement('div');
    wrapper.className = 'photo-wrapper';
    container.appendChild(wrapper);

    // 2. 创建图片本尊
    const img = document.createElement('img');
    img.src = item.url1; // 初始路径
    img.alt = item.desc1;
    img.className = 'photo clickable-photo'; 
    wrapper.appendChild(img);

    // 3. 等待 50 毫秒后执行淡入
    await delay(50);
    img.classList.add('visible');

    // 4. 给图片绑定点击事件（只管换图，没有文字提示了）
    img.addEventListener('click', () => {
        if (img.src.includes(item.url1)) {
            img.src = item.url2;
            img.alt = item.desc2;
        } else {
            img.src = item.url1;
            img.alt = item.desc1;
        }
        
        // 快速淡出淡入效果，增强互动感
        img.classList.remove('visible');
        setTimeout(() => img.classList.add('visible'), 300);
    });

    // 5. 给妈妈留足看照片的时间
    await delay(3000); 
}
// 🌟 处理“爱心喷薄而出”的喷泉效果
async function showHeartBurst() {
    console.log('🚀 喷泉函数被成功触发！');
    const count = 100; // 一次喷出 50 颗！你可以改得更大，比如 100
    
    for (let i = 0; i < count; i++) {
        // 使用 setTimeout 制造连续发射的“喷薄”感，而不是一坨直接砸出来
        setTimeout(() => {
            const heart = document.createElement('div');
            heart.className = 'heart-fountain';
            
            // 夹杂一点闪光和其他颜色的心，显得更丰富
            const emojis = ['❤️', '💖', '💗', '💓', '✨','❤️‍🔥'];
            heart.innerHTML = emojis[Math.floor(Math.random() * emojis.length)];
            
            // 魔法：计算它往左还是往右飘 (-40vw 到 40vw 之间)
            const tx = (Math.random() - 0.5) * 80 + 'vw';
            // 随机旋转角度
            const rot = (Math.random() - 0.5) * 360 + 'deg';
            
            // 把随机值塞给 CSS
            heart.style.setProperty('--tx', tx);
            heart.style.setProperty('--rot', rot);
            
            // 随机大小和飞行速度
            heart.style.fontSize = (Math.random() * 20 + 20) + 'px';
            heart.style.animationDuration = (Math.random() * 1.5 + 2) + 's'; 
            
            document.body.appendChild(heart);
            
            // 飞出屏幕后自动清理掉，保持电脑不卡
            setTimeout(() => heart.remove(), 4000);
        }, i * 40); // 每隔 40 毫秒发射一颗
    }
    
    // 给喷泉表演留出 2 秒的时间，再继续后面的信件
    await delay(2000); 
}
// 🌟 处理撕纸条特效的函数（使用 Promise 让代码在此处暂停）
function showTearPaper(item) {
    // 返回一个 Promise，只有调用 resolve() 时，信件才会继续往下走
    return new Promise((resolve) => {
        // 1. 创建纸条的各个部件
        const wrapper = document.createElement('div');
        wrapper.className = 'tear-paper-wrapper';
        
        const leftPaper = document.createElement('div');
        leftPaper.className = 'paper-half paper-left';
        
        const rightPaper = document.createElement('div');
        rightPaper.className = 'paper-half paper-right';
        
        const tip = document.createElement('div');
        tip.className = 'tear-tip';
        tip.innerHTML = item.tip || '✂️ 点击撕开纸条 ✂️';
        
        // 2. 组装并显示到页面上
        wrapper.appendChild(leftPaper);
        wrapper.appendChild(rightPaper);
        wrapper.appendChild(tip);
        container.appendChild(wrapper);
        
        // 自动滚动到纸条位置，确保妈妈能看到
        wrapper.scrollIntoView({ behavior: 'smooth', block: 'center' });
        
        // 3. 核心：绑定点击事件
        wrapper.addEventListener('click', () => {
            // 给左右两半加上撕开的 CSS 动画
            leftPaper.classList.add('torn');
            rightPaper.classList.add('torn');
            tip.style.opacity = '0'; // 隐藏提示字
            
            // 魔法在这里：等待 1 秒钟（让纸条飞完），再让后面的字显现出来！
            setTimeout(() => {
                wrapper.style.display = 'none'; // 把用完的纸条隐藏，腾出空间
                resolve(); // 🟢 告诉系统：撕纸完成，放行！开始打下一段字！
            }, 1000);
        }, { once: true }); // { once: true } 确保只能点一次，防止乱点报错
    });
}
// 🌟 处理打开礼物盲盒特效的函数
function showGiftBox(item) {
    return new Promise((resolve) => {
        const wrapper = document.createElement('div');
        wrapper.className = 'gift-wrapper';
        
        // 构建盒子的 HTML 结构
        // 注：如果你拍了真实项链的照片抠了图，可以把 ✨📿✨ 换成 <img src=".你的项链.png" style="width:60px;">
        wrapper.innerHTML = `
            <div class="gift-box">
                <div class="necklace-reveal"><img src="./项链.png" style="width:60px;"></div>
                <div class="box-body"></div>
                <div class="box-lid"></div>
            </div>
            <div class="gift-tip">${item.tip || '🎁 点击打开礼物 🎁'}</div>
        `;
        
        container.appendChild(wrapper);
        wrapper.scrollIntoView({ behavior: 'smooth', block: 'center' });
        
        // 绑定点击事件：只能点一次
        wrapper.addEventListener('click', () => {
            wrapper.classList.add('opened'); // 加上 opened 类，触发 CSS 动画
            wrapper.querySelector('.gift-tip').style.opacity = '0'; // 隐藏提示字
            
            // 魔法：留出 3 秒钟时间！
            // 让开盒动画播完 + 让妈妈惊喜地欣赏一会项链，然后再继续往下读信
            setTimeout(() => {
                resolve(); // 🟢 告诉系统：惊喜展示完毕，放行！
            }, 3000);
        }, { once: true });
    });
}
// 🌟 新增：处理放烟花的函数
async function triggerFireworks() {
    // 设定烟花的颜色，配合你的粉黄主题
    const colors = ['#FFD1DC', '#FFF0A5', '#FF69B4', '#FFD700'];
    
    // 连续放几次烟花
    const duration = 2500; // 持续 2.5 秒
    const end = Date.now() + duration;

    (function frame() {
        confetti({
            particleCount: 5,
            angle: 60,
            spread: 55,
            origin: { x: 0 },
            colors: colors
        });
        confetti({
            particleCount: 5,
            angle: 120,
            spread: 55,
            origin: { x: 1 },
            colors: colors
        });

        if (Date.now() < end) {
            requestAnimationFrame(frame);
        }
    }());

    // 等待 2.5 秒，让烟花放完，再继续打后面的字
    await delay(2500); 
}

// 6. 核心控制器：点击按钮后执行的流程
// main.js
// 6. 核心控制器：点击按钮后执行的流程
// 6. 核心控制器：点击按钮后执行的流程
// 6. 核心控制器：点击按钮后执行的流程
async function startLetter() {
    coverSection.style.display = 'none'; 
    container.style.display = 'block';

    document.body.classList.add('pink-theme');

    for (const item of letterContent) {
        if (item.type === 'text') {
            await typeWriter(item.content);
        } else if (item.type === 'image') {
            await showImage(item.src, item.alt);
        } else if (item.type === 'toggle-photo') {
            await showTogglingPhoto(item);
        } else if (item.type === 'fireworks') {
            await triggerFireworks();
        } else if (item.type === 'heart') {
            await showHeart();
        } else if (item.type === 'heart-burst') {
            await showHeartBurst();
        // ... 前面的代码 ...
        } else if (item.type === 'fireworks') {
            await triggerFireworks();
        } else if (item.type === 'heart-burst') {
            await showHeartBurst();
        } else if (item.type === 'tear-paper') {
            // 【新增这一行】遇到撕纸指令，就卡在这里等妈妈撕
            await showTearPaper(item);
        // ... 前面的各种 else if ...
        } else if (item.type === 'tear-paper') {
            await showTearPaper(item);
        } else if (item.type === 'gift-box') {
            // 【新增这一行】遇到礼物盒指令，卡在这里等妈妈开盒
            await showGiftBox(item);
        
        // ... 前面的 else if ...
        } else if (item.type === 'gift-box') {
            await showGiftBox(item);
        } else if (item.type === 'highlight-text') {
            // 【新增这一行】遇到强调指令，就用特殊的打字机打出来
            await typeWriterHighlight(item.content);
        
        // ... 前面的 else if ...
        } else if (item.type === 'highlight-text') {
            await typeWriterHighlight(item.content);
        } else if (item.type === 'center-text') {
            // 【新增这一行】遇到居中指令，用居中打字机
            await typeWriterCenter(item.content);
        
        // ... 前面的 else if ...
        } else if (item.type === 'center-text') {
            await typeWriterCenter(item.content);
        } else if (item.type === 'hug') {
            // 【新增这一行】遇到拥抱指令，就播放拥抱动画
            await showHugAnimation();
        }
    }
}
    
    
// 绑定点击事件
startBtn.addEventListener('click', startLetter);
