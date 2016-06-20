<?php


 class Users extends Zend_Db_Table_Abstract
{
    /**
     * Имя таблицы
     * @var string
     */
    protected $_name = 'users';

    /**
     * Получить одну страницу
     *
     * @param int $pageId Идентификатор страницы
     * @return array
     */
    public function getUser($usersId)
    {
        $select = $this->select()->where('user_id = ?', $usersId);
        $result = $this->fetchRow($select);
        return $result;
    }
}