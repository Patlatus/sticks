Ext.define('App.model.User', {
    extend: 'Ext.data.Model',
    
    config: {
        fields: [
            {name: 'id', type: 'int'},
            {name: 'name', type: 'string'},
            {name: 'firstmove', type: 'int'},
            {name: 'available', type: 'int'}
        ]
    }
});