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
