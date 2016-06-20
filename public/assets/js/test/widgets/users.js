/**
 * Created by Администратор on 20.06.16.
 */
var myData = [
    [
        1,
        "Вася",
        "Иванов",
        '10/08/1991',
        'vasiv@mail.ru',
        false
    ], [
        2,
        "Петя",
        "Федоров",
        '03/08/1993',
        'petfed@yandex.ru',
        true
    ], [
        3,
        "Вова",
        "Кузнецов",
        '11/07/1989',
        'vok@mail.ru',
        false
    ], [
        4,
        "Саша",
        "Сидоров",
        '05/08/1991',
        'vvvs@mail.ru',
        true
    ]
];
var store =  new Ext.data.JsonStore({
    root: 'results',
    totalProperty: 'total',
    idProperty: 'id',
    remoteSort: true,
    url: '/resource',
    //listeners: {
    //    'load': {fn:function(){ this.select(0); }, scope:this, single:true}
    //},
    fields: [
        {name: "userID", type: 'int'},
        {name: "name", type: 'string'},
        {name: "surname", type: 'string'},
        {name: "date",type: 'date', dateFormat: 'n/j h:ia'},
        {name: "email", type: 'string'},
        {name:  "married", type: 'bool'}
    ],
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

store.load({params:{start:0, limit:25}});

//store3.setDefaultSort('lastpost', 'desc');



store.addNew({
    "userID": 5,
    "name": "Юра",
    "surname": "Иванов",
    "date": '10/08/1991',
    "email": 'vasiv@mail.ru',
    "married": false
});

Test.GridPanel = function(config) {
    config = config || {};
    Ext.applyIf(config, {
        title: 'Пользователи',
        height: 200,
        //autoHeight: true,
        width: '100%',
        store: store,
        columns: [{
            header: 'Имя',
            dataIndex: 'name'
        }, {
            header: 'Фамилия',
            dataIndex: 'surname'
        }, {
            header: 'Дата рождения',
            dataIndex: 'date',
            // xtype:'datecolumn',
            //format: 'd/m/Y',
            // flex:1
        }, {
            header: 'E-mail',
            dataIndex: 'email',
            //  flex:1
        }, {
            header: 'Женат/Замужем',
            dataIndex: 'married',
            // flex:1
        }],
        renderTo: 'test'
        //renderTo: Ext.getBody()

    });
    Test.GridPanel.superclass.constructor.call(this,config);
    this.config = config;
};
Ext.extend(Test.GridPanel,Ext.grid.GridPanel);
//Ext.extend(Test.Panel,Ext.Panel);
Ext.reg('test-users-grid', Test.GridPanel);