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
        $this->fakeRESTful(new Users());


//        print_r( $request->getActionName() );
//        print_r( $this->_getAllParams() );

    }
    function qualificationAction(){

        $this->fakeRESTful(new Qualification());


//        print_r( $request->getActionName() );
//        print_r( $this->_getAllParams() );

    }

    private function getBtn($users){
        if(!is_array($users)) return [];
        foreach($users as $k=>$v){
            $users[$k]['actions']  =  [
                    [
                    "cls" => "",
                    "icon" => "icon icon-edit",
                    "title" => "Обновить пользователя",
                    "multiple"=> "Обновить пользователей ",
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
            ];
        }
        return $users;
    }
    private function fakeRESTful($model){
        $action  = $this->_getParam('actionObj');


//        print_r( $request->getActionName() );
//        print_r( $this->_getAllParams() );
        switch($action) {
            case 'get':

                $errorMsg = '';
                $id  = $this->_getParam('id');
                if(!empty($id)) {
                    if ($user = $model->getUser( (int)$id ) AND $user = $user->toArray()) {
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
                        $errorMsg = 'Ошибка при получении данных';
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
                echo 'lklkl';
                if( !empty($id) and false){
                    if($model->update($data, 'user_id = ' . (int)$id) ) {
                        echo json_encode(
                            [
                                'success' => "true",
                                'message' => 'ок'
                            ]
                            , JSON_UNESCAPED_UNICODE);
                        break;
                    }
                    else $msgEroor = 'Ошибка при обновлении пользователя.';

                }
                else $msgEroor = 'Не указан id';

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
                $message ='ок';
                $success = true;
                $ids = $this->_getParam('ids');

                if($ids = json_decode($ids) AND !empty($ids) AND is_array($ids)){
                    foreach($ids as $id){
                        print_r($id);
                        if(!$model->delete('user_id = ' . (int)$id)) {
                            $message += ' Не удалось удалить юзера с id ' . $id;
                            $success = false;
                        }
                        $message = 'Не удалось удалить пользователя.';
                        $success = false;
                    }
                }
                else{
                    $message = 'Не указан id';
                    $success = false;
                }

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

                $users = $this->getBtn($model->getAll($queryParams));
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

