<?php

namespace app\models;

use Yii;

/**
 * This is the model class for table "useraddress".
 *
 * @property int $user_address_id
 * @property int $user_id
 * @property string $address
 * @property string $city
 * @property string $state
 * @property string $country
 * @property int $zip
 * @property string $created_at
 *
 * @property Users $user
 */
class Useraddress extends \yii\db\ActiveRecord
{
    /**
     * {@inheritdoc}
     */
    public static function tableName()
    {
        return 'useraddress';
    }

    /**
     * {@inheritdoc}
     */
    public function rules()
    {
        return [
            [['user_id', 'address', 'city', 'state', 'country', 'zip'], 'required'],
            [['user_id', 'zip','is_delete'], 'integer'],
            [['address'], 'string'],
            [['created_at'], 'safe'],
            [['city', 'state', 'country'], 'string', 'max' => 255],
            [['user_id'], 'exist', 'skipOnError' => true, 'targetClass' => Users::className(), 'targetAttribute' => ['user_id' => 'user_id']],
        ];
    }

    /**
     * {@inheritdoc}
     */
    public function attributeLabels()
    {
        return [
            'user_address_id' => 'User Address ID',
            'user_id' => 'User ID',
            'address' => 'Address',
            'city' => 'City',
            'state' => 'State',
            'country' => 'Country',
            'zip' => 'Zip',
            'is_delete' => 'Is Delete',
            'created_at' => 'Created At',
        ];
    }

    /**
     * Gets query for [[User]].
     *
     * @return \yii\db\ActiveQuery
     */
    public function getUser()
    {
        return $this->hasOne(Users::className(), ['user_id' => 'user_id']);
    }
}
