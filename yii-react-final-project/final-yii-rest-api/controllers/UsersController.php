<?php
namespace app\controllers;
use yii\rest\ActiveController;
class UsersController extends BaseController
{
    public $modelClass = 'app\resource\UsersResource';
}
