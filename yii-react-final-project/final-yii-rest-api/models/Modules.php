<?php

namespace app\models;

use Yii;

/**
 * This is the model class for table "modules".
 *
 * @property int $module_id
 * @property int|null $project_id
 * @property string $title
 * @property string $description
 * @property string $created_at
 *
 * @property Api[] $apis
 * @property Project $project
 */
class Modules extends \yii\db\ActiveRecord
{
    
    /**
     * {@inheritdoc}
     */
    public static function tableName()
    {
        return 'modules';
    }

    /**
     * {@inheritdoc}
     */
    public function rules()
    {
        return [
            [['project_id','is_delete'], 'integer'],
            [['title', 'description'], 'required'],
            [['description'], 'string'],
            [['created_at'], 'safe'],
            [['title'], 'string', 'max' => 255],
            [['project_id'], 'exist', 'skipOnError' => true, 'targetClass' => Project::className(), 'targetAttribute' => ['project_id' => 'project_id']],
        ];
    }

    /**
     * {@inheritdoc}
     */
    public function attributeLabels()
    {
        return [
            'module_id' => 'Module ID',
            'project_id' => 'Project ID',
            'title' => 'Title',
            'description' => 'Description',
            'is_delete' => 'Is Delete',
            'created_at' => 'Created At',
        ];
    }

    /**
     * Gets query for [[Apis]].
     *
     * @return \yii\db\ActiveQuery
     */
    public function getApis()
    {
        return $this->hasMany(Api::className(), ['module_id' => 'module_id']);
    }

    /**
     * Gets query for [[Project]].
     *
     * @return \yii\db\ActiveQuery
     */
    public function getProject()
    {
        return $this->hasOne(Project::className(), ['project_id' => 'project_id']);
    }
    public static function find() {
        return new ModuleQuery(get_called_class());
    }    
}
