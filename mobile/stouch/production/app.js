Ext.define("Matches",{requires:["Ext.field.Select","Ext.Label","Ext.MessageBox","Ext.data.Store"],k:16,g:[],m:[],one:[],two:[],three:[],tb1:null,tb2:null,tb3:null,st:null,nb:null,fm:null,xx:[],yy:[],r:function(a){return Math.floor(Math.random()*a)},rp:function(b){var a=this;if(b<3){return a.r(b)+1}else{return a.r(3)+1}},wp:function(a){if((a-1)%4==0){return this.rp(a)}else{return(a-1)%4}},c:function(b){var a=this;a.tb1.setHidden(b<1);a.tb2.setHidden(b<2);a.tb3.setHidden(b<3)},t:function(b){this.k-=b},ms:function(c,b){var e=this;for(var d=e.k-1;d>=e.k-b;d--){e.m[d].getLayout().setPack(c?"end":"start")}e.t(b)},ng:function(){this.nb.setDisabled(false);this.st.setDisabled(false);this.fm.setDisabled(false)},cp:function(){var a=this;var b;switch(a.st.getValue()){case 0:b=a.rp(a.k);break;default:b=a.wp(a.k)}a.ms(false,b);a.c(a.k);a.tb1.setDisabled(false);a.tb2.setDisabled(false);a.tb3.setDisabled(false)},oc:function(b){var a=this;a.ms(1,b._data);a.c(a.k);if(a.k==0){Ext.Msg.alert(":(","You lost");a.ng();return}a.cp();if(a.k==0){Ext.Msg.alert(":)","You won");a.ng()}},oc2:function(){var b=this;b.nb.setDisabled(true);b.st.setDisabled(true);b.fm.setDisabled(true);b.c(3);b.k=16;for(var a=15;a>=0;a--){b.m[a]._layout.setPack("center")}if(b.fm.getValue()==1){b.tb1.setDisabled(true);b.tb2.setDisabled(true);b.tb3.setDisabled(true);b.cp()}},lc:function(a){return{xtype:"label",html:a,scale:"small",color:"default",cls:"floater"}},bc:function(b,a,d){return Ext.apply({xtype:"button",text:b,id:a,scale:"small",color:"default",cls:"floater"},d)},cc:function(b,a){return{xtype:"selectfield",store:Ext.create("Ext.data.Store",{fields:["a","b"],data:[{a:0,b:b},{a:1,b:a}]}),queryMode:"local",displayField:"b",valueField:"a",value:0,disabled:true}},i:function(){for(var b=0;b<=15;b++){this.g.push({region:"west",cls:"background-image: url(images/js2.png)",width:10,border:false,layout:{type:"vbox",pack:"center",align:"center"},items:{xtype:"image",width:9,height:80,src:"images/match0.png"}})}var a=[];for(var b=1;b<=3;b++){a.push({text:b,tag:b,handler:Ext.bind(this.oc,this)})}this.three=a;this.two=[a[0],a[1]];this.one=[a[0]];return[{region:"west",docked:"top",height:240,border:false,layout:{type:"hbox",pack:"center",align:"stretch"},autoScroll:true,items:this.g},{region:"center",border:false,flex:1},{region:"east",id:"west-panel",width:190,flex:1,border:false,layout:{type:"vbox",align:"stretch"},items:[this.lc("Choose how many matches do you want to take in your turn"),{id:"tb",layout:{type:"hbox",align:"stretch"},items:[this.bc("Take 1","t1",{flex:1,data:1,handler:Ext.bind(this.oc,this)}),this.bc("Take 2","t2",{flex:1,data:2,handler:Ext.bind(this.oc,this)}),this.bc("Take 3","t3",{flex:1,data:3,handler:Ext.bind(this.oc,this)})]},this.lc("Choose computer level"),this.cc("TRandomMatchesPlayer","TWiseMatchesPlayer"),this.lc("Choose who makes first move"),this.cc("User","Comp"),this.bc("Start New Game","newgame",{disabled:true,handler:Ext.bind(this.oc2,this)}),this.lc("Rules"),this.lc("Each time you can take one, two or three matches.\nWho takes the last one, loses.")]}]}});Ext.application({phoneStartupScreen:"resources/loading/Homescreen.jpg",tabletStartupScreen:"resources/loading/Homescreen~ipad.jpg",glossOnIcon:false,icon:{57:"resources/icons/icon.png",72:"resources/icons/icon@72.png",114:"resources/icons/icon@2x.png",144:"resources/icons/icon@114.png"},requires:["Matches","Ext.form.*","Ext.field.*","Ext.Button","Ext.data.Store"],launch:function(){this.m=new Matches();this.p=this.m.i();var a,b;a={xtype:"formpanel",items:this.p};if(Ext.os.deviceType=="Phone"){b=Ext.Viewport.add(a)}else{Ext.apply(a,{modal:true,height:505,width:480,centered:true,hideOnMaskTap:false});b=Ext.Viewport.add(a);b.show()}this.m.m=b.items.items[0].items.items;this.m.tb1=b.items.items[2].items.items[1].items.items[0];this.m.tb2=b.items.items[2].items.items[1].items.items[1];this.m.tb3=b.items.items[2].items.items[1].items.items[2];this.m.st=b.items.items[2].items.items[3];this.m.fm=b.items.items[2].items.items[5];this.m.nb=b.items.items[2].items.items[6];this.m.oc2();this.form=b}});