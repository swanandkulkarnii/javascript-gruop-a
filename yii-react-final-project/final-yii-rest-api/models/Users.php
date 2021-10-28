<?php

namespace app\models;

use Yii;

/**
 * This is the model class for table "users".
 *
 * @property int $id
 * @property string $firstname
 * @property string $lastname
 * @property string $gender
 * @property string $email_id
 * @property string|null $pro_pic
 * @property string $created_at
 * @property int|null $is_deleted
 */
class Users extends \yii\db\ActiveRecord
{
    /**
     * {@inheritdoc}
     */
    public static function tableName()
    {
        return 'users';
    }

    /**
     * {@inheritdoc}
     */
    public function rules()
    {
        return [
            [['firstname', 'lastname', 'gender', 'email_id'], 'required'],
            [['created_at'], 'safe'],
            [[ 'is_deleted'], 'integer'],
            [['firstname', 'lastname', 'gender', 'email_id', 'pro_pic'], 'string', 'max' => 255],
        ];
    }

    /**
     * {@inheritdoc}
     */
    public function attributeLabels()
    {
        return [
            'id' => 'ID',
            'firstname' => 'Firstname',
            'lastname' => 'Lastname',
            'gender' => 'Gender',
            'email_id' => 'Email ID',
            'pro_pic' => 'Pro Pic',
            'created_at' => 'Created At',
            'is_deleted' => 'Is Deleted',
        ];
    }
}
