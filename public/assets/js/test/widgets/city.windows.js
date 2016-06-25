/**
 * Created by Администратор on 25.06.16.
 */
Test.window.CreateCity = function (config) {
    config = config || {};
    config.id = config.id  || 'test-city-window-create';

    Ext.applyIf(config, {
        title: 'Добавить город.',
        width: 550,
        autoHeight: true,
        //url: test.config.connector_url,
        action: 'POST',
        fields: this.getFields(config),
        keys: [{
            key: Ext.EventObject.ENTER, shift: true, fn: function () {
                this.submit()
            }, scope: this
        }]
    });
    Test.window.CreateCity.superclass.constructor.call(this, config);
};
Ext.extend(Test.window.CreateCity, Test.Window, {

    getFields: function (config) {
        return [{
            xtype: 'textfield',
            fieldLabel: 'Имя.',
            name: 'name',
            id: config.id + '-name',
            anchor: '99%',
            allowBlank: false,
        },
        //    {
        //    xtype: 'textarea',
        //    fieldLabel: _('test_item_description'),
        //    name: 'description',
        //    id: config.id + '-description',
        //    height: 150,
        //    anchor: '99%'
        //}, {
        //    xtype: 'xcheckbox',
        //    boxLabel: _('test_item_active'),
        //    name: 'active',
        //    id: config.id + '-active',
        //    checked: true,
        //}
        ];
    }

});
Ext.reg('test-city-window-create', Test.window.CreateCity);


Test.window.UpdateCity = function (config) {
    config = config || {};
    if (!config.id) {
        config.id = 'test-item-window-update';
    }
    Ext.applyIf(config, {
        title: 'Обновить юзера',
        width: 550,
        autoHeight: true,
        action: 'PUT',
        fields: this.getFields(config),
        keys: [{
            key: Ext.EventObject.ENTER, shift: true, fn: function () {
                this.submit()
            }, scope: this
        }]
    });
    Test.window.UpdateCity.superclass.constructor.call(this, config);
};
Ext.extend(Test.window.UpdateCity, Test.Window, {

    getFields: function (config) {
        return [{
            xtype: 'hidden',
            name: 'id',
            id: config.id + '-id',
        }, {
            xtype: 'textfield',
            fieldLabel: 'Имя.',
            name: 'name',
            id: config.id + '-name',
            anchor: '99%',
            allowBlank: false,
        }];
    }

});
Ext.reg('test-city-window-update', Test.window.UpdateCity);