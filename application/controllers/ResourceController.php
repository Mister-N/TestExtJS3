<?php


//require_once(APPLICATION_PATH.'/models/Pages.php');


class ResourceController extends Zend_Controller_Action
{

    public function init()
    {
		/* Initialize action controller here */
    }

    public function indexAction()
    {
//        echo '{"success":true,"total":"6","results":[{"userID":1,"name":"Вася","surname":"Иванов","date":"10\/08\/1991","email":"vasiv@mail.ru","married":false},{"userID":2,"name":"Вася","surname":"Иванов","date":"10\/08\/1991","email":"vasiv@mail.ru","married":false}]}';

        echo  json_encode(

               [
                   'success'=>"true",
                   'total'=>"20",
                   'results'=>[
                       [
                            "userID"=> 1,
                            "name"=> "Вася",
                            "surname"=> "Иванов",
                            "date"=> '10/08/1991',
                            "email"=>'vasiv@mail.ru',
                            "married"=> false
                        ],[
                            "userID"=> 2,
                            "name"=> "Вася",
                            "surname"=> "Иванов",
                            "date"=> '10/08/1991',
                            "email"=>'vasiv@mail.ru',
                            "married"=> false
                        ]
                   ]
               ]
           ,JSON_UNESCAPED_UNICODE);

//		$pageId = $this->_getParam('pageId');

    }



}

