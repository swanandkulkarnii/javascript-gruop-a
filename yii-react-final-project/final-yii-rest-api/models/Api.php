<?php

namespace app\models;

use Yii;

/**
 * This is the model class for table "api".
 *
 * @property int $api_id
 * @property int|null $module_id
 * @property string $url
 * @property string $title
 * @property string|null $description
 * @property string|null $method
 * @property string|null $request
 * @property string|null $response
 * @property string $created_at
 *
 * @property Modules $module
 */
class Api extends \yii\db\ActiveRecord
{
    
    /**
     * {@inheritdoc}
     */
    public static function tableName()
    {
        return 'api';
    }

    /**
     * {@inheritdoc}
     */
    public function rules()
    {
        return [
            [['module_id','project_id','is_delete'], 'integer'],
            [['url', 'title'], 'required'],
            [['url', 'description'], 'string'],
            [['created_at'], 'safe'],
            [['title', 'method', 'request', 'response'], 'string', 'max' => 255],
            [['module_id'], 'exist', 'skipOnError' => true, 'targetClass' => Modules::className(), 'targetAttribute' => ['module_id' => 'module_id']],
            [['project_id'], 'exist', 'skipOnError' => true, 'targetClass' => Project::className(), 'targetAttribute' => ['project_id' => 'project_id']],
        ];
    }

    /**
     * {@inheritdoc}
     */
    public function attributeLabels()
    {
        return [
            'api_id' => 'Api ID',
            'project_id' => 'Project ID',
            'module_id' => 'Module ID',
            'url' => 'Url',
            'title' => 'Title',
            'description' => 'Description',
            'method' => 'Method',
            'request' => 'Request',
            'response' => 'Response',
            'is_delete' => 'Is Delete',
            'created_at' => 'Created At',
        ];
    }

    /**
     * Gets query for [[Module]].
     *
     * @return \yii\db\ActiveQuery
     */
    public function getModule()
    {
        return $this->hasOne(Modules::className(), ['module_id' => 'module_id']);
    }
    public function getProject()
    {
        return $this->hasOne(Project::className(), ['project_id' => 'project_id']);
    }
}
