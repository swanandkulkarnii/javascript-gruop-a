<?php
namespace app\controllers;
use yii\rest\ActiveController;
class UsersController extends BaseController
{
    public $modelClass = 'app\resource\UsersResource';
    
    public function actions()
    {
        $actions = parent::actions();

        $actions['index']['dataFilter'] = [
            'class' => \yii\data\ActiveDataFilter::class,
            'searchModel' => $this->modelClass,
        ];
        return $actions;
    }

    public function actionRead() {
        $activeData = new ActiveDataProvider([
            'query' => \app\models\Users::find()->where(['is_deleted'=> 0]),
        ]);
        return $activeData;
       
    }
}
