<?php

namespace app\models;

use Yii;

class Module extends \yii\db\ActiveRecord
{
    public static function tableName()
    {
        return 'module';
    }

    public function rules()
    {
        return [
            [['title', 'description', 'project_id'], 'required'],
            [['project_id'], 'integer']
        ];
    }

    public function attributeLabels()
    {
        return [
            //'project_id' => 'Project Id',
            'id' => 'ID',
            'title' => 'Title',
            'description' => 'Description',
        ];
    }

    public function getProject()
    {
        return $this->hasOne(Project::className(), ['id' => 'project_id']);
    }
}
