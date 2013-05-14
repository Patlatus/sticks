Ext.define('App.controller.Main', {
    extend: 'Ext.app.Controller',
    
    requires: [
        'App.util.CompCreatorUtil',
        'App.util.MatchesHelperUtil',
        'Ext.field.Select',
        'App.store.Users'
    ],
    
    config: {
        refs: {
            parent: '#parent',
            welcomePage: '#welcomePage',
            compSettings: '#compSettings',
            userSettings: '#userSettings',
            play: '#play',
            bcomp: '#bcomp',
            buser: '#buser',
            ng: '#ng',
            fm: '#fm',
            sc: '#sc',
            t1: '#t1',
            t2: '#t2',
            t3: '#t3',
            tb: 'button[action=take]',
            picker: '#picker',
            bload: '#bload',
            lhint: '#lhint',
            username: '#username',
            start: '#start',
            addnew: '#addnew',
            firstMove: '#firstmove',
            matches: '#matches',
            rules: '#rules'
        },
        
        routes: {
        },
        
        control: {
            userSettings: {
                activate: 'userSettingsOnActivate'
            },
            
            bcomp: {
                tap: 'switchToCompSettings'
            },
            
            buser: {
                tap: 'switchToUserSettings'
            },
            
            ng: {
                tap: 'onStartNewGame'
            },
            
            'button[action=take]': {
                tap: 'oc'
            },
            
            bload: {
               tap: 'pickerLoad'
            },
            
            picker: {
                change: 'onPickChange'
            },
            
            start: {
                tap: 'onStart'
            },
            
            addnew: {
                tap: 'addNewGame'
            },
            
            rules: {
                tap: 'onRules'
            }

        }
    },
    
    defaultTimeout : 1000, // 5000
    
    init: function() {
        /*Ext.Viewport.add({
                masked: {
                   xtype: 'loadmask'
                }
            });*/
        Ext.Viewport.setMasked(true);
    },
    
    launch: function() {
        Ext.Viewport.setMasked(false);
        
        c = App.util.CompCreatorUtil;
        this.getWelcomePage().add(
            [
                c.lc('Choose your opponent:'),
                c.bc('I want to play with computer', 'bcomp'),
                c.bc('I want to play with alive person', 'buser')
            ]
        );
        this.getCompSettings().add(
            [
                c.lc('Choose computer level'),
                c.cc("TRandomMatchesPlayer", "TWiseMatchesPlayer", 'sc'),
                c.lc('Choose who makes first move'),
                c.cc("User", "Comp", 'fm'),
                c.bc('Start New Game', 'ng')
            ]
        );
        this.getUserSettings().add(
            [
                c.lc('Join existing game:'),
                {
                    xtype: 'selectfield',
                    id: 'picker',
                    valueField: 'name',
                    displayField: 'name',
                    idField: 'id',
                    store: 'Users'
                },
                {
                    xtype: 'panel',
                    layout: {
                        type: 'hbox',
                        align:'stretch'
                    },
                    items: [
                        c.bc('Update opponent list', 'bload', {flex: 1}),
                        c.bc('Join', 'start')
                    ]
                },
                c.lc('', 'lhint'),
                c.lc('Or declare new game:'),
                {
                    xtype:'textfield',
                    id:'username'
                },
                c.lc('Choose who makes first move'),
                c.cc("Me", "My opponent", "firstmove"),
             
                c.bc('Declare new game', 'addnew')
            ]
        );
        this.getPlay().add(
            {
                xtype: 'panel',
                items: App.util.MatchesHelperUtil.retrieveConfig()
            }
        );
        this.getParent().getTabBar().setHidden(true);
    },
   
    userSettingsOnActivate: function () {
        this.pickerLoad();
    },
    
    getFmValue: function () {
        return this.getFm().getValue() == 1;
    },
   
    getScValue: function () {
        return this.getSc().getValue() == 1;
    },
   
    prepareNewGame : function (fm, ai, csorhost, username) {
        this.m = this.getMatches().getItems().items;
        this.fm = fm;
        this.ai = ai;
        if (ai) {
            this.cs = csorhost;
        } else {
            this.host = csorhost;
            this.username = username;
        }
        this.getParent().setActiveItem(3);
        this.counter = 0;
        this.oc2();
    },
    
    onStartNewGame : function () {
        this.prepareNewGame(this.getFmValue(), true, this.getScValue());
    },
    
    pickerLoad : function () {
        this.getPicker().getStore().load();
        this.onPickChange(this.getPicker(), '')
    },
    
    onPickChange : function(scope, newValue, oldValue, eOpts) {
        this.getLhint().setHtml(this.getPicker().getStore().getCount() === 0 ? '' : scope.record.get("firstmove") == 1?'Opponent wants you to make first move':'Your opponent wants to make first move')
    },
    
    onStart : function () {
        if (this.getPicker().getStore().getCount() === 0) {
            Ext.Msg.alert(":(", "Sorry... No opponents available... You can be the first ;)");
            return;
        }
        if (Ext.isEmpty(this.getPicker().getValue())) {
            Ext.Msg.alert(":(", "Hello! Please select an opponent...");
            return;
        }
        Ext.Ajax.request({
            url: App.config.Config.urlbase + 'joinuser.php',
            params: {
                username: this.getPicker().getValue()
            }
        });
        this.prepareNewGame(this.getPicker().record.get("firstmove") != 1, false, false, this.getPicker().getValue());
    },
   
    addNewGame : function (){
        if (Ext.isEmpty(this.getUsername().getValue())) {
            Ext.Msg.alert(":(", "Your name cannot be empty");
            return;
        }
        this.userName = this.getUsername().getValue();
        this.getPicker().getStore().add({name:this.getUsername().getValue(), firstmove:this.getFirstMove().getValue()});
        Ext.Ajax.request({
            url: App.config.Config.urlbase + 'adduser.php',
            params: {
                name:this.getUsername().getValue(),
                firstmove:this.getFirstMove().getValue()
            },
            success: Ext.bind(function(response){
                this.username = this.getUsername().getValue();
                this.getParent().setActiveItem(4);
                this.checkOpponentConnected();
                Ext.Viewport.setMasked(false);
                //this.getParent().setMasked(false);
            }, this)
        });
        Ext.Viewport.setMasked(true);
        /*Ext.Viewport.add({
            masked: {
               xtype: 'loadmask'
            }
        });*/
        //this.getParent().setMasked(true);
        this.getPicker().getStore().sync();
    },
    
    checkOpponentConnected : function() {
        Ext.Ajax.request({
            url: App.config.Config.urlbase + 'checkopp.php',
            params: {
                username: this.username
            },
            success: Ext.bind(function(response){
                var text = response.responseText;
                if (text == 'yes') {
                    this.prepareNewGame(this.getFirstMove().getValue() == 1, false, true, this.getUsername().getValue());
                } else {
                    setTimeout(Ext.bind(this.checkOpponentConnected, this), this.defaultTimeout);
                }
            }, this)
        });
    },
    
    r: function(w){
        return Math.floor(Math.random() * w);
    },
    
    rp: function(c){
        return this.r((c < 3) ? c : 3) + 1;
    },
    
    wp: function(c){
        return ((c - 1) % 4 == 0) ? this.rp(c) : (c - 1) % 4;
    },
    
    c: function(i) {
        this.getT1().setHidden(i < 1);
        this.getT2().setHidden(i < 2);
        this.getT3().setHidden(i < 3);
    },
    
    t: function(a) {
        this.k -= a; 
    },
    
    ms: function(u, a) {
        var t = this;
        for (var i = t.k - 1; i >= t.k - a; i--) {
            t.m[i].getLayout().setPack(u ? 'end': 'start');
        }
        t.t(a);
    },
    
    onGameOver: function() {
        this.getParent().setActiveItem(0);
    },
    
    setUserMoveAbility: function (ability) {
        this.getT1().setDisabled(ability);
        this.getT2().setDisabled(ability);
        this.getT3().setDisabled(ability);
    },
    
    disableUserMove: function () {
        this.setUserMoveAbility(true);
    },

    enableUserMove: function () {
        this.setUserMoveAbility(false);
    },

    cp: function() {
        var t = this;
        var r = (t.cs) ? t.wp(t.k) : t.rp(t.k);
        t.ms(false, r);
        t.c(t.k);
        t.afterCpCheck();
    },
    
    afterCpCheck : function () {
        this.enableUserMove();
        if (this.k == 0){
            Ext.Msg.alert(":)", "You won");
            this.onGameOver();
        };
    },
    
    ucp: function () {
        Ext.Ajax.request({
            url: App.config.Config.urlbase + 'waitmove.php',
            params: {
                username: this.username,
                host: !this.host,
                counter: this.counter
            },
            success: Ext.bind(function(response){
                var text = response.responseText;
                var r = parseInt(text);
                if (r > 0 && r < 4) {
                    this.ms(false, r);
                    this.c(this.k);
                    this.counter++;
                    this.afterCpCheck();
               } else {
                    setTimeout(Ext.bind(this.ucp, this), this.defaultTimeout);
                }
            }, this)
        });
    },
   
    oc: function(i){
        var t = this;
        t.disableUserMove();
        t.ms(1, i._data);
        t.c(t.k);
        if (!t.ai) {
            Ext.Ajax.request({
                url: App.config.Config.urlbase + 'gamemove.php',
                params: {
                    username: this.username,
                    host: this.host,
                    move: i._data,
                    counter: this.counter
                },
                success: Ext.bind(function(response){
                    this.counter++;
                    this.ucp();
                }, this)
            });
        }
        if (t.k == 0) {
            Ext.Msg.alert(":(", "You lost");
            t.onGameOver();
            return;
        }; 
        if (t.ai) {
            t.cp();
        }
    },

    oc2: function(){
        var t = this;
        t.disableUserMove();
        t.c(3);
        t.k = 16;
        for (var i = 15; i >= 0; i--){
            t.m[i]._layout.setPack('center');
        };

        if (t.fm){
            t.ai?t.cp():t.ucp();
        } else {
            t.enableUserMove();
        };
    },
    
    switchToCompSettings: function() {
        this.getParent().setActiveItem(1);
    },
    
    switchToUserSettings: function() {
        this.getParent().setActiveItem(2);
    },
    
    onRules: function() {
        Ext.Msg.alert("Rules", "Each time you can take one, two or three matches.<br>Whoever takes the last one, loses.");
    }
});