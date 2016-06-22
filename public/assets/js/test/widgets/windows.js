/**
 * Created by Администратор on 21.06.16.
 */
Test.window.CreateUser = function (config) {
    config = config || {};
    if (!config.id) {
        config.id = 'test-item-window-create';
    }
    Ext.applyIf(config, {
        title: 'Добавить юзера.',
        width: 550,
        autoHeight: true,
        //url: test.config.connector_url,
        action: 'create',
        fields: this.getFields(config),
        keys: [{
            key: Ext.EventObject.ENTER, shift: true, fn: function () {
                this.submit()
            }, scope: this
        }]
    });
    Test.window.CreateUser.superclass.constructor.call(this, config);
};
Ext.extend(Test.window.CreateUser, Test.Window, {

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
Ext.reg('test-user-window-create', Test.window.CreateUser);


Test.window.UpdateItem = function (config) {
    config = config || {};
    if (!config.id) {
        config.id = 'test-item-window-update';
    }
    Ext.applyIf(config, {
        title: 'Обновить юзера',
        width: 550,
        autoHeight: true,
        action: 'update',
        fields: this.getFields(config),
        keys: [{
            key: Ext.EventObject.ENTER, shift: true, fn: function () {
                this.submit()
            }, scope: this
        }]
    });
    Test.window.UpdateItem.superclass.constructor.call(this, config);
};
Ext.extend(Test.window.UpdateItem, Test.Window, {

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
Ext.reg('test-item-window-update', Test.window.UpdateItem);