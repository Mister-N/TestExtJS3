/**
 * Created by Администратор on 21.06.16.
 */

Test.grid.Grid = function(config) {
    config = config || {};
    this.config = config;
    this._loadStore();

    Ext.applyIf(config, {


    });
    Test.grid.Grid.superclass.constructor.call(this,config);
    this._loadMenu(config);
    this.on('rowcontextmenu',this._showMenu,this);
    this.store.load({
        params: {
            start: config.pageStart || 0
            ,limit: config.hasOwnProperty('pageSize') ? config.pageSize :  20
        }
    });

};
Ext.extend(
    Test.grid.Grid
    ,Ext.grid.GridPanel
    ,{
        _loadStore:function() {
            if (this.config.url) {
                this.store =  new Ext.data.JsonStore({
                    root: 'results',
                    totalProperty: 'total',
                    //idProperty: 'id',
                    remoteSort: this.config.remoteSort || false,
                    storeId: this.config.storeId || Ext.id(),
                    autoDestroy: true,
                    url: this.config.url,
                    fields: this.config.fields,
                   // baseParams: this.config.baseParams || { action: this.config.action || 'getList' },
                    //,listeners:{
                    //    load: function(){
                    //        Ext.getCmp('modx-content').doLayout(); /* Fix layout bug with absolute positioning */
                    //    }
                    //}

                    //proxy: new Ext.data.ScriptTagProxy({
                    //    type: 'json',
                    //    //type: 'ajax',
                    //    method: 'GET',
                    //    url: '/resource',
                    //}),
                    addNew:function(){ // TODO дебажить надоть
                        var record =  Ext.data.Record.create(this.fields);
                        for(i in arguments)
                            this.add(new record(arguments[i]));
                    }
                });

            }
        },
        _loadMenu: function() {
            this.menu = new Ext.menu.Menu(this.config.menuConfig);
        },
        _showMenu:function(g,ri,e){
            e.stopEvent();
            e.preventDefault();
            this.menu.record = this.getStore().getAt(ri).data;
            if (!this.getSelectionModel().isSelected(ri)) {
                this.getSelectionModel().selectRow(ri);
            }
            this.menu.removeAll();
            if (this.getMenu) {
                var m = this.getMenu(g,ri,e);
                if (m && m.length && m.length > 0) {
                    this.addContextMenuItem(m);
                }
            }
            if ((!m || m.length <= 0) && this.menu.record.menu) {
                this.addContextMenuItem(this.menu.record.menu);
            }
            if (this.menu.items.length > 0) {
                this.menu.showAt(e.xy);
            }
        },
        //getMenu: function() {
        //    //return this.menu.record.menu;
        //    return this.menu;
        //}
        addContextMenuItem: function(items) {

                var l = items.length;
                for(var i = 0; i < l; i++) {
                    var options = items[i];
                    if (options == '-') {
                        this.menu.add('-');
                        continue;
                    }
                    var h = Ext.emptyFn;
                    if (options.handler) {
                        h = eval(options.handler);
                        if (h && typeof(h) == 'object' && h.xtype) {
                            h = this.loadWindow.createDelegate(this,[h],true);
                        }
                    } else {
                        h = function(itm) {

                            var o = itm.options;
                            var id = this.menu.record.id;
                            if (o.confirm) {
                                Ext.Msg.confirm('',o.confirm,function(e) {
                                    if (e == 'yes') {
                                        var act = Ext.urlEncode(o.params || {action: o.action});
                                        location.href = '?id='+id+'&'+act;
                                    }
                                },this);
                            } else {
                                var act = Ext.urlEncode(o.params || {action: o.action});
                                location.href = '?id='+id+'&'+act;
                            }
                        };
                    }

                    this.menu.add({
                        id: options.id || Ext.id()
                        ,text: options.text
                        ,scope: options.scope || this
                        ,options: options
                        ,handler: h
                    });
                }
            },
        getSelectionModel : function(){
            if(!this.selModel){
                this.selModel = new Ext.grid.RowSelectionModel(
                    this.disableSelection ? {selectRow: Ext.emptyFn} : null);
            }
            return this.selModel;
        },
        refresh: function() {
            this.getStore().reload();
        }
    }
);
//Ext.extend(Test.Panel,Ext.Panel);
Ext.reg('test-grid-panel',Test.grid.Grid);