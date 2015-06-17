/*global Ext, window, ol, GeoExt*/
/*jshint camelcase:true, curly:true, eqeqeq:true, latedef:true, newcap:true, noarg:true, undef:true, trailing:true, maxlen:100 */
/**
 * @class
 */

Ext.define('GeoExt.component.CircleMenu', {
    extend: 'Ext.container.Container',
    xtype: 'gx_circlemenu',

    plain: false,

    /**
     *
     */
    mapPanel: null,

    /**
     *
     */
    map: null,

    /**
     * Defaults that are set to every item (button).
     */
    defaults: {
        hidden: true,
        //TODO Get this working from here --> renderTo: document.body,
        handler: function(btn) {
            Ext.toast('I am a stupid ' + btn.xtype + '. Please give me a function!');
        }
        //TODO Get this working from here --> cls: 'circleMenuButton',
    },

    /**
     * PieMenu properties start here
     */
    roundButtons: false,

    /**
     * BoderRadius of the icons
     */
    borderRadius: '3px',

    /**
     *
     */
    circleWidth : 40,

    /**
     *
     */
    circleHeight : 40,

    /**
     * Initializes this component
     */
    initComponent: function() {
        var me = this;

        // some inits
        me.initMapProperty();

        me.callParent();
    },

    /**
     * Opens a circle menu on the map
     * @string menu this component
     * @event evt the click event
     */
    showCircleMenu: function(me, evt) {
        evt.preventDefault();
        var items = me.items.items;
        
        // if in IE
        if (!evt) {
            evt = window.event;
            evt.returnValue = false;
        }

        var evtX = evt.clientX,
            evtY = evt.clientY,
            step = (2.0 * Math.PI) / (1.0 * (items.length)),
            rotation = (90 / 180) * Math.PI,
            radius = Math.sqrt(me.circleWidth) * Math.sqrt(items.length) * 2.5;

        Ext.each(items, function(item, i){
            var x = Math.cos(i*step - rotation) * radius - (me.circleWidth / 2),
                y = Math.sin(i*step - rotation) * radius - (me.circleHeight / 2);

            item.setWidth(radius);
            if(me.roundButtons && item.getWidth() !== 0){
                item.setHeight(item.getWidth());
                me.borderRadius = item.getWidth()/2 + 'px';
            }

            item.setStyle({
                position:'absolute',
                '-webkit-border-radius': me.borderRadius,
                '-moz-border-radius': me.borderRadius,
                'border-radius': me.borderRadius,
                left: evtX,
                top: evtY
            });

            item.animate({
                duration: 500,
                from: {
                    x: evtX,
                    y: evtY
                },
                to: {
                    x: evtX+x,
                    y: evtY+y
                }
            });

            item.on('click',function(){
                me.destroyCircleMenu();
            });

            item.show();
        });
        
        return false;
    },

    /**
     * Destroy the circlemenu
     */
    destroyCircleMenu: function() {
        var me = this,
            items = me.items.items;

        Ext.each(items, function(item, i){
            item.hide();
        });

        return true;
    },

    /**
     * Initialize the mapPanel and map reference
     */
    initMapProperty: function() {
        var me = this;

        if (!Ext.isObject(me.mapPanel)) {
            me.mapPanel = GeoExt.panel.Map.guess();
        }
        if (!Ext.isObject(me.map)) {
            me.map = me.mapPanel.map;
        }
    },

    /**
     * Enable the circle menu
     */
    enable: function() {
        var me = this;
        if (me.map instanceof ol.Map) {

            // add the circle menu to the map (and pass the the actual component)
            me.map.getTarget().oncontextmenu = Ext.Function.pass(me.showCircleMenu, [me]);

            // Touch Support
//            me.mapPanel.getEl().on('longpress', function(evt){
//                evt.clientX = evt.touch.pageX;
//                evt.clientY = evt.touch.pageY;
//                me.showCircleMenu(me, evt);
//            }, me);

            // hide the menu when moving
            me.map.on("pointerdrag", me.destroyCircleMenu, me);

        } else {
            Ext.Logger.error('Could not add the circlemenu to the map.');
        }
    },

    /**
     * Disable the circle menu
     */
    disable: function() {
        var me = this;
        // remove the circle menu from the map
        me.map.getTarget().oncontextmenu = null;
        // disable the menu when moving
        me.map.un("pointerdrag", me.destroyCircleMenu, me);
    }

});