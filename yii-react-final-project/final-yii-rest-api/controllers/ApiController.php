<?php
namespace app\controllers;
use yii\data\ActiveDataProvider;

class ApiController extends BaseController
{
    public $modelClass = 'app\resource\ApiResource';
    
    // public function actions()
    // {
    //     $actions = parent::actions();
    //     $actions['index']['prepareDataProvider'] = [$this, 'prepareDataProvider'];
    //     return $actions;
    // }

    // public function prepareDataProvider()
    // {
    //     return new ActiveDataProvider(
    //         [
    //             'query' => $this->modelClass::find()->andWhere(['module_id' => \Yii::$app->request->get('moduleId')])
    //         ]
    //     );
    // }
}