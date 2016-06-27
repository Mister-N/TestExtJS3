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
            // TODO это надо доума довесть
            Test.msg.alert('Ошибка!','Что-то пошло не так!',Test.msg.hide(),this);
            //Test.msg.hide();
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

    ,closeError: function() { Test.msg.hide(); }
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
Ext.extend(Test.Msg,Ext.Component,{ // TODO очень сие спорная штука, стоит или нет её сюда тащить. Да, я думал, что она ненужна и Ext.Msg.alert вполне хватает, но решил все-таки нехай будет.
    confirm: function(config) {
        this.purgeListeners();
        if (config.listeners) {
            for (var i in config.listeners) {
                var l = config.listeners[i];
                this.addListener(i,l.fn,l.scope || this,l.options || {});
            }
        }
        Ext.Msg.confirm(config.title || 'Предупреждение!',config.text,function(e) { // почему же сразу Ext.msg?
            if (e == 'yes') {

                Ext.Ajax.request({ // или все-таки сделать Test.Ajax.request ???
                    url: config.url,
                    params: config.params || {},
                    scope: this,
                    success: function(r) {
                        this.fireEvent('success',r);

                    }
                    ,listeners: {
                        'success': {
                            fn: function (r) {
                                console.log('success');
                                this.fireEvent('success', r);
                            }, scope: this
                        }
                        , 'failure': {
                            fn: function (r) {
                                console.log('failure');
                                return this.fireEvent('failure', r);
                            }, scope: this
                        }
                    }

                });

    } else {
        this.fireEvent('cancel',config);
}
},this);
    }

    ,getWindow: function() {
        return Ext.Msg.getDialog();
    }

    ,alert: function(title,text,fn,scope) {
        fn = fn || Ext.emptyFn;
        scope = scope || this;
        Ext.Msg.alert(title,text,fn,scope);
    }

    ,status: function(opt) {
        // TODO че-то с этим делать надо.
        if (!MODx.stMsgCt) {
            MODx.stMsgCt = Ext.DomHelper.insertFirst(document.body, {id:'test-status-message-ct'}, true);
        }
        MODx.stMsgCt.alignTo(document, 't-t');
        var markup = this.getStatusMarkup(opt);
        var m = Ext.DomHelper.overwrite(MODx.stMsgCt, {html:markup}, true);

        var fadeOpts = {remove:true,useDisplay:true};
        if (!opt.dontHide) {
            if(!Ext.isIE8) {
                m.pause(opt.delay || 1.5).ghost("t",fadeOpts);
            } else {
                fadeOpts.duration = (opt.delay || 1.5);
                m.ghost("t",fadeOpts);
            }
        } else {
            m.on('click',function() {
                m.ghost('t',fadeOpts);
            });
        }

    }
    ,getStatusMarkup: function(opt) {
        var mk = '<div class="test-status-msg">';
        if (opt.title) { mk += '<h3>'+opt.title+'</h3>'; }
        if (opt.message) { mk += '<span class="test-smsg-message">'+opt.message+'</span>'; }
        return mk+'</div>';
    }
});
Ext.reg('test-msg',Test.Msg);

Test.util.JSONReader = function(config) {
    config = config || {};
    Ext.applyIf(config,{
        successProperty:'success'
        ,totalProperty: 'total'
        ,root: 'data'
    });
    Test.util.JSONReader.superclass.constructor.call(this,config,['id','msg']);
};
Ext.extend(Test.util.JSONReader,Ext.data.JsonReader);
Ext.reg('test-json-reader',Test.util.JSONReader);


Ext.onReady(function() {
    Test.util.JSONReader = Ext.ComponentMgr.create({ xtype: 'test-json-reader' });
    Test.form.Handler = Ext.ComponentMgr.create({ xtype: 'test-form-handler' });
    Test.msg = Ext.ComponentMgr.create({ xtype: 'test-msg' });
});

