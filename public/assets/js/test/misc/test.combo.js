Test.combo.Qualification = function(config) {
    config = config || {};
    Ext.applyIf(config,{
        fields: ['id','name']
        ,url: '/resource/qualification'
        //,baseParams: { action: 'mgr/stream/getlist' }
        ,name: 'qualification_id'
        ,hiddenName: 'qualification_id'
        ,displayField: 'name'
        ,valueField: 'qualification_id'
        //,editable: true
        ,anchor: '99%'
        ,pageSize: 10  // TODO ЭТА ШТУКА ДЕЛАЕТ НИШТЯК

    });
    Test.combo.Qualification.superclass.constructor.call(this,config);
};
Ext.extend(Test.combo.Qualification,Test.combo.ComboBox);
Ext.reg('test-combo-users-qualification',Test.combo.Qualification);