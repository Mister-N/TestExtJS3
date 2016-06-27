
Test.Tabs = function(config) {
    config = config || {};
    Ext.applyIf(config,{
        enableTabScroll: true
        ,layoutOnTabChange: true
        ,plain: true
        ,deferredRender: true
        ,hideMode: 'offsets'
        ,defaults: {
            autoHeight: true
            ,hideMode: 'offsets'
            ,border: true
            ,autoWidth: true
            ,bodyCssClass: 'tab-panel-wrapper'
        }
        ,activeTab: 0
        ,border: false
        ,autoScroll: true
        ,autoHeight: true
        ,cls: 'test-tabs'
    });
    Test.Tabs.superclass.constructor.call(this,config);
    this.config = config;
};
Ext.extend(Test.Tabs,Ext.TabPanel);
Ext.reg('test-tabs',Test.Tabs);

Test.panel.Home = function (config) {
    config = config || {};
    Ext.apply(config, {

        baseCls: 'test-formpanel',
        renderTo: 'test',
        layout: 'anchor',
        /*
         stateful: true,
         stateId: 'test-panel-home',
         stateEvents: ['tabchange'],
         getState:function() {return {activeTab:this.items.indexOf(this.getActiveTab())};},
         */
        hideMode: 'offsets',
        items: [{
            html: '<h1> Большой заголовок!</h1>',
            cls: '',
            style: {margin: '15px 0;padding:10px'}
        },
            {
            xtype: 'test-tabs',
            defaults: {border: false, autoHeight: true},
            border: true,
            hideMode: 'offsets',
            items: [{
                title: 'Юзеры',
                layout: 'anchor',
                items: [{
                    html: '<h2> Наши пользователи</h2> ',
                    cls: 'panel-desc',
                }
                 ,{
                    xtype: 'test-users-grid',
                    cls: 'main-wrapper',
                }
                ]
            }
             ,{
                title: 'Образование',
                layout: 'anchor',
                items: [{
                            html: '<h2> Варианты образования наших плюзователей.</h2> ',
                            cls: 'panel-desc',
                        }
                         ,{
                            xtype: 'test-qualification-grid',
                            cls: 'main-wrapper',
                        }
                    ]
            }
             ,{
                title: 'Города',
                layout: 'anchor',
                items: [{
                            html: '<h2> Города проживания наших плюзователей.</h2> ',
                            cls: 'panel-desc',
                        }
                         ,{
                            xtype: 'test-city-grid',
                            cls: 'main-wrapper',
                        }
                    ]
            }

            ]
        }
        ]
    });
    Test.panel.Home.superclass.constructor.call(this, config);
};
Ext.extend(Test.panel.Home, Ext.Panel);
Ext.reg('test-panel-home', Test.panel.Home);

Test.Home = function(config) {
    config = config || {};
    Ext.applyIf(config,{
        components: [{
            xtype: 'test-panel-home'
            //,renderTo: 'test-panel-home-div'
            ,renderTo: 'test'
        }]
    });
    Test.Home.superclass.constructor.call(this,config);
};
Ext.extend(Test.Home,Ext.Component);
Ext.reg('test-page-home',Test.Home);


