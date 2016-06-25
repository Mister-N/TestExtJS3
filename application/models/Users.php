<?php


 class Users extends Zend_Db_Table_Abstract
{
    /**
     * Имя таблицы
     * @var string
     */
    protected $_name = 'users';

    /**
     * Получить одного юзера
     *
     * @param int $usersId Идентификатор страницы
     * @return array
     */

    public function getItem($usersId)
    {
        $select = $this->select()->where('user_id = ?', (int) $usersId)->from($this, ['user_id as id','name','qualification_id']);
        $result = $this->fetchRow($select);
        return $result;
    }
     public function getAll($queryParams)
     {
         $queryParams['sort'] = $queryParams['sort'] == 'id' ? 'user_id' : $queryParams['sort']; // ну да, есть неудобства в переименовании.

         $select = $this->select()
             ->limit($queryParams['limit'], $queryParams['offset'])
             ->order( $queryParams['sort'].' '.$queryParams['dir'] ); // добавляем в запрос значения, которые не нужны в функции $this->getCount()
         $select = $this->prepareQueryForAll($queryParams,$select);

         return $this->fetchAll($select)->toArray();
         //$sql->prepareStatementForSqlObject($select) $results = $statement->execute(); instead of $select->getSqlString()
     }
     private function prepareQueryForAll($queryParams,$select){
         if(empty($select) ) return $select;

         $select = $select->from(['u' => 'users']
             , ['u.user_id as id', 'u.name as name', 'u.qualification_id as qualification_id']
         )
             ->joinInner(
                 ['q' => 'qualification'],
                 'u.qualification_id = q.qualification_id'
                 , ['q.name as qualification_name']
             )
             ->setIntegrityCheck(false)
         ;

         if (!empty($queryParams['query'])) {
             $select = $select->where('u.name LIKE ' . '\'%' . $queryParams['query'] . '%\'')
                 ->orWhere( 'q.name  LIKE ' . '\'%' . $queryParams['query'] . '%\'' )
             ;
         }

         return $select;
     }
     // о_О yне может же не быть метода лучше! Но гугл ничего лучше во-первых строках не выдает.
     public function getCount($queryParams)
     {
         $select = $this->select();

         $select = $this->prepareQueryForAll($queryParams,$select);

//         $select->from($this, array('count(*) as amount'));
//         return($rows[0]->amount);
         return $this->fetchAll($select)->count();
     }
}