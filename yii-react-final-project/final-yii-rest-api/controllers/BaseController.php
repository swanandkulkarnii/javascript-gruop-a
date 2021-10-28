<?php

namespace app\controllers;

use yii\rest\ActiveController;
use Yii;
use yii\filters\VerbFilter;
use yii\filters\auth\HttpBearerAuth;
use yii\filters\Cors;
use yii\data\ActiveDataProvider;
class BaseController extends ActiveController
{
    public $enableCsrfValidation = false;
    public $serializer = [
        'class' => 'yii\rest\Serializer',
        'collectionEnvelope' => 'items',
    ];
    public function actions()
    {
        $actions = parent::actions();

        $actions['index']['dataFilter'] = [
            'class' => \yii\data\ActiveDataFilter::class,
            'searchModel' => $this->modelClass,
        ];
        return $actions;
    }
    public function behaviors()
    {
        $behaviors = parent::behaviors();

        $behaviors['corsFilter'] = [
            'class' => Cors::class,
            'cors'  => [
                'Origin' => ['*'],
                'Access-Control-Request-Method'    => ['POST', 'GET', 'PUT', 'PATCH', 'DELETE', 'HEAD', 'OPTIONS'],
                'Access-Control-Allow-Headers' => ['Origin', 'X-Requested-With', 'Content-Type', 'accept', 'Authorization'],
                'Access-Control-Request-Headers' => ['*'],
                'Access-Control-Allow-Origin'   => ['*'],
                'Access-Control-Expose-Headers' => ['X-Pagination-Total-Count', 'X-Pagination-Page-Count', 'X-Pagination-Current-Page', 'X-Pagination-Per-Page']
            ]
        ];


        $behaviors['verbs'] = [
            'class' => VerbFilter::className(),
            'actions' => [
                'index' => ['GET','OPTIONS'],
                'read' => ['GET','OPTIONS'],
                'create' => ['POST', 'OPTIONS'],
                'update' => ['PUT','OPTIONS'],
                'delete' => ['DELETE']
            ],
        ];


        return $behaviors;
    }
    protected function verbs()
    {
        return [
            'index' => ['GET', 'HEAD','OPTIONS'],
            'read' => ['GET','HEAD','OPTIONS'],
            'view' => ['GET', 'HEAD'],
            'create' => ['POST','OPTIONS'],
            'update' => ['PUT', 'PATCH','OPTIONS'],
            'delete' => ['DELETE','OPTIONS'],
        ];
    }
    
    public function actionRead() {
        $activeData = new ActiveDataProvider([
            'query' => $this->modelClass::find()->where(['is_delete'=> 0]),
        ]);
        return $activeData;
    }
}
