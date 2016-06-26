<?php

 class UsersCity extends Zend_Db_Table_Abstract
{
    /**
     * Имя таблицы
     * @var string
     */
    protected $_name = 'users_city';
     public function getItem($cityId)
     {
         $select = $this->select()->where('city_id = ?', (int) $cityId)->from($this, ['city_id as id','name']);
         $result = $this->fetchRow($select);
         return $result;
     }
     public function getAll($queryParams = [])
     {

         $select = $this->select()
             ->from(['uc' => 'users_city'])
             ->joinInner(
                 ['c' => 'city'],
                 'c.city_id = uc.city_id'
                 //,['user_id',]

             )
             ->setIntegrityCheck(false)
             //->where('users_city = '  . $queryParams['users_city'] . '%\'')

         ;

         return $this->fetchAll($select)->toArray();
         //$sql->prepareStatementForSqlObject($select) $results = $statement->execute(); instead of $select->getSqlString()
     }

}