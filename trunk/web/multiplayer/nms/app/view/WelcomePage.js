Ext.define('App.view.WelcomePage', {
    extend: 'Ext.Panel',
    xtype: 'welcomepage',
    
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
                title: 'Wellcome to Matches'
            }/*,

            App.util.CompCreatorUtil.lc('Choose your opponent:'),
            App.util.CompCreatorUtil.bc('I want to play with computer', 'bcomp', {handler: Ext.bind(function(){this.parent.setActiveItem(1)}, this)}),
            App.util.CompCreatorUtil.bc('I want to play with alive person', 'buser', {handler: Ext.bind(function(){this.parent.setActiveItem(2)}, this)})*/
        ]
    }
});