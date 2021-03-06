/*
 * File: app/view/CarListings.js
 *
 * This file was generated by Sencha Architect version 2.2.0.
 * http://www.sencha.com/products/architect/
 *
 * This file requires use of the Ext JS 4.1.x library, under independent license.
 * License of Sencha Architect does not include license for Ext JS 4.1.x. For more
 * details see http://www.sencha.com/license or contact license@sencha.com.
 *
 * This file will be auto-generated each and everytime you save your project.
 *
 * Do NOT hand edit this file.
 */

Ext.define('MyApp.view.CarListings', {
    extend: 'Ext.panel.Panel',

    frame: true,
    height: 773,
    width: 518,
    layout: {
        align: 'stretch',
        type: 'vbox'
    },
    title: 'Car Listing',

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'gridpanel',
                    flex: 1,
                    store: 'CarDataStore',
                    listeners: {
                        select: {
                            fn: me.onGridpanelSelect,
                            scope: me
                        }
                    },
                    columns: [
                        {
                            xtype: 'gridcolumn',
                            dataIndex: 'manufacturer',
                            text: 'Manufacturer'
                        },
                        {
                            xtype: 'gridcolumn',
                            dataIndex: 'model',
                            text: 'Model'
                        },
                        {
                            xtype: 'gridcolumn',
                            dataIndex: 'price',
                            text: 'Price'
                        },
                        {
                            xtype: 'gridcolumn',
                            dataIndex: 'wiki',
                            text: 'Wiki'
                        },
                        {
                            xtype: 'gridcolumn',
                            dataIndex: 'img',
                            text: 'Img'
                        },
                        {
                            xtype: 'gridcolumn',
                            dataIndex: 'quality',
                            text: 'Quality'
                        }
                    ]
                },
                {
                    xtype: 'panel',
                    flex: 1,
                    margins: '5 0 0 0',
                    itemId: 'detailPanel',
                    tpl: [
                        '<img src="data/{img}" style="float: right" />',
                        'Manufacturer: {manufacturer}<br>',
                        'Model: <a href="{wiki}" target="_blank">{model}</a><br>',
                        'Price: {price:usMoney}<br>'
                    ]
                },
                {
                    xtype: 'panel',
                    flex: 1,
                    margins: '5 0 0 0',
                    layout: {
                        type: 'fit'
                    },
                    items: [
                        {
                            xtype: 'chart',
                            itemId: 'qualityChart',
                            animate: true,
                            insetPadding: 20,
                            store: 'CarChartStore',
                            axes: [
                                {
                                    type: 'Category',
                                    fields: [
                                        'name'
                                    ],
                                    title: 'Quality',
                                    position: 'bottom'
                                },
                                {
                                    type: 'Numeric',
                                    fields: [
                                        'rating'
                                    ],
                                    majorTickSteps: 4,
                                    position: 'left',
                                    title: 'Score',
                                    maximum: 5,
                                    minimum: 0
                                }
                            ],
                            series: [
                                {
                                    type: 'column',
                                    label: {
                                        display: 'insideEnd',
                                        field: 'rating',
                                        color: '#333',
                                        'text-anchor': 'middle'
                                    },
                                    xField: 'name',
                                    yField: [
                                        'rating'
                                    ]
                                }
                            ]
                        }
                    ]
                }
            ]
        });

        me.callParent(arguments);
    },

    onGridpanelSelect: function(rowmodel, record, index, eOpts) {
        // grab a reference to the detailPanel via itemId
        // the # in front of the id indicates that we would like to grab a reference by
        var detailPanel = this.child('#detailPanel');
        // update the detailPanel with data
        // this will trigger the tpl to become updates
        detailPanel.update(record.data);

        // grab a reference to the qualityChart, notice we use down here instead of child
        // because down will go down the container hierarchy at any depth and child will
        // only retrieve direct children
        var chart = this.down('#qualityChart');
        // get the quality field out of this record
        var qualityData = record.get('quality');
        chart.store.loadData(qualityData);
    }

});