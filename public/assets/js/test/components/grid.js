/**
 * Created by Администратор on 21.06.16.
 */

//var myData = [
//    [
//        1,
//        "Вася",
//        "Иванов",
//        '10/08/1991',
//        'vasiv@mail.ru',
//        false
//    ], [
//        2,
//        "Петя",
//        "Федоров",
//        '03/08/1993',
//        'petfed@yandex.ru',
//        true
//    ], [
//        3,
//        "Вова",
//        "Кузнецов",
//        '11/07/1989',
//        'vok@mail.ru',
//        false
//    ], [
//        4,
//        "Саша",
//        "Сидоров",
//        '05/08/1991',
//        'vvvs@mail.ru',
//        true
//    ]
//];

Test.grid.Grid = function(config) {
    config = config || {};
    this.config = config;
    this._loadStore();

    Ext.applyIf(config, {


    });
    Test.grid.Grid.superclass.constructor.call(this,config);

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
                this.store.load({params:{start:0, limit:25}});

            }
        }
    }
);
//Ext.extend(Test.Panel,Ext.Panel);
Ext.reg('test-grid-panel',Test.grid.Grid);