<?php

namespace app\models;

use yii\base\Model;
use yii\data\ActiveDataProvider;
use app\models\Modules;

/**
 * ModulesSearch represents the model behind the search form of `app\models\Modules`.
 */
class ModulesSearch extends Modules
{
    public $project_title;
    /**
     * {@inheritdoc}
     */
    public function rules()
    {
        return [
            [['module_id', 'project_id','is_delete'], 'integer'],
            [['title', 'description', 'created_at','project_title'], 'safe'],
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
    public function search()
    {
        $query = Modules::find();
        $query->joinWith(['project']);
        // add conditions that should always apply here

        $dataProvider = new ActiveDataProvider([
            'query' => $query,
        ]);

        //$this->load($params);

        if (!$this->validate()) {
            // uncomment the following line if you do not want to return any records when validation fails
            // $query->where('0=1');
            return $dataProvider;
        }

        // grid filtering conditions
        $query->andFilterWhere([
            'module_id' => $this->module_id,
            'project_id' => $this->project_id,
            'created_at' => $this->created_at,
        ]);

        $query->andFilterWhere(['like', 'title', $this->title])
            ->andFilterWhere(['like', 'description', $this->description])
            ->andFilterWhere(['like', 'project.title', $this->project_title]);
        return $dataProvider;
    }
}
