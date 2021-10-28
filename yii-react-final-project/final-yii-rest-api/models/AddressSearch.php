<?php

namespace app\models;

use yii\base\Model;
use yii\data\ActiveDataProvider;
use app\models\Useraddress;

/**
 * AddressSearch represents the model behind the search form of `app\models\Useraddress`.
 */
class AddressSearch extends Useraddress
{
    /**
     * {@inheritdoc}
     */
    public function rules()
    {
        return [
            [['user_address_id', 'user_id', 'zip','is_delete'], 'integer'],
            [['address', 'city', 'state', 'country', 'created_at'], 'safe'],
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
        $query = Useraddress::find();

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
            'user_address_id' => $this->user_address_id,
            'user_id' => $this->user_id,
            'zip' => $this->zip,
            'created_at' => $this->created_at,
        ]);

        $query->andFilterWhere(['like', 'address', $this->address])
            ->andFilterWhere(['like', 'city', $this->city])
            ->andFilterWhere(['like', 'state', $this->state])
            ->andFilterWhere(['like', 'country', $this->country]);

        return $dataProvider;
    }
}
