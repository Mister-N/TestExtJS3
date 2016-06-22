/**
 * Created by Администратор on 20.06.16.
 */
Test.UsersGrid = function(config) {
    config = config || {};
    Ext.applyIf(config, {
        title: 'Пользователи',
        height: 200,
        //autoHeight: true,
        width: '100%',
        fields: [
            {name: "id", type: 'int'},
            {name: "name", type: 'string'},
            {name: "surname", type: 'string'},
            {name: "date",type: 'date', dateFormat: 'n/j h:ia'},
            {name: "email", type: 'string'},
            {name:  "married", type: 'bool'},
            {name:  "actions"}
        ],
        root: 'results',
        totalProperty: 'total',
        idProperty: 'id',
        remoteSort: true,
        url: '/resource',
        columns: [{
            header: 'Имя',
            dataIndex: 'name'
        }, {
            header: 'Фамилия',
            dataIndex: 'surname'
        }, {
            header: 'Дата рождения',
            dataIndex: 'date',
            // xtype:'datecolumn',
            //format: 'd/m/Y',
            // flex:1
        }, {
            header: 'E-mail',
            dataIndex: 'email',
            //  flex:1
        }, {
            header: 'Женат/Замужем',
            dataIndex: 'married',
            // flex:1
        }],
        tbar: this.getTopBar(config),
        listeners: {
            rowDblClick: function (grid, rowIndex, e) {
                var row = grid.store.getAt(rowIndex);
                this.updateUser(grid, e, row);
            }
        },
        renderTo: 'test'
        //renderTo: Ext.getBody()
    });
    Test.UsersGrid.superclass.constructor.call(this,config);
    this.config = config;
};
Ext.extend(Test.UsersGrid,Test.grid.Grid,{
    windows: {},
    getMenu: function (grid, rowIndex) {
        var ids = this._getSelectedIds();

        var row = grid.getStore().getAt(rowIndex);
        var menu = Test.utils.getMenu(row.data['actions'], this, ids);
        this.addContextMenuItem(menu);
    },
    getTopBar: function (config) {
        return [{
            text: '<i class="icon icon-plus">&nbsp;</i>Создать',
            handler: this.createItem,
            scope: this
        }, '->',
        //    {
        //    xtype: 'textfield',
        //    name: 'query',
        //    width: 200,
        //    id: config.id + '-search-field',
        //    emptyText: _('test_grid_search'),
        //    listeners: {
        //        render: {
        //            fn: function (tf) {
        //                tf.getEl().addKeyListener(Ext.EventObject.ENTER, function () {
        //                    this._doSearch(tf);
        //                }, this);
        //            }, scope: this
        //        }
        //    }
        //},
        //    {
        //    xtype: 'button',
        //    id: config.id + '-search-clear',
        //    text: '<i class="icon icon-times"></i>',
        //    listeners: {
        //        click: {fn: this._clearSearch, scope: this}
        //    }
        //}
         ];
    },
    createItem: function (btn, e) {
        var w = Ext.ComponentMgr.create({
            xtype: 'test-user-window-create',
            id: Ext.id(),
            url : this.config.url,
            listeners: {
                success: {
                    fn: function () {
                        this.refresh();
                    }, scope: this
                }
            }
        });
        w.reset();
        w.setValues({active: true});
        w.show(e.target);
    },
    updateUser: function (btn, e, row) {

        if (typeof(row) != 'undefined') {
            this.menu.record = row.data;
        }
        else if (!this.menu.record) {
            return false;
        }
        var id = this.menu.record.id;
        console.log('id',id);
        console.log(' this.menu.record', this.menu.record);

        var salf = this;
        Ext.Ajax.request({
            url: this.config.url,
            method: 'GET',
            params: {
                actionObj: 'get',
                id: id
            },
            success: function(r) {
                console.log('success salf',salf);

                 var w = Ext.ComponentMgr.create({
                    xtype: 'test-item-window-update',
                    url : salf.config.url,
                    id: Ext.id(),
                    record: r,
                    listeners: {
                        success: {
                            fn: function () {
                                console.log('this',this);
                                this.refresh();
                            }, scope: salf
                        }
                    }
                });
                w.reset();
                w.setValues(Ext.decode(r.responseText).object);
                w.show(e.target);
            }
        });

    },
    _getSelectedIds: function () {
        var ids = [];
        var selected = this.getSelectionModel().getSelections();

        for (var i in selected) {
            if (!selected.hasOwnProperty(i)) {
                continue;
            }
            ids.push(selected[i]['id']);
        }

        return ids;
    },

});
Ext.reg('test-users-grid', Test.UsersGrid);