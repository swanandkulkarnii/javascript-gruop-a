<?php

namespace app\models;

use Yii;


/**
 * This is the model class for table "user_address".
 *
 * @property int $address_id
 * @property string $addressline1
 * @property string $addressline2
 * @property string $city
 * @property string $state
 * @property int $zipcode
 * @property string $country
 * @property string $created_at
 * @property string $updated_at
 * @property int|null $is_deleted
 */
class UserAddress extends \yii\db\ActiveRecord
{
    /**
     * {@inheritdoc}
     */
    public static function tableName()
    {
        return 'user_address';
    }

  
    
    /**
     * {@inheritdoc}
     */
    public function rules()
    {
        return [
            [['addressline1', 'addressline2', 'city', 'state', 'zipcode', 'country', 'user_id'], 'required'],
            [['zipcode', 'user_id', 'is_deleted'], 'integer'],
            [['created_at'], 'safe'],
            [['addressline1', 'addressline2', 'city', 'state'], 'string', 'max' => 255],
            [['country'], 'string', 'max' => 100],
            [['user_id'], 'exist', 'skipOnError' => true, 'targetClass' => Users::className(), 'targetAttribute' => ['user_id' => 'id']],
        ];
    }

    /**
     * {@inheritdoc}
     */
    public function attributeLabels()
    {
        return [
            'address_id' => 'Address ID',
            'addressline1' => 'Addressline1',
            'addressline2' => 'Addressline2',
            'city' => 'City',
            'state' => 'State',
            'zipcode' => 'Zipcode',
            'country' => 'Country',
            'created_at' => 'Created At',
            'is_deleted' => 'Is Deleted',
        ];
    }

    public function getUser()
    {
        return $this->hasOne(Users::className(), ['id' => 'user_id']);
    }
}
