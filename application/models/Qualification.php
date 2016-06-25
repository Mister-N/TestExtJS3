<?php

 class Qualification extends Zend_Db_Table_Abstract
{
    /**
     * Имя таблицы
     * @var string
     */
    protected $_name = 'qualification';
     public function getItem($qualificationId)
     {
         $select = $this->select()->where('qualification_id = ?', (int) $qualificationId)->from($this, ['qualification_id as id','name']);
         $result = $this->fetchRow($select);
         return $result;
     }
     public function getAll($queryParams)
     {
         $queryParams['sort'] = $queryParams['sort'] == 'id' ? 'qualification_id' : $queryParams['sort']; // ну да, есть неудобства в переименовании.

         $select = $this->select()
             ->from(['q' => 'qualification']
                 , ['qualification_id as id','name']
             )
             ->limit($queryParams['limit'], $queryParams['offset'])
             ->order( $queryParams['sort'].' '.$queryParams['dir'] );
         ; // добавляем в запрос значения, которые не нужны в функции $this->getCount()
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