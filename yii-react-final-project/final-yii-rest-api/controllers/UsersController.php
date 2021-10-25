<?php

namespace app\controllers;
use app\models\Users;
use yii\data\ActiveDataProvider;

class UsersController extends BaseController{

    public $modelClass = Users::class;

    public function actions() {
        $actions = parent::actions();
        unset($actions['index']);
        return $actions;
    }

    public function actionIndex() {
        $activeData = new ActiveDataProvider([
            'query' => \app\models\Users::find()->where(['is_deleted'=> 0]),
        ]);
        return $activeData;
       
    }
}

?>
