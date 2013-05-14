Ext.define("App.view.Main", {
    extend: 'Ext.tab.Panel',
    id: 'parent',
    
    config: {
        fullscreen: true,
        tabBarPosition: 'bottom',

        defaults: {
            styleHtmlContent: true
        },

        items: [
            {
                id: 'welcomePage',
                title: 'Welcome',
                iconCls: 'home',
                
                /*items: [
                    {*/
                        xtype: 'welcomepage'
                /*    }
                ]*/
            },
            {
                id: 'compSettings',
                title: 'compSettings',
                iconCls: 'bookmarks',
                
                /*items: [
                    {*/
                        xtype: 'compsettings'//'ChooseComp'
                /*    }
                ]*/
            },
            {
                id: 'userSettings',
                title: 'userSettings',
                iconCls: 'download',
                
                /*items: [
                    {*/
                        xtype: 'usersettings'//'LoginPanel'
                /*    }
                ]*/
            },
            {
                id: 'play',
                title: 'play',
                iconCls: 'time',
                
                /*items: [
                    {*/
                        xtype: 'play'//'MPanel'
                /*    }
                ]*/
            },

            {
                id: 'wait',
                title: 'wait',
                iconCls: 'add',
                html: 'Please wait until someone joins you...'
            }/*,
            {
                title: 'Settings',
                iconCls: 'settings',
                html: 'Settings'
            }*/
        ]
    }
});

/**
 * Fix for Bug TOUCH-2665 (Sencha Touch 2.0.1 RC)
 * must be removed in next release
 */
Ext.define('App.Tabfix', {
    override: 'Ext.tab.Panel',
    doTabChange: function(tabBar, newTab) {
        this.setActiveItem(tabBar.indexOf(newTab));
    }
});