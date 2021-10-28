<?php

namespace app\models;

use Yii;

/**
 * This is the model class for table "users".
 *
 * @property int $user_id
 * @property string $first_name
 * @property string $last_name
 * @property string $email
 * @property string $profile_pic
 * @property string $gender
 * @property string $created_at
 *
 * @property Useraddress[] $useraddresses
 */
class Users extends \yii\db\ActiveRecord
{

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
            [['is_delete'], 'integer'],
            [['first_name', 'last_name', 'email', 'profile_pic', 'gender'], 'required'],
            [['profile_pic'], 'string'],
            [['created_at'], 'safe'],
            [['first_name', 'last_name', 'email', 'gender'], 'string', 'max' => 255],
        ];
    }

    /**
     * {@inheritdoc}
     */
    public function attributeLabels()
    {
        return [
            'user_id' => 'User ID',
            'first_name' => 'First Name',
            'last_name' => 'Last Name',
            'email' => 'Email',
            'profile_pic' => 'Profile Pic',
            'gender' => 'Gender',
            'is_delete' => 'Is Delete',
            'created_at' => 'Created At',
        ];
    }

    /**
     * Gets query for [[Useraddresses]].
     *
     * @return \yii\db\ActiveQuery
     */
    public function getUseraddresses()
    {
        return $this->hasMany(Useraddress::className(), ['user_id' => 'user_id']);
    }
}
