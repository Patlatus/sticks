Ext.define('MyDesktop.MatchesWindow', {
    extend: 'Ext.ux.desktop.Module',

    requires: [
        'MyDesktop.Matches'
    ],

    id:'matches-win',
    t:'Matches game',
    ic:'icon-matches',
    m: null,
    p: null,

    init : function(){
        this.launcher = {
            text: this.t,
            iconCls:this.ic
        }
        this.m = new MyDesktop.Matches();    
        this.p = this.m.i();    
    },

    createWindow : function(){
        var desktop = this.app.getDesktop();
        var win = desktop.getWindow(this.id);

        
    
        
        if(!win){
            win = desktop.createWindow({
                id:this.id,
                title:this.t,
                width:425,
                minWidth: 330,
                height:330,
                minHeight:330,
                iconCls:this.ic,
                animCollapse:false,
                constrainHeader:true,
                layout: {
            type: 'hbox',
            align:'stretch'
         },
                items: this.p 
            });
            this.m.m = win.items.items[0].items.items;
            this.m.tb = win.items.items[2].items.items[1];
            this.m.st = win.items.items[2].items.items[3];
            this.m.fm = win.items.items[2].items.items[5];
            this.m.nb = win.items.items[2].items.items[6];
            this.m.oc2();
            };
        win.on({
            render: function () {
                Ext.defer(win.doLayout(), 1000);
            },
            single: true
        });        
        return win;
    }
});

