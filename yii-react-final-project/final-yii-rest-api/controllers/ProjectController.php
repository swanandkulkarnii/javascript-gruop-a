<?php
namespace app\controllers;
use yii\rest\ActiveController;
use yii\behaviors\TimestampBehavior;

class ProjectController extends BaseController
{
    public $modelClass = 'app\resource\ProjectResource';

}