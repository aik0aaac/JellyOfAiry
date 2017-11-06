/* 参考サイト：http://takustaqu.hatenablog.com/entry/2014/03/07/021445 */

(function ($) {
    $.fn.tap = function (callback) {

        return this.each(function () {
            $(this).on('touchstart touchmove touchend click', function (event) {

                //タッチ開始の場合、要素のdata-isTouchフラグをtrueに       
                if ('touchstart' == event.type) {
                    $(this).data('isTouch', true);
                };

                //touchmoveを拾った場合、要素のdata-isTouchフラグをfalseに
                if ('touchmove' == event.type) {
                    $(this).data('isTouch', false);
                };

                //isTouchフラグがあった場合、callbackを呼ぶ。
                if ($(this).data('isTouch')) {

                    //preventDefaultでclickの発生を抑止
                    event.preventDefault();

                    // フラグをfalseに
                    $(this).data('isTouch', false);

                    return callback.call(this)

                };

                if ('click' == event.type) {
                    //clickの場合は普通にそのまま返す。
                    return callback.call(this)
                };

            })
        });
    };

})(jQuery);
