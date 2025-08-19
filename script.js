// アンケート回答を保存する配列
let answers = [];

// 画面遷移関数
function showScreen(screenId) {
    // 全ての画面を非表示
    const screens = document.querySelectorAll('.screen');
    screens.forEach(screen => {
        screen.classList.add('hidden');
    });
    
    // 指定された画面を表示
    const targetScreen = document.getElementById(screenId);
    if (targetScreen) {
        targetScreen.classList.remove('hidden');
    }
}

// 選択肢ボタンのイベントリスナーを設定
function setupChoiceButtons() {
    const choiceButtons = document.querySelectorAll('.choice-btn');
    
    choiceButtons.forEach(button => {
        button.addEventListener('click', function() {
            // 回答を保存
            const answer = this.getAttribute('data-value');
            answers.push(answer);
            
            // 次の画面ID を取得
            const nextScreen = this.getAttribute('data-next');
            
            // ローディング画面の場合は特別な処理
            if (nextScreen === 'loading') {
                showLoadingAndRedirect();
            } else {
                // 通常の画面遷移
                showScreen(nextScreen);
            }
        });
    });
}

// ローディング画面表示と自動リダイレクト
function showLoadingAndRedirect() {
    // ローディング画面を表示
    showScreen('loading');
    
    // 2秒後に外部サイトへリダイレクト
    setTimeout(() => {
        // 最終遷移先URL
        const redirectUrl = 'https://www.nalpharma.net/lp?u=touto_test';
        
        // ページを遷移
        window.location.href = redirectUrl;
    }, 2000);
}

// ページ読み込み完了時の初期化
document.addEventListener('DOMContentLoaded', function() {
    // 最初の画面（screen1）を表示
    showScreen('screen1');
    
    // 選択肢ボタンにイベントリスナーを設定
    setupChoiceButtons();
});

// デバッグ用：回答内容をコンソールに出力
function logAnswers() {
    console.log('ユーザーの回答:', answers);
}