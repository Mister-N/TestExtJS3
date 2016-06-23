<?php


require_once('Users.php');


class ResourceController extends Zend_Controller_Action
{


    public function init()
    {
    }

    public function indexAction()
    {
        $this->_helper->viewRenderer->setNoRender(true);


    }
    function usersAction(){
        $action  = $this->_getParam('actionObj');
        $request = $this->getRequest() ;
        $model = new Users();

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
                        'msg' => $errorMsg, // TODO подправить параметр, в котором передается id
                    ]
                    , JSON_UNESCAPED_UNICODE);


                break;
            case 'PUT':
                $id = $this->_getParam('id');
                $data = [
                    'name'=>  $this->_getParam('name'),
                    'qualification_id'=> $this->_getParam('qualification_id')
                ];

                if( !empty($id) AND  $model->update($data, 'user_id = ' . (int)$id) )
                    echo json_encode(
                        [
                            'success' => "true",
                            'msg' => 'ок'
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
                            'msg' => 'ок'
                        ]
                        , JSON_UNESCAPED_UNICODE);
                break;
            default:

                $count = $model->getCount();
                $users = $this->getBtn( $model->getAll() );
                $out = [
                    'total'=> $count,
                    'success' => "true", // и как же отловить ошибки запроса модели?
                    'results' => $users
                ];

                echo json_encode($out, JSON_UNESCAPED_UNICODE);

        }


//		$pageId = $this->_getParam('pageId');
    }

    private function getBtn($users){
        if(!is_array($users)) return [];
        foreach($users as $k=>$v){
            $users[$k]['actions']  =  [
                    [
                    "cls" => "",
                    "icon" => "icon icon-edit",
                    "title" => "Update Item",
                    "action" => "updateUser",
                    "button" => true,
                    "menu" => true
                ]
            ];
        }
        return $users;
    }
}

