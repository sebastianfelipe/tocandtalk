var ButtonSaveLight = {
    div_id: null,
    interval: null,
    interval_hover: null,

    init: function(div_id) {
        this.div_id = div_id;
        this.interval = null;
        this.interval_hover = null;

        this.button_light();
        this.button_hover();
    },

    button_light: function() {
        var $button_save = $(this.div_id);

        var interval = null;
        this.interval = interval;
        var state = false;
        clearInterval(this.interval);

        this.interval = setInterval(function(){
            var isNotHovered = !$button_save.
                        filter(function() { return $(this).is(":hover"); }).length;

            if (isNotHovered) {
                if (state) {
                    $button_save.css({
                        boxShadow: '0px 0px 5px 0px #00e676',
                        background: '#00e676'
                    });
                    state = false;

                } else {
                    $button_save.css({
                        boxShadow: 'none',
                        background: '#00d06b'
                    });
                    state = true;
                }
            } else {
                state = false;
            }
        }, 900);
    },

    button_hover: function() {
        var $button_save = $(this.div_id);

        var interval_hover = null;
        this.interval_hover = interval_hover;
        clearInterval(this.interval_hover);

        this.interval_hover = setInterval(function(){
            var isHovered = !!$button_save.
                        filter(function() { return $(this).is(":hover"); }).length;

            if (isHovered) {
                $button_save.css({
                    boxShadow: '0px 0px 6px 0px #33dd8b',
                    background: '#33dd8b'
                });
            } 
        }, 10);
    },

    destroy: function() {
        clearInterval(this.interval);
        clearInterval(this.interval_hover);
    }
}