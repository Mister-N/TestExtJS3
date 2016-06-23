<?php


 class Users extends Zend_Db_Table_Abstract
{
    /**
     * Имя таблицы
     * @var string
     */
    protected $_name = 'users1';

    /**
     * Получить одну страницу
     *
     * @param int $pageId Идентификатор страницы
     * @return array
     */

    public function getUser($usersId)
    {
        $select = $this->select()->where('user_id = ?', $usersId)->from($this, ['user_id as id','name']);
        $result = $this->fetchRow($select);
        return $result;
    }
     public function getAll($limit = 10, $offset = 0){
         $select = $this->select()
            ->from($this, ['user_id as id','name'])
            ->limit($limit, $offset);
         return $this->fetchAll($select)->toArray();
     }
     // о_О yне может же не быть метода лучше! Но гугл ничего лучше во-первых строках не выдает.
     public function getCount()
     {
         $select = $this->select();
         $select->from($this, array('count(*) as amount'));
         $rows = $this->fetchAll($select);

         return($rows[0]->amount);
     }
}