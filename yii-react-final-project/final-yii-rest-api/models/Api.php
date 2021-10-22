<?php

namespace app\models;

use Yii;

class Api extends \yii\db\ActiveRecord
{
    public static function tableName()
    {
        return 'api';
    }

    public function rules()
    {
        return [
            [['project_id', 'module_id', 'url', 'title', 'description', 'method', 'request', 'response'], 'required'],
        ];
    }

    public function attributeLabels()
    {
        return [
            'project_id' => 'Project Id', 
            'module_id' => 'Module Id', 
            'url' => 'URL', 
            'title' => 'Title', 
            'description' => 'Description', 
            'method' => 'Method', 
            'request' => 'Request', 
            'response' => 'Response',
        ];
    }

    public function getProject(){
        return $this->hasOne(Project::className(), ['id' => 'project_id']);
    }

    public function getModule(){
        return $this->hasOne(Module::className(), ['id' => 'module_id']);
    }
}
