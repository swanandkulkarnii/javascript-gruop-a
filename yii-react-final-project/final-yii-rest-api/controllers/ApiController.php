<?php

namespace app\controllers;

use app\controllers\BaseController;
use yii\di\Container;
use Yii;

class ApiController extends BaseController
{
    public $modelClass = 'app\resources\ApiResource';
}
