Ext.define('App.view.Play', {
    extend: 'Ext.Panel',
    xtype: 'play',
    
    requires: [
        'Ext.TitleBar',
        'App.util.CompCreatorUtil'
    ],
    
    config: {
        scrollable: true
    }
});