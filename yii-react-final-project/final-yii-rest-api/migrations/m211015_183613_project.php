<?php

use yii\db\Migration;

/**
 * Class m211015_183613_project
 */
class m211015_183613_project extends Migration
{
    /**
     * {@inheritdoc}
     */
    public function safeUp()
    {
        $this->createTable('project',[
            'project_id' => $this->primaryKey(),
            'title' => $this->string(255)->notNull(),
            'description' => $this->text()->notNull(),
            'is_delete' => $this->integer()->defaultValue(0),
            'created_at' => $this->timestamp()
        ]);
    }

    /**
     * {@inheritdoc}
     */
    public function safeDown()
    {
        $this->dropTable('project');
    }

    /*
    // Use up()/down() to run migration code without a transaction.
    public function up()
    {

    }

    public function down()
    {
        echo "m211015_183613_project cannot be reverted.\n";

        return false;
    }
    */
}
