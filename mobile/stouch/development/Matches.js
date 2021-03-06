Ext.define('Matches', {

    requires: [
		'Ext.field.Select',
		'Ext.Label',
		'Ext.MessageBox',
		'Ext.data.Store'
    ],
	
	k: 16,
	g: [],
	m: [],
	one: [],
	two: [],
	three: [],
	tb1: null,
	tb2: null,
	tb3: null,
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
   c: function(i){var t=this;
      t.tb1.setHidden(i < 1);
      t.tb2.setHidden(i < 2);
      t.tb3.setHidden(i < 3);
   },
   t: function(a)
	{
		this.k -= a; 
	},
   ms: function(u, a) {var t=this;
      for (var i = t.k - 1; i >= t.k - a; i--) {
	     t.m[i].getLayout().setPack(u ? 'end': 'start');
	     //t.m[i].setLayout({pack: u ? 'end': 'start'});// do here an animation rather
		 //t.m[i].doLayout();
         
      }
      t.t(a);
   },
	ng: function() {
      this.nb.setDisabled(false);
      this.st.setDisabled(false);
	  this.fm.setDisabled(false);
   },
   cp: function() {var t=this;
      var r;
  switch (t.st.getValue())
  {
    case 0:
      r = t.rp(t.k);
    break;
  default:
    r = t.wp(t.k);
  }
  t.ms(false, r);
  t.c(t.k);
  t.tb1.setDisabled(false);
  t.tb2.setDisabled(false);
  t.tb3.setDisabled(false);

   },
	oc: function(i){var t=this;
	   t.ms(1, i._data);
	   t.c(t.k);
	   if (t.k == 0){
	      Ext.Msg.alert(":(", "You lost");
		  t.ng();
		  return;
	   };   
	   t.cp();
	   if (t.k == 0){
	      Ext.Msg.alert(":)", "You won");
		  t.ng();
	   }; 
	},
	
   oc2: function(){var t=this;
      t.nb.setDisabled(true);
      t.st.setDisabled(true);
      t.fm.setDisabled(true);
	  t.c(3);
	  t.k = 16;
      for (var i = 15; i >= 0; i--){
	  t.m[i]._layout.setPack('center');
	  	     //t.m[i]._layout._pack = 'center';
		 //t.m[i].doLayout();
	  }

		if (t.fm.getValue() == 1){
		    t.tb1.setDisabled(true);
		    t.tb2.setDisabled(true);
		    t.tb3.setDisabled(true);
			t.cp();
			
		}
	},
	lc: function(c){
	   return {
			 xtype: 'label',
             html: c,
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
			 xtype: 'selectfield',
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
			cls: 'background-image: url(images/js2.png)',
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
		 docked: 'top',
         height: 240,
         border: false, 
         layout: {
            type: 'hbox',
            pack:'center',
             align:'stretch'
         },
         autoScroll:true,
		 //flex: 0,
         items: this.g/*[{flex: 1},{layout: {
            type: 'hbox',
            align:'stretch'
         }, flex: 1, items: this.g},{flex: 1}
		 ]*/
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
		 flex: 1,
         border: false, 
         layout: {
            type: 'vbox',
            align:'stretch'
         },
         items: [
		    this.lc('Choose how many matches do you want to take in your turn'),
			{id:'tb',
			layout: {
            type: 'hbox',
            align:'stretch'
         },items:[this.bc('Take 1', 't1', {flex: 1,data:1,handler: Ext.bind(this.oc, this)}),this.bc('Take 2', 't2', {flex: 1,data:2,handler: Ext.bind(this.oc, this)}),this.bc('Take 3', 't3', {flex: 1,data:3,handler: Ext.bind(this.oc, this)})]},
                  
			this.lc('Choose computer level'),
			this.cc("TRandomMatchesPlayer", "TWiseMatchesPlayer"),

this.lc('Choose who makes first move'),this.cc("User", "Comp"), this.bc('Start New Game', 'newgame', {disabled: true, handler: Ext.bind(this.oc2, this)}), 
		 this.lc('Rules'), this.lc('Each time you can take one, two or three matches.\nWho takes the last one, loses.')/*,
		 this.bc('Download Windows Desktop version', 'download', {href: 'http://julfysoft.elitno.net/delphiprogs/matches/Matchesb.exe'}), 
		 {layout: 'hbox',
		 border: false, 
		 items: [
		    this.lc('Produced by: '),
			{width: 50,height:50,border: false}, 
			{xtype: 'image',
    src: 'images/julfysoft.jpg',
	flex: 1
}]}*/
	     ]
		 
		 
		 
      }]
   }  


});
  