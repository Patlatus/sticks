Ext.define('App.util.CompCreatorUtil', {
    singleton: true,
    
    requires: [
        'Ext.Label',
        'Ext.Button',
        'Ext.field.Select',
        'Ext.data.Store'
    ],
    
    lc: function(c, i){
        return {
            xtype: 'label',
            html: c,
            id: i,
            scale: 'small',
            color: "default",
            cls: 'floater'            
        }
    },
    
    bc: function(t, i, c){
        return  Ext.apply({
            xtype: 'button',
            text: t,
            id: i,
            scale: 'small',
            color: "default",
            cls: 'floater'
        }, c);
    },
    
    cc: function(c, d, i){      
        return {
            xtype: 'selectfield',
            store: Ext.create('Ext.data.Store', {
                fields: ['a', 'b'],
                data: [
                    {"a":0, "b":c},
                    {"a":1, "b":d}
                ]
            }),
            id: i,
            queryMode: 'local',
            displayField: 'b',
            valueField: 'a',
            value: 0
         }
    }
});