<?php

use yii\db\Migration;

/**
 * Class m211015_183634_api
 */
class m211015_183634_api extends Migration
{
    /**
     * {@inheritdoc}
     */
    public function safeUp()
    {
        $this->createTable('api',[
            'api_id' => $this->primaryKey(),
            'project_id' => $this->integer()->notNull(),
            'module_id' => $this->integer()->notNull(),
            'url' => $this->text()->notNull(),
            'title' => $this->string(255)->notNull(),
            'description' => $this->text()->notNull(),
            'method' => $this->string(255)->notNull(),
            'request' => $this->string(255)->notNull(),
            'response' => $this->string(255)->notNull(),
            'is_delete' => $this->integer()->defaultValue(0),
            'created_at' => $this->timestamp()
        ]);
        $this->addForeignKey('FK_Project_Api_Id','api','project_id','project','project_id');
        $this->addForeignKey('FK_Module_Id','api','module_id','modules','module_id');
    }

    /**
     * {@inheritdoc}
     */
    public function safeDown()
    {
        $this->dropForeignKey('FK_Project_Id','api');
        $this->dropForeignKey('FK_Module_Id','api');
        $this->dropTable('api');
    }

    /*
    // Use up()/down() to run migration code without a transaction.
    public function up()
    {

    }

    public function down()
    {
        echo "m211015_183634_api cannot be reverted.\n";

        return false;
    }
    */
}
