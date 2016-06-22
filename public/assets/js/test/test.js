var Test = function(config) {
    config = config || {};
    Test.superclass.constructor.call(this,config);
};
Ext.extend(Test,Ext.Component,{
    page:{},window:{},grid:{},tree:{},panel:{},combo:{},config: {},view: {}, utils: {},msg:{},form: {}
});

Ext.reg('test',Test);

Test = new Test();



