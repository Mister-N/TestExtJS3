<?php

class Bootstrap extends Zend_Application_Bootstrap_Bootstrap
{
//    protected function _initDB() {
//       $dbConfig = new Zend_Config_Ini(APPLICATION_PATH . '/configs/application.ini','development');
//       $dbAdapter = Zend_Db::factory(
//           $dbConfig->resources->db->adapter,
//           array(
//            'host'     => $dbConfig->resources->db->params->host,
//            'username' => $dbConfig->resources->db->params->username,
//            'password' => $dbConfig->resources->db->params->password,
//            'dbname'   => $dbConfig->resources->db->params->dbname
//        )
//       );
//
////        My_Db_Table_Abstract::setDefaultAdapter($dbAdapter);
//
////        Zend_Registry::set('db', $dbAdapter);
////
////
////        if (APPLICATION_ENV == 'development') {
////            $profiler = new Zend_Db_Profiler_Firebug('All DB Queries');
////            $profiler->setEnabled(true);
////            $dbAdapter->setProfiler($profiler);
////        }
//    }
    public function _initDB()
    {
        $dbConfig = new Zend_Config_Ini(APPLICATION_PATH . '/configs/application.ini','development');
        // Подключение к БД, так как Zend_Db "понимает" Zend_Config, нам достаточно передать специально сформированный объект конфигурации в метод factory
        $db = Zend_Db::factory(
            $dbConfig->resources->db->adapter,
            array(
                'host'     => $dbConfig->resources->db->params->host,
                'username' => $dbConfig->resources->db->params->username,
                'password' => $dbConfig->resources->db->params->password,
                'dbname'   => $dbConfig->resources->db->params->dbname,
                'charset'   => $dbConfig->resources->db->params->charset
            )
        );

        // Задание адаптера по умолчанию для наследников класса Zend_Db_Table_Abstract
        Zend_Db_Table_Abstract::setDefaultAdapter($db);

        // Занесение объекта соединения c БД в реестр
        Zend_Registry::set('db', $db);
    }
    public function _initRoute(){
        $frontController = Zend_Controller_Front::getInstance();
        $router = $frontController->getRouter();

        $router->addRoute(
            'resource',
            new Zend_Controller_Router_Route('resource/:username',
                array('controller' => 'resource',
                    'action' => 'index'))
        );

    }


}

