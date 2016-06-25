/**
 * Created by Администратор on 25.06.16.
 */

Test.combo.ComboBox = function(config,getStore) {
    config = config || {};
    Ext.applyIf(config,{
        displayField: 'name'
        ,valueField: 'id'
        ,triggerAction: 'all'
        ,fields: ['id','name']
        ,baseParams: {
           // actionObj: 'getList'
        }
        ,width: 150
        ,listWidth: 300
        ,editable: false
        ,resizable: true
        ,typeAhead: false
        ,forceSelection: true
        ,minChars: 3
        ,cls: 'test-combo'
    });
    Ext.applyIf(config,{
        store: new Ext.data.JsonStore({
            url: config.url
            ,root: 'results'
            ,totalProperty: 'total'
            ,fields: config.fields
            ,errorReader: Test.util.JSONReader
            ,baseParams: config.baseParams || {}
            ,remoteSort: config.remoteSort || false
            ,autoDestroy: true
        })
    });
    if (getStore === true) {
        config.store.load();
        return config.store;
    }
    Test.combo.ComboBox.superclass.constructor.call(this,config);
    this.config = config;
    return this;
};
Ext.extend(Test.combo.ComboBox,Ext.form.ComboBox);
Ext.reg('test-combo',Test.combo.ComboBox);