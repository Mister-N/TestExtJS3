/**
 * Created by Администратор on 21.06.16.
 */
Test.form.Handler = function(config) {
    config = config || {};
    Test.form.Handler.superclass.constructor.call(this,config);
};
Ext.extend(Test.form.Handler,Ext.Component,{
    fields: [],
    handle: function(o,s,r) {
        r = Ext.decode(r.responseText);
        if (!r.success) {
            this.showError(r.message);
            return false;
        }
        return true;
    }

    ,highlightField: function(f) {
        if (f.id !== undefined && f.id !== 'forEach' && f.id !== '') {
            var fld = Ext.get(f.id);
            if (fld && fld.dom) {
                fld.dom.style.border = '1px solid red';
            }
            var ef = Ext.get(f.id+'_error');
            if (ef) { ef.innerHTML = f.msg; }
            this.fields.push(f.id);
        }
    }

    ,unhighlightFields: function() {
        for (var i=0;i<this.fields.length;i=i+1) {
            Ext.get(this.fields[i]).dom.style.border = '';
            var ef = Ext.get(this.fields[i]+'_error');
            if (ef) { ef.innerHTML = ''; }
        }
        this.fields = [];
    }

    ,errorJSON: function(e) {
        if (e === '') { return this.showError(e); }
        if (e.data && e.data !== null) {
            for (var p=0;p<e.data.length;p=p+1) {
                this.highlightField(e.data[p]);
            }
        }

        this.showError(e.message);
        return false;
    }

    ,errorExt: function(r,frm) {
        this.unhighlightFields();
        if (r && r.errors !== null && frm) {
            frm.markInvalid(r.errors);
        }
        if (r && r.message !== undefined && r.message !== '') {
            this.showError(r.message);
        } else {
            //Test.msg.hide();
            Ext.Msg.alert('Ошибка','Что-то пошло не так!' );// TODO это надо доума довесть
        }
        return false;
    }

    ,showError: function(e) {
        if (e === '') {
            Test.msg.hide();
        } else {
            Test.msg.alert('Ошибка!',e,Ext.emptyFn);
        }
    }

    ,closeError: function() { MODx.msg.hide(); }
});
Ext.reg('test-form-handler',Test.form.Handler);
Test.Msg = function(config) {
    config = config || {};
    Test.Msg.superclass.constructor.call(this,config);
    this.addEvents({
        'success': true
        ,'failure': true
        ,'cancel': true
    });
    Ext.MessageBox.minWidth = 200;
};
Ext.extend(Test.Msg,Ext.Component,{ // TODO дописать эту штуку.

});
Ext.reg('test-msg',Test.Msg);


Ext.onReady(function() {
   // Test.util.JSONReader = Test.load({ xtype: 'modx-json-reader' });
    Test.form.Handler = Ext.ComponentMgr.create({ xtype: 'test-form-handler' });
    //Test.Msg = Test.Msg({ xtype: 'modx-msg' }); // TODO Очень тягомотная штука.
});