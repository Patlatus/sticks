Ext.define('MyDesktop.VideoWindow', {
    extend: 'Ext.ux.desktop.Module',

    uses: [
        'Ext.ux.desktop.Video'
    ],

    id:'video',
	t:'About Video',
	ic:'icon-video',
    windowId: 'video-window',

    tipWidth: 160,
    tipHeight: 96,

    init : function(){
        this.launcher = {
            text: this.t,
            iconCls:this.ic
        }
    },

    createWindow : function(){
        var me = this, desktop = me.app.getDesktop(),
            win = desktop.getWindow(me.windowId);

        if (!win) {
            win = desktop.createWindow({
                id: me.windowId,
                title: this.t,
                width: 740,
                height: 480,
                iconCls: this.ic,
                animCollapse: false,
                border: false,

                layout: 'fit',
                items: [
                    {
                        xtype: 'video',
                        id: 'video-player',
                        src: [
							{ src: 'http://www.julfysoft.elitno.net/MVI_3275.mp4', type: 'video/mp4' },
							{ src: 'http://www.julfysoft.elitno.net/MVI_3275.ogv', type: 'video/ogg' }
                        ],
                        autobuffer: true,
                        autoplay : true,
                        controls : true,
                        listeners: {
                            afterrender: function(video) {
                                me.videoEl = video.video.dom;

                                if (video.supported) {
                                    me.tip = new Ext.tip.ToolTip({
                                        anchor   : 'bottom',
                                        dismissDelay : 0,
                                        height   : me.tipHeight,
                                        width    : me.tipWidth,
                                        renderTpl: [
                                            '<canvas width="', me.tipWidth,
                                                  '" height="', me.tipHeight, '">'
                                        ],
                                        renderSelectors: {
                                            body: 'canvas'
                                        },
                                        listeners: {
                                            afterrender: me.onTooltipRender,
                                            show: me.renderPreview,
                                            scope: me
                                        }
                                    });
                                }
                            }
                        }
                    }
                ],
                listeners: {
                    beforedestroy: function() {
                        me.tip = me.ctx = me.videoEl = null;
                    }
                }
            });
        }

        if (me.tip) {
            me.tip.setTarget(win.taskButton.el);
        }

        return win;
    },

    onTooltipRender: function (tip) {
        var el = tip.body.dom, me = this;
        me.ctx = el.getContext && el.getContext('2d');
    },

    renderPreview: function() {
        var me = this;

        if ((me.tip && !me.tip.isVisible()) || !me.videoEl) {
            return;
        }

        if (me.ctx) {
            try {
                me.ctx.drawImage(me.videoEl, 0, 0, me.tipWidth, me.tipHeight);
            } catch(e) {};
        }
        Ext.Function.defer(me.renderPreview, 20, me);
    }
});
