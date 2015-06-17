Ext.require([
    'GeoExt.panel.Map',
    'GeoExt.component.CircleMenu'
]);

var mapPanel,
    overviewMap1,
    overviewMap2;

Ext.setGlyphFontFamily('FontAwesome');

Ext.application({
    name: 'OverviewMaps',
    launch: function(){
        var source, source2,
            layer, layer2,
            olMap,
            description,
            ovMapPanel1, ovMapPanel2;

        source = new ol.source.MapQuest({layer: 'sat'});
        layer = new ol.layer.Tile({
          source: source
        });

        olMap = new ol.Map({
            layers: [layer],
            interactions: ol.interaction.defaults().extend([
                new ol.interaction.DragRotateAndZoom()
            ]),
            view: new ol.View({
              center: [0, 0],
              zoom: 4
            })
        });

        mapPanel = Ext.create('GeoExt.panel.Map', {
            title: 'GeoExt.component.OverviewMap Example',
            map: olMap,
            region: 'center',
            border: false
        });

        testbutton = Ext.create('Ext.Button', {
            glyph:0xf06a,
            renderTo: document.body
        });

        var testbutton2 = Ext.create('Ext.Button', {
            glyph:0xf1e3,
            renderTo: document.body
        });

        var testbutton3 = Ext.create('Ext.Button', {
            glyph:0xf05a,
            renderTo: document.body
        });

        var testbutton4 = Ext.create('Ext.Button', {
            glyph:0xf209,
            renderTo: document.body
        });

        var testbutton5 = Ext.create('Ext.Button', {
            glyph:0xf087,
            renderTo: document.body
        });

        circle_menu = Ext.create('GeoExt.component.CircleMenu', {
            roundButtons: true,
            mapPanel: mapPanel,
            items: [
                testbutton,
                testbutton2,
                testbutton3,
                testbutton4,
                testbutton5
            ]
        });

        description = Ext.create('Ext.panel.Panel', {
            contentEl: 'description',
            title: 'Description',
            flex: 1,
            border: false,
            bodyPadding: 5,
            autoScroll: true
        });

        Ext.create('Ext.Viewport', {
            layout: "border",
            items: [
                mapPanel,
                {
                    xtype: 'panel',
                    region: 'east',
                    width: 400,
                    border: false,
                    items: [
                        description,
                        {
                            xtype: 'button',
                            text: 'Activate Menu',
                            handler: function(){
                                circle_menu.enable();
                            }
                        }
                    ]
                }
            ]
        });
    }
});
