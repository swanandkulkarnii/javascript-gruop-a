<?php

namespace app\models;

use yii\base\Model;
use yii\data\ActiveDataProvider;
use app\models\Api;

/**
 * ApiSearch represents the model behind the search form of `app\models\Api`.
 */
class ApiSearch extends Api
{
    /**
     * {@inheritdoc}
     */
    public function rules()
    {
        return [
            [['api_id', 'module_id','project_id','is_delete'], 'integer'],
            [['url', 'title', 'description', 'method', 'request', 'response', 'created_at'], 'safe'],
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
        $query = Api::find();

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
            'api_id' => $this->api_id,
            'module_id' => $this->module_id,
            'created_at' => $this->created_at,
        ]);

        $query->andFilterWhere(['like', 'url', $this->url])
            ->andFilterWhere(['like', 'title', $this->title])
            ->andFilterWhere(['like', 'description', $this->description])
            ->andFilterWhere(['like', 'method', $this->method])
            ->andFilterWhere(['like', 'request', $this->request])
            ->andFilterWhere(['like', 'response', $this->response]);

        return $dataProvider;
    }
}
