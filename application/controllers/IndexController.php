<?php
// require_once(APPLICATION_PATH.'/models/Pages.php');
 require_once(APPLICATION_PATH.'/models/Users.php');


class IndexController extends Zend_Controller_Action
{

    public function init()
    {
		/* Initialize action controller here */
    }

    public function indexAction()
    {
       
//		$pageId = $this->_getParam('pageId');
		$pageId = 3;
//
        $modelPages = new Users();
//        echo ':(';
//		$this->view->content = '<h1>I LOVE ZEND FRAMEWORK!</h1>';
//
        $page = $modelPages->getUser($pageId);
        $this->view->page = $page->name;
	   // action body
    }


}

