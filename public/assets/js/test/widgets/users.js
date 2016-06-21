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
            {name: "userID", type: 'int'},
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
            text: '<i class="icon icon-plus">&nbsp;Создать',
            handler: this.createItem,
            scope: this
        }, '->',
        //    {
        //    xtype: 'textfield',
        //    name: 'query',
        //    width: 200,
        //    id: config.id + '-search-field',
        //    emptyText: _('booking_grid_search'),
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
    createItem:function(){
        Ext.Msg.alert('createItem','Hello, World!' );
    },
    updateUser: function (btn, e, row) {
        Ext.Msg.alert('updateUser','Hello, World!' );
        return ;
        if (typeof(row) != 'undefined') {
            this.menu.record = row.data;
        }
        else if (!this.menu.record) {
            return false;
        }
        var id = this.menu.record.id;

        MODx.Ajax.request({
            url: this.config.url,
            params: {
                action: 'mgr/item/get',
                id: id
            },
            listeners: {
                success: {
                    fn: function (r) {
                        var w = MODx.load({
                            xtype: 'booking-item-window-update',
                            id: Ext.id(),
                            record: r,
                            listeners: {
                                success: {
                                    fn: function () {
                                        this.refresh();
                                    }, scope: this
                                }
                            }
                        });
                        w.reset();
                        w.setValues(r.object);
                        w.show(e.target);
                    }, scope: this
                }
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
//Ext.extend(Test.Panel,Ext.Panel);
Ext.reg('test-users-grid', Test.UsersGrid);