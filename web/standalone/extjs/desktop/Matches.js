Ext.define('MyDesktop.Matches', {

    requires: [
        'Ext.form.field.ComboBox',
        'Ext.form.Label',
        'Ext.window.MessageBox',
        'Ext.data.Store'
    ],
    
    k: 16,
    g: [],
    m: [],
    one: [],
    two: [],
    three: [],
    tb: null,
    st: null,
    nb: null,
    fm: null,
    xx: [],
    yy: [],
    
    r: function(w){
      return Math.floor(Math.random()*w);
    },
    rp: function(c){var i=this;
      if (c < 3)
         return i.r(c) + 1;
      else
         return i.r(3) + 1;
   },
   wp: function(c){
      if ((c - 1) % 4 == 0)
         return this.rp(c)
      else
         return (c - 1) % 4;
   },
   c: function(s){var m=this.tb.menu;
      m.removeAll();
      m.add(s);
   },
   t: function(a)
    {
        this.k -= a; 
    },
   ms: function(u, a) {var t=this;
      for (var i = t.k - 1; i >= t.k - a; i--) {
         t.m[i].layout.pack = u ? 'end': 'start';
         t.m[i].doLayout();
         
      }
      t.t(a);
   },
   am: function() {var t=this;
      if (t.k >= 3)
         return;
      switch (t.k) {

      case 2:
         t.c(t.two);
      break;
      case 1:
         t.c(t.one);
      break;
      case 0:
         t.c([]);
      break;
    }
    },
    ng: function() {
      this.nb.setDisabled(false);
      this.st.setDisabled(false);
      this.fm.setDisabled(false);
   },
   cp: function() {
      var result;
  switch (this.st.getValue())
  {
    case 0:
      result = this.rp(this.k);
    break;
  default:
    result = this.wp(this.k);
  }
  this.ms(false, result);
  this.am();
          this.tb.setDisabled(false);

   },
    oc: function(i){var t=this;
       t.ms(1, i.tag);
       t.am();
       if (t.k == 0){
          Ext.Msg.alert("You lose");
          t.ng();
          return;
       };   
       t.cp();
       if (t.k == 0){
          Ext.Msg.alert("You won");
          t.ng();
       }; 
    },
    
   oc2: function(){
      this.nb.setDisabled(true);
      this.st.setDisabled(true);
      this.fm.setDisabled(true);
      this.c(this.three);
      this.k = 16;
      for (var i = 15; i >= 0; i--){
               this.m[i].layout.pack = 'center';
         this.m[i].doLayout();
      }

        if (this.fm.getValue() == 1){
            this.tb.setDisabled(true);
            this.cp();
            
        }
    },
    lc: function(c){
       return {
             xtype: 'label',
             text: c,
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
    
    cc: function(c, d){      
       return {
             xtype: 'combobox',
             store: Ext.create('Ext.data.Store', {
    fields: ['a', 'b'],
    data: [
        {"a":0, "b":c},
        {"a":1, "b":d}
    ]
}),
    queryMode: 'local',
    displayField: 'b',
    valueField: 'a',
    value: 0,
    disabled: true
         }
    },

i: function(){
      for (var i = 0; i <= 15; i++)
         this.g.push({
            region:'west',
            width: 10,
            border: false,
            layout: {
                                        type:'vbox',
                                        pack:'center',
                                        align:'center'
                                    },
                                    
            items:{xtype: 'image',
            width:9,
            height:80,
             src: 'images/match0.png'
            }
         });
      var mi = [];
      for (var i = 1; i <= 3; i++)    
         mi.push({
                  text: i,
                  tag: i,
                  handler: Ext.bind(this.oc, this)
               });
      this.three = mi;
      this.two = [mi[0], mi[1]];      
      this.one = [mi[0]];      
     
      return [{
         region:'west',
         width: 160,
         border: false, 
         layout: {
            type: 'hbox',
            align:'stretch'
         },
         autoScroll:true,
         flex: 0,
         items: this.g
      },
      {
         region:'center',
         border: false, 
         flex: 1
      },
      {
         region:'east',

         id:'west-panel',
         width: 190,
         flex: 0,
         border: false, 
         layout: {
            type: 'vbox',
            align:'stretch'
         },
         items: [
            this.lc('Choose how many matches do you want to take in your turn'),
            this.bc('Take', 'take', {menu: {items: mi}}),

            this.lc('Choose computer level'),
            this.cc("TRandomMatchesPlayer", "TWiseMatchesPlayer"),

this.lc('Choose who makes first move'),this.cc("User", "Comp"), this.bc('Start New Game', 'newgame', {disabled: true, handler: Ext.bind(this.oc2, this)}), 
         this.lc('Rules'), this.lc('Each time you can take one, two or three matches.\n/nWho takes the last one, loses.'),
         this.bc('Download Windows Desktop version', 'download', {href: 'http://julfysoft.elitno.net/delphiprogs/matches/Matchesb.exe'}), 
         {layout: 'hbox',
         border: false, 
         items: [
            this.lc('Produced by: '),
            {width: 50,height:50,border: false}, 
            {xtype: 'image',
    src: 'images/julfysoft.jpg',
    flex: 1
}]}
         ]
         
         
         
      }]
   }  


});
  