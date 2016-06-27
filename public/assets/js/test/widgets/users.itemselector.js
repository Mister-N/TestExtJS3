/**
 * Created by Администратор on 20.06.16.
 */
Test.UsersItemSelector = function(config) {
    config = config || {};
    config.id = config.id || 'test-itemselector-users';

    Ext.applyIf(config, {
        //name: 'itemselector',
        user_id:config.user_id || '1',
        fieldLabel: 'ItemSelector',
        imagePath:'/assets/js/extjs-3.4.1.1/examples/ux/images/',
        fromStoreUrl:'/resource/city',
        toMultiselectStoreUrl:'/resource/users-city',
        fromFields:['id','name'],

    });
    console.log('config id :',config.user_id);

    this.config = config;
    this.loadStoreFrom();
    this.loadStoreTo();
    config.multiselects = [{
        width: 250,
        height: 200,
        store: this.fromStore,
        displayField: 'name',
        valueField: 'id'
    },{
        width: 250,
        height: 200,
        store: this.ToStore,
        displayField: 'name',
        valueField: 'id',
        tbar:[{
            text: 'clear',
            handler:this.clearAction()
        }]
    }];
    Test.UsersItemSelector.superclass.constructor.call(this,config);
};
Ext.extend(Test.UsersItemSelector,Ext.ux.ItemSelector,{
    initComponent:function(){
        Test.UsersItemSelector.superclass.initComponent.call(this);
    },

    onRender: function(ct, position) {
        Test.UsersItemSelector.superclass.onRender.call(this, ct, position);

    },
    afterRender: function(){
        Test.UsersItemSelector.superclass.afterRender.call(this);
    },
    loadStoreFrom:function() {

        if (this.config.fromStoreUrl) {
            console.log(this.config.fromStoreUrl);

            this.fromStore =  new Ext.data.JsonStore({
                root: 'results',
                totalProperty: 'total',
                //idProperty: 'id',
                remoteSort: this.config.remoteSort || false,
                storeId: this.config.storeId || Ext.id(),
                autoDestroy: true,
                url: '/resource/city',
                fields: this.config.fromFields,
                // baseParams: this.config.baseParams || { action: this.config.action || 'getList' },
                //,listeners:{
                //    load: function(){
                //        Ext.getCmp('modx-content').doLayout(); /* Fix layout bug with absolute positioning */
                //    }
                //}


            });
            this.fromStore.load({});
        }
        else console.log('бидища!')
    }
    ,loadStoreTo:function() {

        if (this.config.fromStoreUrl) {
            console.log(this.config.user_id);

            this.ToStore =  new Ext.data.JsonStore({
                root: 'results',
                totalProperty: 'total',
                //idProperty: 'id',
                remoteSort: this.config.remoteSort || false,
                storeId: this.config.storeId || Ext.id(),
                autoDestroy: true,
                url: '/resource/users-city',
                method:'GET',
                fields: this.config.fromFields,
                baseParams: { user_id: this.config.user_id },
               //,listeners:{
                //    load: function(){
                //        Ext.getCmp('modx-content').doLayout(); /* Fix layout bug with absolute positioning */
                //    }
                //}


            });
            this.ToStore.load({});
        }
        else console.log('бидища!')
    },
    reset: function(){

        if(!this.hiddenField ){
            console.log('!this.hiddenField');
            return;
        }

        range = this.toMultiselect.store.getRange();
        this.toMultiselect.store.removeAll();
        this.fromMultiselect.store.add(range);
        var si = this.fromMultiselect.store.sortInfo;
        if (si){
            this.fromMultiselect.store.sort(si.field, si.direction);
        }
        this.valueChanged(this.toMultiselect.store);
    },
    fromTo : function() {
        var selectionsArray = this.fromMultiselect.view.getSelectedIndexes();
        var records = [];
        if (selectionsArray.length > 0) {
            for (var i=0; i<selectionsArray.length; i++) {
                record = this.fromMultiselect.view.store.getAt(selectionsArray[i]);
                records.push(record);
            }
            console.log('records',records);
            console.log('!this.allowDup',!this.allowDup);

            if(!this.allowDup)selectionsArray = [];
            for (var i=0; i<records.length; i++) {
                record = records[i];
                if(this.allowDup){
                    var x=new Ext.data.Record();
                    record.id=x.id;
                    delete x;
                    this.toMultiselect.view.store.add(record);
                    console.log('add record',record);
                }else{
                    this.fromMultiselect.view.store.remove(record);
                    this.toMultiselect.view.store.add(record);
                    selectionsArray.push((this.toMultiselect.view.store.getCount() - 1));
                }
            }
        }
        this.toMultiselect.view.refresh();
        this.fromMultiselect.view.refresh();
        var si = this.toMultiselect.store.sortInfo;
        if(si){
            this.toMultiselect.store.sort(si.field, si.direction);
        }
        this.toMultiselect.view.select(selectionsArray);
    },
    clearAction:function(){
       // isForm.getForm().findField('itemselector').reset();
    }

});
Ext.reg('test-users-itemselector', Test.UsersItemSelector);