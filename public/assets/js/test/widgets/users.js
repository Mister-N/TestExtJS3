/**
 * Created by Администратор on 20.06.16.
 */
Test.UsersGrid = function(config) {
    config = config || {};
    Ext.applyIf(config, {
        title: 'Пользователи',
        height: 200,
        //autoHeight: true,
        width: '100%',
        fields: [
            {name: "userID", type: 'int'},
            {name: "name", type: 'string'},
            {name: "surname", type: 'string'},
            {name: "date",type: 'date', dateFormat: 'n/j h:ia'},
            {name: "email", type: 'string'},
            {name:  "married", type: 'bool'}
        ],
        root: 'results',
        totalProperty: 'total',
        idProperty: 'id',
        remoteSort: true,
        url: '/resource',
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
    Test.UsersGrid.superclass.constructor.call(this,config);
    this.config = config;
};
Ext.extend(Test.UsersGrid,Test.grid.Grid,{


});
//Ext.extend(Test.Panel,Ext.Panel);
Ext.reg('test-users-grid', Test.UsersGrid);