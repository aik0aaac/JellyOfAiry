/*--------------------------------
■用語説明
・energy：エネルギー
・heart：生命力

■数値単位について
10000=Aとし、A→B→...Z→ZA→...と続く

■簡易仕様説明
・main画面クリック：


--------------------------------*/

/* エネルギーか生命力かを区別するための変数 */
var ENERGY = 1;
var HEART = 2;

/* 全てのエネルギー、生命力量 */
var ALL_ENERGY = 0;
var ALL_HEART = 0;

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
$('main').click(function (e) {
    ALL_HEART++;
    console.log(ALL_HEART);
    $('#heart').append('<span id="heart-increase-click">+1</span>');
    $('#heart-display').html(allEHUnit(ALL_HEART));
    $('main').append('<p class="main-heart-des">+' + ALL_HEART + 'H</p>');
    var off = $('main').offset();
    off.top = ((e.pageY) - (off.top));
    off.left = ((e.pageX) - (off.left));
    console.log('top: ' + off.top);
    console.log('left: ' + off.left);
    $('.main-heart-des').css({
        top: (off.top),
        left: (off.left),
        opacity: '1'
    });
    $('#heart-increase-click').animate({
        opacity: '0',
    }, 200);
    $('.main-heart-des').animate({
        opacity: '0',
    }, 200);
    setTimeout(function () {
        $('#heart-increase-click').remove();
        $('.main-heart-des').remove();
    }, 400);
});


/* タブ操作 */
$('#mily').click(function () {
    console.log("mily clicked")
    $("#milyDis").removeClass("hide");
    $("#milyDis").show();
    $("#friendDis").addClass("hide");
});
$('#friend').click(function () {
    console.log("friend clicked")
    $("#milyDis").addClass("hide");
    $("#friendDis").removeClass("hide");
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
function Creatures(ed, hd, b, n) {
    this.energy = 0;
    this.eDefault = ed;
    this.heart = 0;
    this.hDefault = ed;
    this.bias = b;

    this.needEDefault = n;
    this.needE = n;
    this.needHDefault = n;
    this.needH = n;

    this.eLevel = 1;
    this.hLevel = 1;
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
var mily = new Creatures(0, 0, 1, 5);
var andon = new Creatures(20, 0, 1, 10);
var beni = new Creatures(200, 0, 2, 50);
var tako = new Creatures(2000, 0, 3, 100);
var sakasa = new Creatures(20000, 0, 4, 500);
var echizen = new Creatures(200000, 0, 5, 1000);

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
        $('#' + whoName + '-levelup-incE').html('+' +
            (who.eDefault * ((who.eLevel + 1) * who.bias)) +
            'エネルギー/秒');
        $('#' + whoName + '-levelup-needH').html('' + who.needE + '生命力');
    } else if (eh == HEART) {
        $('#' + whoName + '-levelup-incH').html('+' +
            (who.hDefault * ((who.hLevel + 1) * who.bias)) +
            '生命力/秒');
        $('#' + whoName + '-levelup-needH').html('' + who.needH + 'エネルギー');
    }
}

/* 現在生成しているエネルギー量を表示 */
function nowAmountDisplay(eh, who, whoName) {
    if (eh == ENERGY) {
        $('#' + whoName + '-nowE').html('現在: ' + who.energy + 'エネルギー/秒');
    } else if (eh == HEART) {
        $('#' + whoName + '-nowH').html('現在: ' + who.heart + '生命力/秒');
    }
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
                console.log("NOTIHING");
                return;
            }
            ALL_HEART -= who.needE;
            who.eLevel += amount;
            who.energy += who.eDefault * (who.eLevel * who.bias);
            levelDisplay(ENERGY, who, whoName);
            levelUpDisplay(ENERGY, who, whoName);
            nowAmountDisplay(ENERGY, who, whoName);
        });
    } else if (eh == HEART) {
        $('#' + whoName + '-h-levelup').click(function () {
            if (ALL_ENERGY < who.needH) {
                console.log("NOTIHING");
                return;
            }
            ALL_ENERGY -= who.needH;
            who.hLevel += amount;
            who.heart = who.hDefault * (who.hLevel * who.bias);
            levelDisplay(HEART, who, whoName);
            levelUpDisplay(HEART, who, whoName);
            nowAmountDisplay(HEART, who, whoName);

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
    levelDisplay(ENERGY, mily, CreaturesName.mily);
    levelDisplay(HEART, mily, CreaturesName.mily);
    levelDisplay(ENERGY, andon, CreaturesName.andon);
    levelDisplay(ENERGY, beni, CreaturesName.beni);
    levelDisplay(ENERGY, tako, CreaturesName.tako);
    levelDisplay(ENERGY, sakasa, CreaturesName.sakasa);
    levelDisplay(ENERGY, echizen, CreaturesName.echizen);

    levelUpDisplay(ENERGY, mily, CreaturesName.mily);
    levelUpDisplay(HEART, mily, CreaturesName.mily);
    levelUpDisplay(ENERGY, andon, CreaturesName.andon);
    levelUpDisplay(ENERGY, beni, CreaturesName.beni);
    levelUpDisplay(ENERGY, tako, CreaturesName.tako);
    levelUpDisplay(ENERGY, sakasa, CreaturesName.sakasa);
    levelUpDisplay(ENERGY, echizen, CreaturesName.echizen);

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
