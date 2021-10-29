<?php

namespace app\models;

use yii\base\Model;
use yii\data\ActiveDataProvider;
use app\models\UserAddress;

/**
 * SearchUserAddress represents the model behind the search form of `app\models\UserAddress`.
 */
class SearchUserAddress extends UserAddress
{
    /**
     * {@inheritdoc}
     */
    public function rules()
    {
        return [
            [['address_id', 'zipcode','user_id', 'is_deleted'], 'integer'],
            [['addressline1', 'addressline2', 'city', 'state', 'country', 'created_at'], 'safe'],
        ];
    }

    /**
     * {@inheritdoc}
     */
    public function scenarios()
    {
        // bypass scenarios() implementation in the parent class
        return Model::scenarios();
    }

    /**
     * Creates data provider instance with search query applied
     *
     * @param array $params
     *
     * @return ActiveDataProvider
     */
    public function search($params)
    {
        $query = UserAddress::find();

        // add conditions that should always apply here

        $dataProvider = new ActiveDataProvider([
            'query' => $query,
        ]);

        $this->load($params);

        if (!$this->validate()) {
            // uncomment the following line if you do not want to return any records when validation fails
            // $query->where('0=1');
            return $dataProvider;
        }

        // grid filtering conditions
        $query->andFilterWhere([
            'address_id' => $this->address_id,
            'zipcode' => $this->zipcode,
            'created_at' => $this->created_at,
            'user_id' => $this->user_id,
            'is_deleted' => $this->is_deleted,
        ]);

        $query->andFilterWhere(['like', 'addressline1', $this->addressline1])
            ->andFilterWhere(['like', 'addressline2', $this->addressline2])
            ->andFilterWhere(['like', 'city', $this->city])
            ->andFilterWhere(['like', 'state', $this->state])
            ->andFilterWhere(['like', 'country', $this->country]);

        return $dataProvider;
    }
}