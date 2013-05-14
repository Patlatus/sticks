/*
//<debug>
Ext.Loader.setPath({
    'Ext': '../../src'
});
//</debug>
*/
/**
 * This example is a simple demo of some of the form and field components in Sencha Touch.
 * It also shows how you can bind a Model instance to a form, and then update that instance with values
 * from the form panel.
 */

// Define our simple application
Ext.application({
    name: 'App',

    requires: [
        'App.util.CompCreatorUtil',
		'Ext.Label',
		'Ext.Button',
		'Ext.field.Select',
		'Ext.data.Store',
		'App.config.Config'
    ],

    views: [
        'Main',
        'WelcomePage',
        'CompSettings',
        'UserSettings',
        'Play'
    ],
    
    models: [
        'User'
    ],
    
    stores: [
        'Users'
    ],
    
    controllers: [
        'Main'
    ],

	// Setup the icons and startup screens for phones and tablets.
    phoneStartupScreen: 'resources/loading/Homescreen.jpg',
    tabletStartupScreen: 'resources/loading/Homescreen~ipad.jpg',

    glossOnIcon: false,
    icon: {
        57: 'resources/icons/icon.png',
        72: 'resources/icons/icon@72.png',
        114: 'resources/icons/icon@2x.png',
        144: 'resources/icons/icon@114.png'
    },

    // Require the components we will be using in this example
    /*requires: [
        'ChooseComp',
        'MPanel',
        'MainPanel',
        'LoginPanel',
        'Ext.form.*',
        'Ext.field.*',
        'Ext.Button',

        'Ext.data.Store'
    ],*/

    /**
     * The launch method of our application gets called when the application is good to launch.
     * In here, we are going to build the structure of our application and add it into the Viewport.
     */
    launch: function() {
        Ext.Viewport.add(Ext.create('App.view.Main'));
        /*var parentPanel = Ext.create('Ext.TabPanel', {
            fullscreen: true,
            tabBarPosition: 'bottom',

            defaults: {
                styleHtmlContent: true
            },

            items: [
                {
                    xtype: 'MainPanel',
                    iconCls: 'time',
                },
                {
                    xtype: 'ChooseComp',
                    iconCls: 'time',
                },
                {
                    xtype: 'LoginPanel',
                    iconCls: 'download'
                },
                {
                    xtype: 'MPanel',
                    iconCls: 'time',
                },

                {
                    title: 'Add new task',
                    iconCls: 'add',
                    html: 'Please wait until someone joins you...'
                },
                {
                    title: 'Settings',
                    iconCls: 'settings',
                    html: 'Settings'
                }
            ]
        });
		parentPanel.playPanel = parentPanel.items.items[4];
        // Get all the items for our form.
      /*this.m = new Matches();   
        this.p = this.m.i();   
      
        var config, form;

        // Create the configuration of our form.
        // We give it the `formpanel` xtype and give it the items we got above.
      var userStore;
 
    userStore = Ext.create('Ext.data.Store', {
        model: 'User',
        autoLoad: true,

        proxy: {
            type: 'ajax',
            url: 'getusers.php',
            reader: 'json'
        }
    });
   
   this.picker = Ext.create('Ext.field.Select', {
   valueField:'name',
   displayField:'name',
    store: userStore
   });
   this.p.push(this.picker);
        config = {
            xtype: 'formpanel',
            items: this.p
        };

        // If we are on a phone, we just want to add the form into the viewport as is.
        // This will make it stretch to the size of the Viewport.
        if (Ext.os.deviceType == 'Phone') {
            form = Ext.Viewport.add(config);
        } else {
            // If we are not on a phone, we want to make the formpanel model and give it a fixed with and height.
            Ext.apply(config, {
                modal: true,
                height: 505,
                width: 480,
                centered: true,

                // Disable hideOnMaskTap so it cannot be hidden
                hideOnMaskTap: false
            });

            // Add it to the Viewport and show it.
            form = Ext.Viewport.add(config);
            form.show();
        };
      /*this.m.m = form.items.items[0].items.items;
         this.m.tb1 = form.items.items[2].items.items[1].items.items[0];
         this.m.tb2 = form.items.items[2].items.items[1].items.items[1];
         this.m.tb3 = form.items.items[2].items.items[1].items.items[2];
         this.m.st = form.items.items[2].items.items[3];
         this.m.fm = form.items.items[2].items.items[5];
         this.m.nb = form.items.items[2].items.items[6];
         this.m.oc2();*/

        //this.form = form;
    }
});

