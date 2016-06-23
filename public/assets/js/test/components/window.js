/**
 * Created by Администратор on 21.06.16.
 */
Test.Window = function(config) {
    config = config || {};
    Ext.applyIf(config,{
        modal: false
        ,layout: 'auto'
        ,closeAction: 'hide'
        ,shadow: true
        ,resizable: true
        ,collapsible: true
        ,maximizable: true
        // ,autoHeight: true // this messes up many windows on smaller screens (e.g. too much height), ex. macbook air 11"
        ,autoHeight: false
        ,autoScroll: true
        ,allowDrop: true
        ,width: 400
        ,cls: 'test-window'
        ,buttons: [{
            text: config.cancelBtnText || 'Закрыть'
            ,scope: this
            ,handler: function() { config.closeAction !== 'close' ? this.hide() : this.close(); }
        },{
            text: config.saveBtnText || 'Сохранить'
            ,cls: 'primary-button'
            ,scope: this
            ,handler: this.submit
        }]
        ,record: {}
        ,keys: [{
            key: Ext.EventObject.ENTER
            ,fn: this.submit
            ,scope: this
        }]
    });
    Test.Window.superclass.constructor.call(this,config);
    this.config = config;
    this._loadForm();

};
Ext.extend(Test.Window,Ext.Window,{
    _loadForm: function() {
        if (this.checkIfLoaded(this.config.record || null)) { return false; }

        var r = this.config.record;
        /* set values here, since setValue after render seems to be broken */
        if (this.config.fields) {
            var l = this.config.fields.length;
            for (var i=0;i<l;i++) {
                var f = this.config.fields[i];
                if (r[f.name]) {
                    if (f.xtype == 'checkbox' || f.xtype == 'radio') {
                        f.checked = r[f.name];
                    } else {
                        f.value = r[f.name];
                    }
                }
            }
        }
        this.fp = this.createForm({
            url: this.config.url
            ,baseParams: this.config.baseParams || { actionObj: this.config.action || '' } // TODO параметр action может подхватываться, как экшн контроллера. Надо что-то придумать, чтобы небыло путаницы
            ,items: this.config.fields || []
        });
        var w = this;
        this.fp.getForm().items.each(function(f) {
            f.on('invalid', function(){
                w.doLayout();
            });
        });
        this.renderForm();
    }
    ,createForm: function(config) {
        Ext.applyIf(this.config,{
            formFrame: true
            ,border: false
            ,bodyBorder: false
            ,autoHeight: true
        });
        config = config || {};
        Ext.applyIf(config,{
            labelAlign: this.config.labelAlign || 'top'
            ,labelWidth: this.config.labelWidth || 100
            ,labelSeparator: this.config.labelSeparator || ''
            ,frame: this.config.formFrame
            ,border: this.config.border
            ,bodyBorder: this.config.bodyBorder
            ,autoHeight: this.config.autoHeight
            ,anchor: '100% 100%'
            //,errorReader: MODx.util.JSONReader
            ,defaults: this.config.formDefaults || {
                msgTarget: this.config.msgTarget || 'under'
            }
            ,url: this.config.url
            ,baseParams: this.config.baseParams || {}
            ,fileUpload: this.config.fileUpload || false
        });
        return new Ext.FormPanel(config);
    }
    ,checkIfLoaded: function(r) {
        r = r || {};
        if (this.fp && this.fp.getForm()) { /* so as not to duplicate form */
            this.fp.getForm().reset();
            this.fp.getForm().setValues(r);
            return true;
        }
        return false;
    }
    ,setValues: function(r) {
        if (r === null) { return false; }
        this.fp.getForm().setValues(r);
    }
    ,reset: function() {
        this.fp.getForm().reset();
    }
    ,renderForm: function() {
        this.add(this.fp);
    }
    ,submit: function(close) {
    close = close === false ? false : true;
    var f = this.fp.getForm();
    if (f.isValid() && this.fireEvent('beforeSubmit',f.getValues())) {
        f.submit({
            waitMsg: 'Сохраняем'
            ,scope: this
            ,failure: function(frm,a) {
                if (this.fireEvent('failure',{f:frm,a:a})) {
                    Test.form.Handler.errorExt(a.result,frm);
                }
                this.doLayout();
            }
            ,success: function(frm,a) {
                if (this.config.success) {
                    Ext.callback(this.config.success,this.config.scope || this,[frm,a]);
                }
                this.fireEvent('success',{f:frm,a:a});
                if (close) { this.config.closeAction !== 'close' ? this.hide() : this.close(); }
                this.doLayout();
            }
        });
    }
}

});
Ext.reg('test-window',Test.Window);

