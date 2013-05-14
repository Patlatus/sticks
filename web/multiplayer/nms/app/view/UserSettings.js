Ext.define('App.view.UserSettings', {
    extend: 'Ext.Panel',
    xtype: 'usersettings',
    
    requires: [
        'Ext.TitleBar',
        'Ext.field.Select',
        'App.store.Users',
        'App.util.CompCreatorUtil'
    ],
    
    config: {
        scrollable: true,
        
        items: [
            {
                xtype: 'titlebar',
                docked: 'top',
                title: 'Matches Network'
            }
        ]
    }
});