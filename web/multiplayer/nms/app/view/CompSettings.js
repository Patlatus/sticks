Ext.define('App.view.CompSettings', {
    extend: 'Ext.Panel',
    xtype: 'compsettings',
    
    requires: [
        'Ext.TitleBar',
        'App.util.CompCreatorUtil'
    ],
    
    config: {
        scrollable: true,
        
        items: [
            {
                xtype: 'titlebar',
                docked: 'top',
                title: 'Matches Network'
            }/*,

            App.util.CompCreatorUtil.lc('Choose your opponent:'),
            App.util.CompCreatorUtil.bc('I want to play with computer', 'bcomp', {handler: Ext.bind(function(){this.parent.setActiveItem(1)}, this)}),
            App.util.CompCreatorUtil.bc('I want to play with alive person', 'buser', {handler: Ext.bind(function(){this.parent.setActiveItem(2)}, this)})*/
        ]
    }
});