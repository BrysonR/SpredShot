"use strict";

$.fn.arc = function (options) {
    options = $.extend({}, {
        center: [0, 0],
        radius: 0,
        start: 0,
        end: 0,
        dir: 1,
        rotate: true
    }, options);

    while (options.start > options.end && options.dir > 0) {
        options.start -= 360;
    }

    while (options.start < options.end && options.dir < 0) {
        options.start += 360;
    }

    var css = {};
    return this.each(function () {
        var self = $(this),
            collection = $(".card-collection"),
            doc = $(document),
            win = $(window);

        collection.scroll(function () {
            var now = 1 - 1 * collection.scrollLeft() / (7000 - win.width()),
                a = (options.start * now + options.end * (1 - now)) * Math.PI / 180;

            css.left = Math.sin(a) * options.radius + options.center[0] + 0.5 | 0;
            css.top = Math.cos(a) * options.radius + options.center[1] + 0.5 | 0;

            if (options.rotate) {
                css.transform = "rotate(" + Math.atan2(options.center[1] - css.top, options.center[0] - css.left) + "rad)";
            }
            self.css(css);
        });
    });
};

$(function () {
    $(".card-collection").on("mousewheel", function (event, delta) {
        this.scrollLeft += event.originalEvent.deltaY * 1;
    });
});
//# sourceMappingURL=horizontalScrolling.js.map