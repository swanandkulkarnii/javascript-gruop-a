<?php

namespace app\controllers;

use app\models\SearchUserAddress;
use app\models\UserAddress;
use yii\data\ActiveDataProvider;
use yii\rest\ActiveController;
use app\resource\UserAddressResource;


class UseraddressController extends BaseController{
    public $modelClass = UserAddress::class;


    public function actions()
    {
        $actions = parent::actions();

        // unset($actions['index']);

        $actions['index']['dataFilter'] = [
            'class' => \yii\data\ActiveDataFilter::class,
            'searchModel' => $this->modelClass,
        ];

        
        
        return $actions;
    }

    public function actionRead() {
        $activeData = new ActiveDataProvider([
            'query' => \app\models\UserAddress::find()->where(['is_deleted'=> 0]),
        ]);
        return $activeData;
       
    }

    // public function actionIndex() {
    //     $activeData = new ActiveDataProvider([
    //         'query' => \app\models\UserAddress::find()->where(['is_deleted'=> 0]),
    //     ]);
    //     return $activeData;
       
    // }


    
}