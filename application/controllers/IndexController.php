<?php
require_once(APPLICATION_PATH.'/models/Pages.php');


class IndexController extends Zend_Controller_Action
{

    public function init()
    {
		/* Initialize action controller here */
    }

    public function indexAction()
    {
       
        echo "Я в IndexController, в indexAction!!!";
//		$pageId = $this->_getParam('pageId');
		$pageId = 1;

        $modelPages = new Pages();
        echo ':(';
		$this->view->content = '<h1>I LOVE ZEND FRAMEWORK!</h1>';

        $page = $modelPages->getPage($pageId);
        $this->view->page = $page->text;
	   // action body
    }


}

