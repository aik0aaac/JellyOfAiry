/*--------------------------------
■用語説明
・energy：エネルギー
・heart：生命力

■数値単位について
10000=Aとし、A→B→...Z→ZA→...と続く

■簡易仕様説明
・main画面クリック：


--------------------------------*/

/*-----------------------------------------------*/
/* Localstrage準備 */
/*-----------------------------------------------*/

// localStorageが使用出来るかチェック
if (!window.localStorage) {
    swal({
        title: "お使いのブラウザはlocalstorageに対応しておりません。",
        text: "データの保持が出来ないため、このウインドウを閉じるとLvやエネルギー量、生命力量はリセットされます。",
        dangerMode: true
    });
}
// localStorageに値を保存
function setItem(key, val) {
    window.localStorage.setItem(key, val);
}

// localStorageから値を取得、NULLだったら初期値を入れる
function getItem(key, def) {
    if (window.localStorage.getItem(key) == null) {
        return def;
    } else {
        return parseInt(window.localStorage.getItem(key), 10);
    }
}

// localStorageに保存されている、あるkeyの値を削除する
function removeItem(key) {
    window.localStorage.removeItem(key);
}

// localStorageに保存されているすべての値を削除する
function localStorageClear() {
    window.localStorage.clear();
}

/* オートセーブに関する機構 */
var AUTO_SAVE = true;
$(function () {
    //    $('body').append('<div id="auto-save" class="select"><div class="center">1秒毎にオートセーブ有効</div></div>');
    var autoSave = autoSaveDo();

    function autoSaveDo() {
        setInterval(function () {
            console.log("---autoSave done")
            setItem("ALL_ENERGY", ALL_ENERGY);
            setItem("ALL_HEART", ALL_HEART);

            setItem("mily.energy", mily.energy);
            setItem("mily.heart", mily.heart);
            setItem("mily.eLevel", mily.eLevel);
            setItem("mily.hLevel", mily.hLevel);
            setItem("mily.needE", mily.needE);
            setItem("mily.needH", mily.needH);

            setItem("andon.energy", andon.energy);
            setItem("andon.heart", andon.heart);
            setItem("andon.eLevel", andon.eLevel);
            setItem("andon.hLevel", andon.hLevel);
            setItem("andon.needE", andon.needE);
            setItem("andon.needH", andon.needH);

            setItem("beni.energy", beni.energy);
            setItem("beni.heart", beni.heart);
            setItem("beni.eLevel", beni.eLevel);
            setItem("beni.hLevel", beni.hLevel);
            setItem("beni.needE", beni.needE);
            setItem("beni.needH", beni.needH);

            setItem("tako.energy", tako.energy);
            setItem("tako.heart", tako.heart);
            setItem("tako.eLevel", tako.eLevel);
            setItem("tako.hLevel", tako.hLevel);
            setItem("tako.needE", tako.needE);
            setItem("tako.needH", tako.needH);

            setItem("sakasa.energy", sakasa.energy);
            setItem("sakasa.heart", sakasa.heart);
            setItem("sakasa.eLevel", sakasa.eLevel);
            setItem("sakasa.hLevel", sakasa.hLevel);
            setItem("sakasa.needE", sakasa.needE);
            setItem("sakasa.needH", sakasa.needH);

            setItem("echizen.energy", echizen.energy);
            setItem("echizen.heart", echizen.heart);
            setItem("echizen.eLevel", echizen.eLevel);
            setItem("echizen.hLevel", echizen.hLevel);
            setItem("echizen.needE", echizen.needE);
            setItem("echizen.needH", echizen.needH);
        }, 1000);
    }
});


/*-----------------------------------------------*/
/* 本体 */
/*-----------------------------------------------*/
/* エネルギーか生命力かを区別するための変数 */
var ENERGY = 1;
var HEART = 2;

/* 全てのエネルギー、生命力量 */
var ALL_ENERGY = getItem("ALL_ENERGY", 0);
var ALL_HEART = getItem("ALL_HEART", 0);

/* エネルギー量or生命力量を適切な単位の値にして、String形で返す */
function allEHUnit(value) {
    //    var nowUnitNum = 0;
    //    var unitArray = [
    //        '', 'A', 'B', 'C', 'D', 'E',
    //        'F', 'G', 'H', 'I', 'J', 'K',
    //        'L', 'M', 'N', 'O', 'P', 'Q',
    //        'R', 'S', 'T', 'U', 'V', 'W',
    //        'X', 'Y', 'Z'
    //    ];
    //    var unit = '';
    //    while (1) {
    //        if ((value / 10000) > 0) { // 単位変換必要なら実行
    //            nowUnitNum++;
    //            value /= 10000;
    //        } else { // 単位変換不必要なら出力
    //            value = Math.round(value); // 値を成形
    //            var i = 0;
    //            while ((nowUnitNum / 27) > 0) {
    //                i++;
    //                console.log("unitNum is" + nowUnitNum)
    //                nowUnitNum /= 27;
    //                Math.round(nowUnitNum);
    //            }
    //            unit = unitArray[i] + unitArray[nowUnitNum];
    //            console.log("unit is" + unit)
    //            return '' + value + unit;
    //        }
    //    }
    return value;

}
/* クリックで生命力を増やす */
$('main').tap(function () {
    ALL_HEART++;
    $('#heart-display').html(allEHUnit(ALL_HEART));
    $('#heart').append('<p id="heart-increase-click">+1</p>');
    $('#Mily').animate({
        opacity: '0.5',
    }, 200);
    $('#Mily').animate({
        opacity: '1',
    }, 200);
    $('#heart-increase-click').animate({
        opacity: '0',
    }, 200);
    setTimeout(function () {
        $('#heart-increase-click').remove();
    }, 400);
});


/* タブ操作 */
$('#mily').click(function () {
    $("#milyDis").removeClass("hide");
    $("#mily").addClass("select");
    $("#milyDis").show();
    $("#friendDis").addClass("hide");
    $("#friend").removeClass("select");
});
$('#friend').click(function () {
    $("#milyDis").addClass("hide");
    $("#mily").removeClass("select");
    $("#friendDis").removeClass("hide");
    $("#friend").addClass("select");
    $("#friendDis").show();
});

/* --------------------------------
    内部データ
--------------------------------*/

/* 生き物たちの基本構造体
    energy: 初期生成エネルギー量
    heart: 初期生成生命力量
    eDefault: 生成エネルギー量
    hDefault: 生成生命力量
    bias: 倍率
    needEDefault: エネルギー量のレベルを上げるのに必要生命力のデフォルト値
    needHDefault: 生命力量のレベルを上げるのに必要エネルギー量のデフォルト値
*/

function Creatures(e, ed, h, hd, b, n, ne, nh, el, hl) {
    this.energy = e;
    this.eDefault = ed;
    this.heart = h;
    this.hDefault = hd;
    this.bias = b;

    this.needEDefault = n;
    this.needE = ne;
    this.needHDefault = n;
    this.needH = nh;

    this.eLevel = el;
    this.hLevel = hl;
}

/* 各生き物たちの名前ハッシュ */
var CreaturesName = {
    mily: 'Mily',
    andon: 'Andon',
    beni: 'Beni',
    tako: 'Tako',
    sakasa: 'Sakasa',
    echizen: 'Echizen'
};

// 各生き物のデータ定義
var mily = new Creatures(
    getItem("mily.energy", 0),
    50000,
    getItem("mily.heart", 0),
    10, 1, 10,
    getItem("mily.needE", 10),
    getItem("mily.needH", 10),
    getItem("mily.eLevel", 1),
    getItem("mily.hLevel", 1));
var andon = new Creatures(
    getItem("andon.energy", 0),
    20,
    getItem("andon.heart", 0),
    0, 1, 10,
    getItem("andon.needE", 10),
    getItem("andon.needH", 10),
    getItem("andon.eLevel", 1),
    getItem("andon.hLevel", 1));
var beni = new Creatures(
    getItem("beni.energy", 0),
    200,
    getItem("beni.heart", 0),
    0, 2, 50,
    getItem("beni.needE", 50),
    getItem("beni.needH", 50),
    getItem("beni.eLevel", 1),
    getItem("beni.hLevel", 1));
var tako = new Creatures(
    getItem("tako.energy", 0),
    2000,
    getItem("tako.heart", 0),
    0, 3, 100,
    getItem("tako.needE", 100),
    getItem("tako.needH", 100),
    getItem("tako.eLevel", 1),
    getItem("tako.hLevel", 1));
var sakasa = new Creatures(
    getItem("sakasa.energy", 0),
    20000,
    getItem("sakasa.heart", 0),
    0, 4, 500,
    getItem("sakasa.needE", 500),
    getItem("sakasa.needH", 500),
    getItem("sakasa.eLevel", 1),
    getItem("sakasa.hLevel", 1));
var echizen = new Creatures(
    getItem("echizen.energy", 0),
    200000,
    getItem("echizen.heart", 0),
    0, 5, 1000,
    getItem("echizen.needE", 1000),
    getItem("echizen.needH", 1000),
    getItem("echizen.eLevel", 1),
    getItem("echizen.hLevel", 1));

/* 生き物たちのデータ表示関数 -----------------------*/
/* 生き物たちのレベル表示 */
function levelDisplay(eh, who, whoName) {
    if (eh == ENERGY) {
        $('#' + whoName + '-e-lv').html('Lv.' + who.eLevel);
    } else if (eh == HEART) {
        $('#' + whoName + '-h-lv').html('Lv.' + who.hLevel);
    }
}

/* レベルボタン部分の表示 */
function levelUpDisplay(eh, who, whoName) {
    if (eh == ENERGY) {
        if (who == mily) {
            $('#' + whoName + '-levelup-incE').html('+' +
                (who.eDefault * ((who.eLevel + 1) * who.bias)) +
                'エネルギー/タップ');
        } else {
            $('#' + whoName + '-levelup-incE').html('+' +
                (who.eDefault * ((who.eLevel + 1) * who.bias)) +
                'エネルギー/秒');
        }
        $('#' + whoName + '-levelup-needH').html('' + who.needE + '生命力');
    } else if (eh == HEART) {
        $('#' + whoName + '-levelup-incH').html('+' +
            (who.hDefault * ((who.hLevel + 1) * who.bias)) +
            '生命力/秒');
        $('#' + whoName + '-levelup-needE').html('' + who.needH + 'エネルギー');
    }
}

/* 現在生成しているエネルギー量を表示 */
function nowAmountDisplay(eh, who, whoName) {
    if (eh == ENERGY) {
        if (who == mily) {
            $('#' + whoName + '-nowE').html('現在: ' + who.energy + 'エネルギー/タップ');
        } else {
            $('#' + whoName + '-nowE').html('現在: ' + who.energy + 'エネルギー/秒');

        }
    } else if (eh == HEART) {
        $('#' + whoName + '-nowH').html('現在: ' + who.heart + '生命力/秒');
    }
}

function creatureDisplay(eh, who, whoName) {
    levelDisplay(eh, who, whoName);
    levelUpDisplay(eh, who, whoName);
    nowAmountDisplay(eh, who, whoName);

}

/* 各生き物達のデータ操作関数 ----------------*/

/* 生き物たちのレベルアップ用関数
   この際に増加energy、heart量も計算
    eh: エネルギー量(1)と生命力(2)どっちのLvUPか
    who: どの生き物か
    amount: 何レベル上がるか
*/

function levelUp(eh, who, whoName, amount) {
    if (eh == ENERGY) {
        $('#' + whoName + '-e-levelup').tap(function () {
            if (ALL_HEART < who.needE) {
                swal({
                    title: "生命力が足りません！",
                    text: "あと" + (who.needE - ALL_HEART) + "生命力を貯めましょう！",
                });
                return;
            }
            ALL_HEART -= who.needE;
            who.needE *= who.eLevel;
            who.eLevel += amount;
            who.energy += who.eDefault * (who.eLevel * who.bias);
            creatureDisplay(ENERGY, who, whoName);
        });
    } else if (eh == HEART) {
        $('#' + whoName + '-h-levelup').tap(function () {
            if (ALL_ENERGY < who.needH) {
                swal({
                    title: "エネルギーが足りません！",
                    text: "あと" + (who.needH - ALL_ENERGY) + "エネルギーを貯めましょう！",
                });
                return;
            }
            ALL_ENERGY -= who.needH;
            who.needH *= who.hLevel;
            who.hLevel += amount;
            who.heart += who.hDefault * (who.hLevel * who.bias);
            creatureDisplay(HEART, who, whoName);
        });
    }
}

/* 仲間たちによるエネルギー増加関数 */
function increaseAll() {
    var allEnergyInc =
        andon.energy +
        beni.energy +
        tako.energy +
        sakasa.energy +
        echizen.energy;
    var allHeartInc = mily.heart;
    console.log("allEnergyInc is " + allEnergyInc);
    console.log("heart inc is " + mily.heart);
    console.log("allHeartInc is " + allHeartInc);
    ALL_ENERGY += allEnergyInc;
    ALL_HEART += allHeartInc;
    $('#energy-increase').html('+' + allEnergyInc);
    $('#energy-display').html(allEHUnit(ALL_ENERGY));
    $('#heart-increase').html('+' + allHeartInc);
    $('#heart-display').html(allEHUnit(ALL_HEART));
    console.log("ALL ENERGY is " + allEHUnit(ALL_ENERGY));
    console.log("ALL HEART is " + allEHUnit(ALL_HEART));
}

// 全てのデータを初期化する関数
function dataAllClear() {
    ALL_ENERGY = 0;
    ALL_HEART = 0;

    mily.energy = 0;
    mily.heart = 0;
    mily.eLevel = 1;
    mily.hLevel = 1;
    mily.needE = 10;
    mily.needH = 10;

    andon.energy = 0;
    andon.heart = 0;
    andon.eLevel = 1;
    andon.hLevel = 1;
    andon.needE = 10;
    andon.needH = 10;

    beni.energy = 0;
    beni.heart = 0;
    beni.eLevel = 1;
    beni.hLevel = 1;
    beni.needE = 50;
    beni.needH = 50;

    tako.energy = 0;
    tako.heart = 0;
    tako.eLevel = 1;
    tako.hLevel = 1;
    tako.needE = 100;
    tako.needH = 100;

    sakasa.energy = 0;
    sakasa.heart = 0;
    sakasa.eLevel = 1;
    sakasa.hLevel = 1;
    sakasa.needE = 500;
    sakasa.needH = 500;

    echizen.energy = 0;
    echizen.heart = 0;
    echizen.eLevel = 1;
    echizen.hLevel = 1;
    echizen.needE = 1000;
    echizen.needH = 1000;
}

/* 実際に実行 ------------------------*/
$(function () {
    // 各生き物のデータ表示
    creatureDisplay(ENERGY, mily, CreaturesName.mily);
    creatureDisplay(HEART, mily, CreaturesName.mily);
    creatureDisplay(ENERGY, andon, CreaturesName.andon);
    creatureDisplay(ENERGY, beni, CreaturesName.beni);
    creatureDisplay(ENERGY, tako, CreaturesName.tako);
    creatureDisplay(ENERGY, sakasa, CreaturesName.sakasa);
    creatureDisplay(ENERGY, echizen, CreaturesName.echizen);

    levelUp(ENERGY, mily, CreaturesName.mily, 1);
    levelUp(HEART, mily, CreaturesName.mily, 1);
    levelUp(ENERGY, andon, CreaturesName.andon, 1);
    levelUp(ENERGY, beni, CreaturesName.beni, 1);
    levelUp(ENERGY, tako, CreaturesName.tako, 1);
    levelUp(ENERGY, sakasa, CreaturesName.sakasa, 1);
    levelUp(ENERGY, echizen, CreaturesName.echizen, 1);

    setInterval(function () {
        increaseAll();
    }, 1000);


});

// 設定画面-データの消去
function settingRemove() {
    console.log("settingRemove-----------------")
    swal({
        title: "全データの消去をします。",
        text: "この動作は取り消せません。それでもよろしいですか?",
        icon: "warning",
        buttons: true,
        dangerMode: true,
        closeMordal: false
    }).then((willDelete) => {
        if (willDelete) {
            localStorageClear();
            dataAllClear();
            swal("消去完了です!", "", "success");
        } else {
            return false;
        }
    });
}
/**
 *  ユーザーのデバイスを返す
 *  @return     スマホ(sp)、タブレット(tab)、その他(other)
 */
function getDevice() {
    var ua = navigator.userAgent;
    if (ua.indexOf('iPhone') > 0 || ua.indexOf('iPod') > 0 || ua.indexOf('Android') > 0 && ua.indexOf('Mobile') > 0) {
        return 'sp';
    } else if (ua.indexOf('iPad') > 0 || ua.indexOf('Android') > 0) {
        return 'tab';
    } else {
        return 'other';
    }
}

/**
 * モーダルウィンドウ表示関数
 * @param val 表示したいモーダルウィンドウのコンテンツのID/Class(文字列で)
 */
var CURRENT_SCROLL_Y;

function displayMordalWindow(val) {
    CURRENT_SCROLL_Y = $(window).scrollTop();
    $("body").css({
        "position": "fixed",
        "top": (-1 * CURRENT_SCROLL_Y)
    });
    $(val).css({
        "display": "block"
    });
    //キーボード操作などにより、オーバーレイが多重起動するのを防止する
    $(this).blur(); //ボタンからフォーカスを外す
    if ($("#mordal-overlay")[0]) return false; //新しくモーダルウィンドウを起動しない
    //オーバーレイ用のHTMLコードを、[body]内の最後に生成する
    $("body").append('<div id="mordal-overlay" onclick="mordalWindow_close(\'' + val + '\')"></div>');
    //[$mordal-overlay]をフェードインさせる
    $("#mordal-overlay").fadeIn("slow");
    $(val).fadeIn("slow");
    // センタリングをする
    var jud = getDevice();
    console.log(jud);
    if (jud == 'sp') {
        // スマホだったら、ウインドウを少し高めに設定
        $(val).css({
            "top": 10 + "%",
        });
        var pxleft = (($(window).width() - $(val).outerWidth(true)) / 2);
        $(val).css({
            "left": pxleft + "px",
        });
    } else {
        // その他だったら、ウインドウを中央に設定
        // ※真ん中配置：(ウィンドウの幅∨高さ - コンテンツの幅∨高さ) /2
        var pxtop = (($(window).height() - $(val).outerHeight(true)) / 4);
        $(val).css({
            "top": pxtop + "px",
        });
        var pxleft = (($(window).width() - $(val).outerWidth(true)) / 2);
        $(val).css({
            "left": pxleft + "px",
        });
    }

}

/**
 * モーダルウィンドウを閉じる関数
 * @param val 表示したいモーダルウィンドウのコンテンツのID/Class(文字列で)
 */
function mordalWindow_close(val) {
    $(val).fadeOut("slow");
    $("#mordal-overlay").fadeOut("slow");
    $("#mordal-overlay").unbind() // unbind()…対象の要素にそれまで設定されていたイベントをクリアする
    $("#mordal-overlay").remove(); //フェードアウト後、[#mordal-overlay]をHTML(DOM)上から削除
    $("body").attr({
        style: ''
    });
    $("html,body").prop({
        scrollTop: CURRENT_SCROLL_Y
    });
}

// 進化遷移、設定画面の処理
$(function () {
    $('#setting').click(function () {
        displayMordalWindow('#mordal-setting');
    });
});
