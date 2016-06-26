/**
 * Created by Администратор on 20.06.16.
 */
Test.UsersItemSelector = function(config) {
    config = config || {};
    config.id = config.id || 'test-itemselector-users';

    var ds = new Ext.data.ArrayStore({
        data: [
            ['1', 'One'], ['2', 'Two'], ['3', 'Three'], ['4', 'Four'], ['5', 'Five']
        ],
        fields: ['value','text'],
        sortInfo: {
            field: 'value',
            direction: 'ASC'
        }
    });


    Ext.applyIf(config, {
        //name: 'itemselector',
        fieldLabel: 'ItemSelector',
        imagePath:'/assets/js/extjs-3.4.1.1/examples/ux/images/',
        fromStoreUrl:'/resource/city',
        toMultiselectStoreUrl:'/resource/users-city',
        fromFields:['id','name'],

    });

    this.config = config;
    this.loadStoreFrom();
    this.fromStore.load({});
    config.multiselects = [{
        width: 250,
        height: 200,
        store: this.fromStore,
        displayField: 'name',
        valueField: 'id'
    },{
        width: 250,
        height: 200,
        store: [],
        tbar:[{
            text: 'clear',
            handler:function(){
                isForm.getForm().findField('itemselector').reset();
            }
        }]
    }];
    Test.UsersItemSelector.superclass.constructor.call(this,config);
};
Ext.extend(Test.UsersItemSelector,Ext.ux.ItemSelector,{
    initComponent:function(){
        console.log('initComponent ItemSelector');
        Test.UsersItemSelector.superclass.initComponent.call(this);
    },

    onRender: function(ct, position) {
        console.log('onRender ItemSelector');
        Test.UsersItemSelector.superclass.onRender.call(this, ct, position);
        console.log('onRender  this.el',this.el);
    },
    afterRender: function(){
        Test.UsersItemSelector.superclass.afterRender.call(this);
        console.log('afterRender ItemSelector');
        console.log('afterRender this.el',this.el)
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

        }
        else console.log('бидища!')
    },
});
Ext.reg('test-users-itemselector', Test.UsersItemSelector);