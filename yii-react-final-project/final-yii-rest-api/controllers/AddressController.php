<?php
namespace app\controllers;
use yii\web\Controller;
use yii\web\NotFoundHttpException;
use yii\filters\VerbFilter;
use app\UserAddressManager\UserAddressInterface;
use Yii;
use yii\di\Container;
class AddressController extends Controller
{
    protected $finder;
    public function __construct($id, $module, UserAddressInterface $finder, $config = [])
    {
        $this->finder = $finder;
        parent::__construct($id, $module, $config);
    }
    public function behaviors()
    {
        return array_merge(
            parent::behaviors(),
            [
                'verbs' => [
                    'class' => VerbFilter::className(),
                    'actions' => [
                        'delete' => ['POST'],
                    ],
                ],
            ]
        );
    }
    public function actionIndex()
    {
        $model = $this->finder->index();
        return $this->render('index', $model);
    }
    public function actionView($user_address_id)
    {
        $model = $this->finder->view($user_address_id);
        if(!empty($model)){
            return $this->render('view', [
                'model' => $model,
            ]);
        }
    }
    public function actionCreate()
    {
        $model = $this->finder->create();
        if(isset($model->user_address_id))
        {
            return $this->redirect(['view', 'user_address_id' => $model->user_address_id]);
        }
        return $this->render('create', [
            'model' => $model,
        ]);
    }
    public function actionUpdate($user_address_id)
    {
        $model = $this->finder->update($user_address_id);
        if(isset($model->user_address_id))
        {
            return $this->render('update', [
            'model' => $model,
            ]);
        }
    }
    public function actionDelete($id)
    {
        $model = $this->finder->delete($id);
        if($model == 1)
        {
            return $this->redirect(['index']);
        }
        return $this->redirect(['index']);
    }
}
Yii::$container->set('app\UserAddressManager\UserAddressInterface', 'app\UserAddressManager\UserAddressManager');