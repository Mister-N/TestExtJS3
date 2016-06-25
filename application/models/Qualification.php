<?php

 class Qualification extends Zend_Db_Table_Abstract
{
    /**
     * Имя таблицы
     * @var string
     */
    protected $_name = 'qualification';
     public function getUser($qualificationId)
     {
         $select = $this->select()->where('qualification_id = ?', (int) $qualificationId)->from($this, ['qualification_id as id','name']);
         $result = $this->fetchRow($select);
         return $result;
     }
     public function getAll($queryParams)
     {
         $select = $this->select()->limit($queryParams['limit'], $queryParams['offset']); // добавляем в запрос значения, которые не нужны в функции $this->getCount()
         $select = $this->prepareQueryForAll($queryParams,$select);

         return $this->fetchAll($select)->toArray();
         //$sql->prepareStatementForSqlObject($select) $results = $statement->execute(); instead of $select->getSqlString()
     }
     private function prepareQueryForAll($queryParams,$select){
         if(empty($select) ) return $select;


         if (!empty($queryParams['query'])) {
             $select = $select->where('name LIKE ' . '\'%' . $queryParams['query'] . '%\'');
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