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
        dangerMode: true,
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
function clear() {
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
            setItem("mily.eLevel", mily.eLevel);
            setItem("mily.hLevel", mily.hLevel);
            setItem("andon.eLevel", andon.eLevel);
            setItem("andon.hLevel", andon.hLevel);
            setItem("beni.eLevel", beni.eLevel);
            setItem("beni.hLevel", beni.hLevel);
            setItem("tako.eLevel", tako.eLevel);
            setItem("tako.hLevel", tako.hLevel);
            setItem("sakasa.eLevel", sakasa.eLevel);
            setItem("sakasa.hLevel", sakasa.hLevel);
            setItem("echizen.eLevel", echizen.eLevel);
            setItem("echizen.hLevel", echizen.hLevel);
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

console.log("debug" + 100 / 1000);
/* クリックで生命力を増やす */
$('main').tap(function () {
    ALL_HEART++;
    console.log(ALL_HEART);
    $('#heart-display').html(allEHUnit(ALL_HEART));
    $('#heart').append('<p id="heart-increase-click">+1</p>');
    $('#Mily-tap').animate({
        opacity: '0.5',
    }, 200);
    $('#Mily-tap').animate({
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
function Creatures(ed, hd, b, n, el, hl) {
    this.energy = 0;
    this.eDefault = ed;
    this.heart = 0;
    this.hDefault = hd;
    this.bias = b;

    this.needEDefault = n;
    this.needE = n;
    this.needHDefault = n;
    this.needH = n;

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
var mily = new Creatures(50000, 10, 1, 10,
    getItem("mily.eLevel", 1),
    getItem("mily.hLevel", 1));
var andon = new Creatures(20, 0, 1, 10,
    getItem("andon.eLevel", 1),
    getItem("andon.hLevel", 1));
var beni = new Creatures(200, 0, 2, 50,
    getItem("beni.eLevel", 1),
    getItem("beni.hLevel", 1));
var tako = new Creatures(2000, 0, 3, 100,
    getItem("tako.eLevel", 1),
    getItem("tako.hLevel", 1));
var sakasa = new Creatures(20000, 0, 4, 500,
    getItem("sakasa.eLevel", 1),
    getItem("sakasa.hLevel", 1));
var echizen = new Creatures(200000, 0, 5, 1000,
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
        $('#' + whoName + '-e-levelup').click(function () {
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
        $('#' + whoName + '-h-levelup').click(function () {
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
