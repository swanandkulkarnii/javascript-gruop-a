<?php

namespace app\controllers;

use app\controllers\BaseController;
use app\ModuleManager\ModuleInterface;
use yii\filters\VerbFilter;
use yii\di\Container;
use Yii;

class ModuleController extends BaseController
{
    public $modelClass = 'app\resources\ModuleResource';

    public function actions()
    {
        $actions = parent::actions();
        unset($actions['view']);
        return $actions;
    }

    protected $finder;
    public function __construct($id, $module, ModuleInterface $finder, $config = [])
    {
        $this->finder = $finder;
        parent::__construct($id, $module, $config);
    }

    // public function actionIndex()
    // {

    //     $model = $this->finder->index();

    //     return $model;
    // }


    public function actionView($id)
    {
        $model = $this->finder->view($id);
        // if(!empty($model)){
        //     return $this->render('view', [
        //         'model' => $model,
        //     ]);
        // }
        return $model;
    }


    //     public function actionCreate()
    //     {
    //         $model = $this->finder->create();
    //         if(isset($model->id))
    //         {
    //             return $this->redirect(['view', 'id' => $model->id]);
    //         }
    //         return $this->render('create', [
    //             'model' => $model,
    //         ]);
    //     }

    //     public function actionUpdate($id)
    //     {
    //         $model = $this->finder->update($id);
    //         if(isset($model->id))
    //         {
    //             return $this->render('update', [
    //             'model' => $model,
    //             ]);
    //         }    

    //     }
    //     public function actionDelete($id)
    //     {
    //         $model = $this->finder->delete($id);
    //         if($model == 1)
    //         {
    //             return $this->redirect(['index']);
    //         }
    //         return $this->redirect(['index']);
    //     }
    //

    // $container = new Container;
    //Yii::$container->set('app\ModuleManager\ModuleInterface', 'app\ModuleManager\ModuleManager');
}
