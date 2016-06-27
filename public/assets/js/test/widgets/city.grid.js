/**
 * Created by Администратор on 25.06.16.
 */
Test.CityGrid = function(config) {
    config = config || {};
    config.id = config.id || 'test-grid-city';
    Ext.applyIf(config, {
        title: 'Образование',
        viewConfig: {
            forceFit: true,
            enableRowBody: true,
            autoFill: true,
            showPreview: true,
            scrollOffset: 0,
            getRowClass: function (rec, ri, p) {
                return !rec.data.active
                    ? 'test-city-row-disabled'
                    : '';
            }
        },
        fields: this.getFields(),
        root: 'results',
        totalProperty: 'total',
        remoteSort: true,
        url: '/resource/city',
        columns: this.getColumns(),
        tbar: this.getTopBar(config),
        sm: new Ext.grid.CheckboxSelectionModel(),
        listeners: {
            rowDblClick: function (grid, rowIndex, e) {
                var row = grid.store.getAt(rowIndex);
                this.updateCity(grid, e, row);
            }
        },
        paging: true,
        remoteSort: true,
        autoHeight: true,
    });
    Test.CityGrid.superclass.constructor.call(this,config);
    this.config = config;
};
Ext.extend(Test.CityGrid,Test.grid.Grid,{
    windows: {},
    getFields: function (config) {
        return  ["id","name",'actions'];
    },

    getColumns: function (config) {
        return [{
            header: 'id',
            dataIndex: 'id',
            sortable: true,
            width: 70
        }, {
            header: 'Название',
            dataIndex: 'name',
            sortable: true,
            width: 200,
        }
        //,{
        //    header: _('booking_grid_actions'),
        //    dataIndex: 'actions',
        //    renderer: Test.utils.renderActions,
        //    sortable: false,
        //    width: 100,
        //    id: 'actions'
        //}
        ];
    },
    getMenu: function (grid, rowIndex) {
        var ids = this._getSelectedIds();

        var row = grid.getStore().getAt(rowIndex);
        var menu = Test.utils.getMenu(row.data['actions'], this, ids);
        console.log('menu',row.data);
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
        //    emptyText: 'Введите название э... Вида образования.',
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
            xtype: 'test-city-window-create',
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
    updateCity: function (btn, e, row) {

        if (typeof(row) != 'undefined') {
            this.menu.record = row.data;
        }
        else if (!this.menu.record) {
            return false;
        }
        var id = this.menu.record.id;

        Ext.Ajax.request({
            url: this.config.url,
            method: 'GET',
            params: {
                actionObj: 'get',
                id: id
            },
            scope: this,
            success: function(r) {

                 var w = Ext.ComponentMgr.create({
                    xtype: 'test-city-window-update',
                    url : this.config.url,
                    id: Ext.id(),
                    record: r,
                    scope: this,
                    listeners: {
                        success: {
                            fn: function () {
                                console.log('this',this);
                                this.refresh();
                            }, scope: this
                        }
                    }
                });
                w.reset();
                w.setValues(Ext.decode(r.responseText).object);
                w.show(e.target);
            }
        });

    },
    removeCity: function (act, btn, e) {
        var ids = this._getSelectedIds();
        if (!ids.length) {
            return false;
        }
        Test.msg.confirm({
            title: ids.length > 1
                ? 'Удалить этих пользователей?'
                : 'Удалить этого пользователя?',
            text: ids.length > 1
                ? 'Вы действительно хотите удалить всех этих пользователей?'
                : 'Вы действительно хотите удалить этого пользователя?',
            url: this.config.url,
            params: {
                actionObj: 'DELETE',
                ids: Ext.util.JSON.encode(ids),
            },
            listeners: {
                success: {
                    fn: function (r) {
                        this.refresh();
                    }, scope: this
                }
            }
        });
        return true;
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
    _doSearch: function (tf, nv, ov) {
        this.getStore().baseParams.query = tf.getValue();
       // this.getBottomToolbar().changePage(1);
        this.refresh();
    },

    _clearSearch: function (btn, e) {
        this.getStore().baseParams.query = '';
        Ext.getCmp(this.config.id + '-search-field').setValue('');
       // this.getBottomToolbar().changePage(1);
        this.refresh();
    }

});
Ext.reg('test-city-grid', Test.CityGrid);