/**
 * Created by Администратор on 21.06.16.
 */
Test.windowUser = function (config) {
    Test.windowUser.superclass.constructor.call(this, config);
};
Ext.extend(Test.windowUser, Test.Window, {
    _loadForm: function() {
        if (this.checkIfLoaded(this.config.record || null)) { return false; }

        var r = this.config.record;
        /* set values here, since setValue after render seems to be broken */
        if (this.config.fields) {
            var l = this.config.fields.length;
            console.log('this.config.fields',this.config.fields);
            for (var i=0;i<l;i++) {
                var f = this.config.fields[i];
                if(f.xtype == 'test-users-itemselector'){ // TODO сие костыль для того, чтобы получать id юзеров. По-хорошему надо контроллер править, но выкладка с окном у меня открыта, а выкладка с контроллером нет ))
                    if(r.responseText) {
                        id = Ext.decode(r.responseText).object.id;
                            f.user_id = id;
                    }
                    else
                        f.user_id = 0;
                }
                if (r[f.name]) {
                    if (f.xtype == 'checkbox' || f.xtype == 'radio') {
                        f.checked = r[f.name];
                    }
                    else {
                        f.value = r[f.name];
                    }
                }
            }
        }
        this.fp = this.createForm({
            url: this.config.url
            ,baseParams: this.config.baseParams || { actionObj: this.config.action || '' } // TODO параметр action может подхватываться, как экшн контроллера. Надо что-то придумать, чтобы небыло путаницы
            ,items: this.config.fields || []
        });
        var w = this;
        this.fp.getForm().items.each(function(f) {
            f.on('invalid', function(){
                w.doLayout();
            });
        });
        this.renderForm();
    }
});
Test.window.CreateUser = function (config) {
    config = config || {};
    config.id = config.id || 'test-users-window-create';

    Ext.applyIf(config, {
        title: 'Добавить юзера.',
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
    Test.window.CreateUser.superclass.constructor.call(this, config);
};
Ext.extend(Test.window.CreateUser, Test.windowUser, {

    getFields: function (config) {
        return [{
            xtype: 'textfield',
            fieldLabel: 'Имя.',
            name: 'name',
            id: config.id + '-name',
            anchor: '99%',
            allowBlank: false,
        }
        , {
            xtype: 'test-combo-users-qualification',
            fieldLabel: 'Квалификация',
            name: 'qualification_id',
            id: config.id + '-qualification_id',
            anchor: '99%',
            allowBlank: false,
        },  {
                xtype: 'test-users-itemselector',
                cls: 'main-wrapper',
                fieldLabel: 'Города',
                id: config.id + '-itemselector',
                anchor: '99%',
            }
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


Test.window.UpdateUser = function (config) {
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
    Test.window.UpdateUser.superclass.constructor.call(this, config);
};
Ext.extend(Test.window.UpdateUser, Test.windowUser, {

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
        }
            , {
                xtype: 'test-combo-users-qualification',
                fieldLabel: 'Квалификация',
                name: 'qualification_id',
                id: config.id + '-qualification_id',
                anchor: '99%',
                allowBlank: false,
            },
            {
                xtype: 'test-users-itemselector',
                cls: 'main-wrapper',
                fieldLabel: 'Города',
                id: config.id + '-itemselector',
                anchor: '99%',
            }
        ];
    }

});
Ext.reg('test-item-window-update', Test.window.UpdateUser);