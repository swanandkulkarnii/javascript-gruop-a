<?php
namespace app\controllers;
use yii\data\ActiveDataProvider;
use yii\rest\ActiveController;

class UseraddressController extends BaseController
{
    public $modelClass = 'app\resource\UserAddressResource';

    public function actionRead() {
        $activeData = new ActiveDataProvider([
            'query' => $this->modelClass::find()->where(['is_deleted'=> 0]),
        ]);
        return $activeData;
    }
    
}