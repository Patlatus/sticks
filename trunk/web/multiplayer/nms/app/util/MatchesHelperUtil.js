Ext.define('App.util.MatchesHelperUtil', {
    singleton: true,
    
    requires: [
        'App.util.CompCreatorUtil'
    ],
    
    retrieveConfig: function(){
        var c = App.util.CompCreatorUtil;
        var g = [];
        for (var i = 0; i <= 15; i++) {
            g.push({
                region:'west',
                cls: 'background-image: url(images/js2.png)',
                width: 10,
                border: false,
                layout: {
                    type:'vbox',
                    pack:'center',
                    align:'center'
                },
                items:{
                    xtype: 'image',
                    width:9,
                    height:80,
                    src: 'images/match0.png'
                }
            });
        }
        return [
            {
                region:'west',
                docked: 'top',
                height: 240,
                border: false,
                id: 'matches',
                layout: {
                    type: 'hbox',
                    pack:'center',
                    align:'stretch'
                },
                autoScroll:true,
                items: g
            },
            {
                region:'center',
                border: false, 
                flex: 1
            },
            {
                region:'east',
                id:'west-panel',
                flex: 1,
                border: false, 
                layout: {
                    type: 'vbox',
                    align:'stretch'
                },
                items: [
                    //c.lc('Choose how many matches do you want to take in your turn'),
                    {
                        id:'tb',
                        layout: {
                            type: 'hbox',
                            align:'stretch'
                        },
                        items: [
                            c.bc('Take 1', 't1', {flex: 1,data:1,action:'take'}),
                            c.bc('Take 2', 't2', {flex: 1,data:2,action:'take'}),
                            c.bc('Take 3', 't3', {flex: 1,data:3,action:'take'}),
                            c.bc('Rules', 'rules')
                        ]
                    }/*,
                    c.lc('Rules'),
                    c.lc('Each time you can take one, two or three matches.\nWho takes the last one, loses.')*/
         ]
         
         
         
      }]
   }  
});