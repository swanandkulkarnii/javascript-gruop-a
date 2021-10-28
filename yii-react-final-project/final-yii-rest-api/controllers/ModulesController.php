<?php
namespace app\controllers;
use yii\data\ActiveDataProvider;
use yii\rest\ActiveController;

class ModulesController extends BaseController
{
    public $modelClass = 'app\resource\ModulesResource';
}
