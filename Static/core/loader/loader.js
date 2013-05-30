steal('can', 'jquery', 'steal/less','./loader.less', function (can, $) {

	    /**
	    * @class Core.Loader
	    */
	    /**
	    * A controller that shows spinning wheel while content is loaded.
	    * 
	    */
	    can.Control("Core.Loader",
{
    defaultDelay: 500,
    /* @static */
    defaults: {
        delay: 500,
        callback: null,
        loadingInfo: $('#hidLoadingLabel').val(),
        top: null,
        listenToTrigger: null,
        desiredPositionType: 'relative',
        className:''
    }
},
	    /* @prototype */
{
init: function(element, options) {
    this.element.append('<div class="spinningWheel"><div class="spinningContainer '+this.options.className+'"><span class="loadingInfo">' + this.options.loadingInfo + '</span></div></div>');
    this.spinningContainer = this.element.find('.spinningContainer');
    this.spinningWheel = this.element.find('.spinningWheel');
    if (this.element.attr('id') == "body") {
        this.spinningWheel.css('height', $(window).height());
    }
    this.spinningWheel.addClass('scroll' + $(element).attr('id'));
    if (this.options.top != null) {
        this.spinningContainer.css({ top: this.options.top });
    }

    this.loadingInfoContainer = this.element.find('.loadingInfo');
    this.setBindings();
    this.handleCallback();
    this.storedPosition = this.element.css('position');
    if (this.element.css('position')!='absolute') {
        this.element.css('position', this.options.desiredPositionType);
    }

    TweenLite.fromTo(this.spinningContainer, 1, {
        css: { autoAlpha: 1, scale: "0.7" },
        overwrite: "auto"
        }, 
        {css: { scale: "1.0" },
        ease: Back.easeOut,
            overwrite: "auto"
        });

    // Make sure the delay Value is a number.
    if (isNaN(this.options.delay)) {
        this.options.delay = this.Class.defaultDelay;
    }
},
update: function (options) {
    // Make sure the delay Value is a number.
    if (isNaN(this.options.delay)) {
        this.options.delay = this.Class.defaultDelay;
    }

    this._super(options);
    this.handleCallback();
},
handleCallback: function () {
    if (this.options.callback) {
        var _this = this;
        setTimeout(function () {
            if (_this.options.callback != null) {
                _this.options.callback();
            }
        }, this.options.delay);
    }
},
setLoadingInfo: function (loadingInfo) {
    this.loadingInfoContainer
        .animate({ color: '#fff' }, 500)
        .animate({ color: '#000' }, 500);

},
setBindings: function () {
    if (this.options.listenToTrigger != null) {
        this.bind(document.documentElement, this.options.listenToTrigger, this.callback('remove'));
    }
},
remove: function(callback) {
    var _this = this;
    TweenLite.to(this.spinningContainer, 0.6, {
        delay: 1.0,
        css: { autoAlpha: 0, scale: 0.7 },
        onComplete:
        function () {
            if (typeof callback == 'function') {
                callback.call();
            }
            _this.destroy();
        }
    });
    
},
destroy: function () {
    if (this.element != null && this.spinningWheel != null) {
        this.spinningWheel.remove();
        this.element.css('position', this.storedPosition);
        can.Control.prototype.destroy.call(this);
    }
}
});
	});