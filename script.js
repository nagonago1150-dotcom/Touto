// アンケート回答を保存する配列
let answers = [];
let currentScreen = 'screen1';

// パーティクル背景を生成
function createParticles() {
    const particlesContainer = document.createElement('div');
    particlesContainer.className = 'particles-container';
    document.body.appendChild(particlesContainer);
    
    // 50個のパーティクルを生成
    for (let i = 0; i < 50; i++) {
        createParticle(particlesContainer);
    }
    
    // 定期的に新しいパーティクルを追加
    setInterval(() => {
        if (particlesContainer.children.length < 50) {
            createParticle(particlesContainer);
        }
    }, 300);
}

function createParticle(container) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    
    // ランダムな位置とサイズ
    particle.style.left = Math.random() * 100 + '%';
    particle.style.animationDelay = Math.random() * 15 + 's';
    particle.style.animationDuration = (Math.random() * 10 + 10) + 's';
    
    // ランダムなサイズ
    const size = Math.random() * 4 + 2;
    particle.style.width = size + 'px';
    particle.style.height = size + 'px';
    
    container.appendChild(particle);
    
    // アニメーション終了後に削除
    particle.addEventListener('animationend', () => {
        particle.remove();
    });
}

// 画面遷移関数（アニメーション付き）
function showScreen(screenId) {
    const currentScreenEl = document.getElementById(currentScreen);
    const targetScreen = document.getElementById(screenId);
    
    if (!targetScreen) return;
    
    // 現在の画面をフェードアウト
    if (currentScreenEl && !currentScreenEl.classList.contains('hidden')) {
        currentScreenEl.style.animation = 'slideOut 0.5s ease-in forwards';
        
        setTimeout(() => {
            currentScreenEl.classList.add('hidden');
            currentScreenEl.style.animation = '';
            
            // 新しい画面を表示
            targetScreen.classList.remove('hidden');
            targetScreen.style.animation = 'fadeInScale 0.8s ease-out forwards';
            
            currentScreen = screenId;
        }, 500);
    } else {
        // 最初の画面表示
        targetScreen.classList.remove('hidden');
        targetScreen.style.animation = 'fadeInScale 0.8s ease-out forwards';
        currentScreen = screenId;
    }
}

// 選択肢ボタンのイベントリスナーを設定
function setupChoiceButtons() {
    const choiceButtons = document.querySelectorAll('.choice-btn');
    
    choiceButtons.forEach(button => {
        // ホバー効果の強化
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
            createClickEffect(this, false);
        });
        
        button.addEventListener('mouseleave', function() {
            if (!this.classList.contains('selected')) {
                this.style.transform = '';
            }
        });
        
        button.addEventListener('click', function() {
            // 同じ画面内の他のボタンを無効化
            const currentButtons = this.parentElement.querySelectorAll('.choice-btn');
            currentButtons.forEach(btn => {
                btn.style.pointerEvents = 'none';
                btn.style.opacity = '0.7';
            });
            
            // クリックしたボタンを選択状態に
            this.classList.add('selected');
            this.style.pointerEvents = 'auto';
            this.style.opacity = '1';
            
            // クリック効果を生成
            createClickEffect(this, true);
            
            // 回答を保存
            const answer = this.getAttribute('data-value');
            answers.push(answer);
            
            // 次の画面ID を取得
            const nextScreen = this.getAttribute('data-next');
            
            // 少し遅延してから画面遷移
            setTimeout(() => {
                if (nextScreen === 'loading') {
                    showLoadingAndRedirect();
                } else {
                    showScreen(nextScreen);
                }
            }, 800);
        });
    });
}

// クリック効果を生成
function createClickEffect(element, isClick = false) {
    const rect = element.getBoundingClientRect();
    const effect = document.createElement('div');
    
    effect.style.position = 'fixed';
    effect.style.left = rect.left + rect.width / 2 + 'px';
    effect.style.top = rect.top + rect.height / 2 + 'px';
    effect.style.width = '0px';
    effect.style.height = '0px';
    effect.style.borderRadius = '50%';
    effect.style.pointerEvents = 'none';
    effect.style.zIndex = '1000';
    
    if (isClick) {
        effect.style.background = 'radial-gradient(circle, rgba(13, 110, 253, 0.3), rgba(25, 135, 84, 0.2), transparent)';
        effect.style.animation = 'clickRipple 0.8s ease-out forwards';
    } else {
        effect.style.background = 'radial-gradient(circle, rgba(108, 117, 125, 0.2), transparent)';
        effect.style.animation = 'hoverRipple 0.6s ease-out forwards';
    }
    
    document.body.appendChild(effect);
    
    effect.addEventListener('animationend', () => {
        effect.remove();
    });
}

// CSS アニメーションを動的に追加
function addDynamicStyles() {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes clickRipple {
            to {
                width: 300px;
                height: 300px;
                margin-left: -150px;
                margin-top: -150px;
                opacity: 0;
            }
        }
        
        @keyframes hoverRipple {
            to {
                width: 100px;
                height: 100px;
                margin-left: -50px;
                margin-top: -50px;
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
}

// パス別リダイレクトURL設定
function getRedirectUrl() {
    const path = window.location.pathname;

    // 各パスに対応する販売リンクの設定（確実におおもとのLPに到達）
    const redirectUrls = {
        '/1': 'https://www.nalpharma.net/lp?u=touto_kyoyu&sb_tracking=true&src=path1',
        '/2': 'https://www.nalpharma.net/lp?u=touto_kyoyu&sb_tracking=true&src=path2',
        '/3': 'https://www.nalpharma.net/lp?u=touto_kyoyu&sb_tracking=true&src=path3',
        '/4': 'https://www.nalpharma.net/lp?u=touto_kyoyu&sb_tracking=true&src=path4',
        '/5': 'https://www.nalpharma.net/lp?u=touto_kyoyu&sb_tracking=true&src=path5',
        '/6': 'https://www.nalpharma.net/lp?u=touto_kyoyu&sb_tracking=true&src=path6',
        '/7': 'https://www.nalpharma.net/lp?u=touto_kyoyu&sb_tracking=true&src=path7'
    };

    console.log('🔍 パス検出:', path);
    console.log('📋 利用可能なパス:', Object.keys(redirectUrls));

    // パスに対応するURLを取得（デフォルトは/1と同じURL）
    const selectedUrl = redirectUrls[path] || redirectUrls['/1'];
    console.log('✅ 選択されたURL:', selectedUrl);

    // URL検証
    if (selectedUrl && selectedUrl.startsWith('https://')) {
        console.log('✅ URL検証成功');
        return selectedUrl;
    } else {
        console.error('❌ URL検証失敗, デフォルトURL使用');
        return redirectUrls['/1'];
    }
}

// ローディング画面表示と自動リダイレクト
function showLoadingAndRedirect() {
    // ローディング画面を表示
    showScreen('loading');

    // ローディング中にさらなる視覚効果を追加
    const loadingContainer = document.querySelector('.loading-container');
    if (loadingContainer) {
        // キラキラ効果を追加
        for (let i = 0; i < 10; i++) {
            setTimeout(() => {
                createSparkle(loadingContainer);
            }, i * 200);
        }
    }

    // 2秒後に外部サイトへリダイレクト
    setTimeout(() => {
        // パスに応じた最終遷移先URLを取得
        const redirectUrl = getRedirectUrl();

        // リダイレクト情報をコンソールに出力（確認用）
        console.log('🔄🔄🔄 TOUTO リダイレクト開始 🔄🔄🔄');
        console.log('📍 現在のパス:', window.location.pathname);
        console.log('🎯 リダイレクト先URL:', redirectUrl);
        console.log('⏰ 3秒後にリダイレクトします...');
        console.log('🔄🔄🔄🔄🔄🔄🔄🔄🔄🔄🔄🔄🔄🔄🔄');

        // リダイレクト先確認
        console.log('🚀 リダイレクト実行直前...');
        console.log('🔗 完全URL:', redirectUrl);

        // より確実なリダイレクト方法を試行
        try {
            console.log('🎯 window.location.href でリダイレクト試行中...');
            window.location.href = redirectUrl;
        } catch (error) {
            console.error('❌ window.location.href でエラー:', error);
            console.log('🔄 window.open で代替試行中...');
            window.open(redirectUrl, '_self');
        }
    }, 2000);
}

// キラキラ効果を生成
function createSparkle(container) {
    const sparkle = document.createElement('div');
    sparkle.style.position = 'absolute';
    sparkle.style.width = '4px';
    sparkle.style.height = '4px';
    sparkle.style.background = 'radial-gradient(circle, rgba(255, 255, 255, 0.8), transparent)';
    sparkle.style.borderRadius = '50%';
    sparkle.style.left = Math.random() * 100 + '%';
    sparkle.style.top = Math.random() * 100 + '%';
    sparkle.style.animation = 'sparkle 1.5s ease-out forwards';
    sparkle.style.pointerEvents = 'none';
    
    container.appendChild(sparkle);
    
    sparkle.addEventListener('animationend', () => {
        sparkle.remove();
    });
}

// 追加のCSSアニメーションを挿入
function addSparkleAnimation() {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes sparkle {
            0% {
                opacity: 0;
                transform: scale(0) rotate(0deg);
            }
            50% {
                opacity: 1;
                transform: scale(1) rotate(180deg);
            }
            100% {
                opacity: 0;
                transform: scale(0) rotate(360deg);
            }
        }
    `;
    document.head.appendChild(style);
}

// カーソル効果
function createCursorEffect() {
    let cursor = document.createElement('div');
    cursor.style.position = 'fixed';
    cursor.style.width = '20px';
    cursor.style.height = '20px';
    cursor.style.borderRadius = '50%';
    cursor.style.background = 'radial-gradient(circle, rgba(108, 117, 125, 0.2), transparent)';
    cursor.style.pointerEvents = 'none';
    cursor.style.zIndex = '9999';
    cursor.style.transition = 'transform 0.1s ease';
    document.body.appendChild(cursor);
    
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX - 10 + 'px';
        cursor.style.top = e.clientY - 10 + 'px';
    });
    
    document.addEventListener('mousedown', () => {
        cursor.style.transform = 'scale(1.5)';
    });
    
    document.addEventListener('mouseup', () => {
        cursor.style.transform = 'scale(1)';
    });
}

// ページ読み込み完了時の初期化
document.addEventListener('DOMContentLoaded', function() {
    // 動的スタイルを追加
    addDynamicStyles();
    addSparkleAnimation();
    
    // パーティクル背景を生成
    createParticles();
    
    // カーソル効果を追加
    createCursorEffect();
    
    // 最初の画面（screen1）を表示
    showScreen('screen1');
    
    // 選択肢ボタンにイベントリスナーを設定
    setupChoiceButtons();
    
    // コンソールに開始メッセージ
    console.log('✨✨✨ 「とうと」アンケートLP が読み込まれました ✨✨✨');
    console.log('📍 現在のURL:', window.location.href);
    console.log('📍 現在のパス:', window.location.pathname);
    console.log('✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨');
});

// デバッグ用：回答内容をコンソールに出力
function logAnswers() {
    console.log('ユーザーの回答:', answers);
}

// ページの可視性が変わった時の処理
document.addEventListener('visibilitychange', function() {
    if (document.hidden) {
        console.log('ページが非表示になりました');
    } else {
        console.log('ページが表示されました');
    }
});