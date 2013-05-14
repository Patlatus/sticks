Ext.define('App.store.Users', {
    extend: 'Ext.data.Store',
    
    requires: [
        'App.model.User',
        'App.config.Config'
    ],
    
    config: {
        autoLoad: true,
        
        model: 'App.model.User',
        
        proxy: {
            type: 'ajax',
            url: App.config.Config.urlbase + 'getusersid.php',
            /*api: {
                //create  : 'adduser.php',
                read    : 'getusersid.php'
            },*/
            reader: 'json'/*,
            writer: 'json'*/
        }
    }
});