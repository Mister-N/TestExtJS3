<?php


require_once('Users.php');
require_once('Qualification.php');
require_once('City.php');
require_once('UsersCity.php');

class fakeRESTful{
    public $config;
    public $model;
    public $params;
    public function __construct( Zend_Db_Table_Abstract $model, $config =[],$params){
        $this->config = $config;
        $this->model = $model;
        $this->params = $params;
        $this->respond();
    }

    public function respond(){


        $config = $this->getConfig();


        $action  = $this->getParams('actionObj');

       switch($action) {
            case 'get':
                $this->get($config);
                break;
            case 'PUT':
               $this->put($config);
                break;
            case 'POST':
                $this->post($config['data']);
                break;
            case 'DELETE':
                $this->delete($config);
                break;
            default:

            $this->defaultGet($config);

        }

    }
    public function get($config){

        $errorMsg = '';
        $id  = $this->getParams('id');
        if(!empty($id)) {
            if ($user = $this->model->getItem( (int)$id ) AND $user = $user->toArray()) {
                echo json_encode(
                    [
                        'success' => "true",
                        'total' => "1",
                        'object' => $user,
                    ]
                    , JSON_UNESCAPED_UNICODE);
                return;
            }
            else
                $errorMsg = $config['errors']['getItem'];
        }
        else
            $errorMsg = "не указан id";

        echo json_encode(

            [
                'success' => "false",
                'message' => $errorMsg, // TODO подправить параметр, в котором передается id
            ]
            , JSON_UNESCAPED_UNICODE);



    }
    public function put($config){
        $id = $this->getParams('id');

        if( !empty($id)){
            if($this->model->update($config['data'], $config['dataIndex'].' = ' . (int)$id) ) {
                echo json_encode(
                    [
                        'success' => true,
                        'message' => '',
                        "total"=>0,
                        "data"=>[],
                        "object"=>[]
                    ]
                    , JSON_UNESCAPED_UNICODE);
                return;
            }
            else $msgEroor = $config['errors']['updateItem'];

        }
        else $msgEroor = $config['errors']['updateItemEmptyId'];;

        echo json_encode(

            [
                'success' => "false",
                'message' => $msgEroor,
            ]
            , JSON_UNESCAPED_UNICODE);
    }
    public function post($data = []){
        if($this->model->insert($data))
            echo json_encode(
                [
                    'success' => true,
                    'message' => '',
                    "total"=>0,
                    "data"=>[],
                    "object"=>[]
                ]
                , JSON_UNESCAPED_UNICODE);
    }
    public function delete($config){
        $message ='';
        $success = true;
        $ids = $this->getParams('ids');

        if($ids = json_decode($ids) AND !empty($ids) AND is_array($ids)){
            foreach($ids as $id){
                if(!$this->model->delete($config['dataIndex'].' = ' . (int)$id)) {
                    $message .= $config['errors']['deleteItem'] . $id .'.';
                    $success = false;
                }
            }
        }
        else{
            $message = 'Не указан id';
            $success = false;
        }


        echo json_encode(
            [
                'success' => $success,
                'message' => !empty($message)? $message :'',
            ]
            , JSON_UNESCAPED_UNICODE);
    }
    public function defaultGet($config){
        $queryParams = [];
        $queryParams['query'] = $this->getParams('query');
        $queryParams['limit'] = $this->getParams('limit');
        $queryParams['offset'] = $this->getParams('start');
        $queryParams['sort'] =  empty($this->getParams('sort'))? 'id' : $this->getParams('sort');
        $queryParams['dir']  =  empty($this->getParams('dir'))? 'asc' : $this->getParams('dir');
        $users = $this->getBtn($this->model->getAll($queryParams),$config['actions']);
        $count = $this->model->getCount($queryParams);

        $out = [
            'total'=> $count,
            'success' => "true", // и как же отловить ошибки запроса модели?
            'results' => $users
        ];

        echo json_encode($out, JSON_UNESCAPED_UNICODE);
    }
    public function getConfig(){
        return array_merge(
            [
                'actions'  =>  [
                    [
                        "cls" => "",
                        "icon" => "icon icon-edit",
                        "title" => "Обновить объеккт",
                        "multiple"=> "Обновить объекты ",
                        "action" => "updateItem",
                        "button" => false,
                        "menu" => true
                    ],
                    [
                        "cls"=> "",
                        "icon"=> "icon icon-trash-o action-red",
                        "title"=> "Удалить",
                        "multiple"=> "Удалить объекты ",
                        "action"=>"removeItem",
                        "button"=>false,
                        "menu"=>true
                    ]
                ]
                ,'errors'=>[
                    'getItem'=> 'Ошибка при получении данных',
                    'updateItem'=>'Ошибка при обновлении пользователя.',
                    'updateItemEmptyId'=>'Не указан id.',
                    'deleteItem'=>' Не удалось удалить юзера с id '
                ]
                ,'data'=> [
                    'name'=> $this->getParams('name'),
                    'qualification_id'=> $this->getParams('qualification_id')
                ]
                ,'dataIndex' => 'user_id'
            ],
            $this->config
        );
    }
    public function getBtn($users,$actions){
        if(!is_array($users) OR !is_array($actions)) return [];
        foreach($users as $k=>$v){
            $users[$k]['actions']  =  $actions;
        }
        return $users;
    }
    public function getParams($name){
        if(!isset($this->params[$name])) return '';

        return $this->params[$name];

    }

}
class fakeRESTfulUsersCity extends fakeRESTful {
    public function defaultGet($config){
        $queryParams = [];
        $user_id = $this->getParams('user_id');
        if(!empty($user_id)){
            $queryParams['user_id'] = $user_id;
        }


        $items = $this->model->getAll($queryParams);

        $out = [
            //'total'=> $count,
            'success' => "true", // и как же отловить ошибки запроса модели?
            'results' => $items
        ];

        echo json_encode($out, JSON_UNESCAPED_UNICODE);
    }
}

class ResourceController extends Zend_Controller_Action
{


    public function init()
    {

    }

    public function indexAction()
    {
        //$this->_helper->viewRenderer->setNoRender(true);


    }
    function usersAction(){
        $this->_helper->viewRenderer->setNoRender(true);
        $params = [
            'actions'  =>  [
                [
                    "cls" => "",
                    "icon" => "icon icon-edit",
                    "title" => "Обновить пользователя",
                    //"multiple"=> "Обновить пользователей ",
                    "action" => "updateUser",
                    "button" => false,
                    "menu" => true
                ],
                [
                    "cls"=> "",
                    "icon"=> "icon icon-trash-o action-red",
                    "title"=> "Удалить",
                    "multiple"=> "Удалить пользователей ",
                    "action"=>"removeUser",
                    "button"=>false,
                    "menu"=>true
                ]
            ]

        ];
         new fakeRESTful (new Users(), $params, $this->_getAllParams());
    }
    function qualificationAction(){
        $this->_helper->viewRenderer->setNoRender(true);
        $params = [
            'actions'  =>  [
                                [
                                    "cls" => "",
                                    "icon" => "icon icon-edit",
                                    "title" => "Обновить образование",
                                   // "multiple"=> "Обновить образования ",
                                    "action" => "updateQualification",
                                    "button" => false,
                                    "menu" => true
                                ],
                                [
                                    "cls"=> "",
                                    "icon"=> "icon icon-trash-o action-red",
                                    "title"=> "Удалить",
                                    "multiple"=> "Удалить (?)образовния",
                                    "action"=>"removeQualification",
                                    "button"=>false,
                                    "menu"=>true
                                ]
                            ]
            ,'dataIndex' => 'qualification_id'
            ,'data'=> [
                'name'=> $this->_getParam('name'),
                'qualification_id'=> $this->_getParam('id')
            ]

            ];
        new fakeRESTful (new Qualification(), $params, $this->_getAllParams());

    }
    function cityAction(){
        $this->_helper->viewRenderer->setNoRender(true);
        $params = [
            'actions'  =>  [
                                [
                                    "cls" => "",
                                    "icon" => "icon icon-edit",
                                    "title" => "Обновить город",
                                   // "multiple"=> "Обновить образования ",
                                    "action" => "updateCity",
                                    "button" => false,
                                    "menu" => true
                                ],
                                [
                                    "cls"=> "",
                                    "icon"=> "icon icon-trash-o action-red",
                                    "title"=> "Удалить",
                                    "multiple"=> "Удалить (?)образовния",
                                    "action"=>"removeCity",
                                    "button"=>false,
                                    "menu"=>true
                                ]
                            ]
            ,'data' =>     [
                                'name'=> $this->_getParam('name'),
                                'city_id'=> $this->_getParam('id')
                            ]
            ,'dataIndex'=>  'city_id'

            ];
        new fakeRESTful (new City(), $params, $this->_getAllParams());

    }
    function usersCityAction(){
        $this->_helper->viewRenderer->setNoRender(true);
        $params = [
            'actions'  =>  [
                                [
                                    "cls" => "",
                                    "icon" => "icon icon-edit",
                                    "title" => "Обновить город",
                                   // "multiple"=> "Обновить образования ",
                                    "action" => "updateCity",
                                    "button" => false,
                                    "menu" => true
                                ],
                                [
                                    "cls"=> "",
                                    "icon"=> "icon icon-trash-o action-red",
                                    "title"=> "Удалить",
                                    "multiple"=> "Удалить (?)образовния",
                                    "action"=>"removeCity",
                                    "button"=>false,
                                    "menu"=>true
                                ]
                            ]
            ,'data' =>     [
                                'name'=> $this->_getParam('name'),
                                'city_id'=> $this->_getParam('id')
                            ]
            ,'dataIndex'=>  'city_id'

            ];

        new fakeRESTfulUsersCity (new UsersCity(), $params, $this->_getAllParams());


    }
}


