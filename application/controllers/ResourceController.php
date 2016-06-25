<?php


require_once('Users.php');
require_once('Qualification.php');


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
        $this->fakeRESTful(new Users(),$params);


//        print_r( $request->getActionName() );
//        print_r( $this->_getAllParams() );

    }
    function qualificationAction(){

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

            ];
        $this->fakeRESTful(new Qualification(),$params);


//        print_r( $request->getActionName() );
//        print_r( $this->_getAllParams() );

    }

    private function getBtn($users,$actions){
        if(!is_array($users) OR !is_array($actions)) return [];
        foreach($users as $k=>$v){
            $users[$k]['actions']  =  $actions;
        }
        return $users;
    }
    private function fakeRESTful( Zend_Db_Table_Abstract $model, $config =[] ){
        $config = array_merge(
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
                             ],
                            $config
                        );



        $action  = $this->_getParam('actionObj');


//        print_r( $request->getActionName() );
//        print_r( $this->_getAllParams() );
        switch($action) {
            case 'get':

                $errorMsg = '';
                $id  = $this->_getParam('id');
                if(!empty($id)) {
                    if ($user = $model->getItem( (int)$id ) AND $user = $user->toArray()) {
                        echo json_encode(
                            [
                                'success' => "true",
                                'total' => "1",
                                'object' => $user,
                            ]
                            , JSON_UNESCAPED_UNICODE);
                        break;
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


                break;
            case 'PUT':
                $id = $this->_getParam('id');
                $data = [
                    'name'=>  $this->_getParam('name'),
                    'qualification_id'=> $this->_getParam('qualification_id')
                ];

                if( !empty($id)){
                    if($model->update($data, 'user_id = ' . (int)$id) ) {
                        echo json_encode(
                            [
                                'success' => "true",
                                'message' => 'ок'
                            ]
                            , JSON_UNESCAPED_UNICODE);
                        break;
                    }
                    else $msgEroor = $config['errors']['updateItem'];

                }
                else $msgEroor = $config['errors']['updateItemEmptyId'];;

                echo json_encode(

                    [
                        'success' => "false",
                        'message' => $msgEroor, // TODO подправить параметр, в котором передается id
                    ]
                    , JSON_UNESCAPED_UNICODE);
                break;
            case 'POST':

                $data = [
                    'name'=> $this->_getParam('name'),
                    'qualification_id'=> $this->_getParam('qualification_id')
                ];
                if($model->insert($data))
                    echo json_encode(
                        [
                            'success' => "true",
                            'message' => 'ок'
                        ]
                        , JSON_UNESCAPED_UNICODE);
                break;
            case 'DELETE':
                $message ='';
                $success = true;
                $ids = $this->_getParam('ids');

                if($ids = json_decode($ids) AND !empty($ids) AND is_array($ids)){
                    foreach($ids as $id){
                        if(!$model->delete('user_id = ' . (int)$id)) {
                            $message .= $config['errors']['deleteItem'] . $id .'.';
                            $success = false;
                        }
                    }
                }
                else{
                    $message = 'Не указан id';
                    $success = false;
                }
                $message ='ок';

                echo json_encode(
                    [
                        'success' => $success,
                        'message' => $message,
                    ]
                    , JSON_UNESCAPED_UNICODE);
                break;
            default:
                $queryParams = [];
                $queryParams['query'] = $this->_getParam('query');
                $queryParams['limit'] = $this->_getParam('limit');
                $queryParams['offset'] = $this->_getParam('start');
                $queryParams['sort'] =  empty($this->_getParam('sort'))? 'id' : $this->_getParam('sort');
                $queryParams['dir']  =  empty($this->_getParam('dir'))? 'asc' : $this->_getParam('dir');

                $users = $this->getBtn($model->getAll($queryParams),$config['actions']);
                $count = $model->getCount($queryParams);




                $out = [
                    'total'=> $count,
                    'success' => "true", // и как же отловить ошибки запроса модели?
                    'results' => $users
                ];

                echo json_encode($out, JSON_UNESCAPED_UNICODE);

        }
        $this->_helper->viewRenderer->setNoRender(true);
    }
}

