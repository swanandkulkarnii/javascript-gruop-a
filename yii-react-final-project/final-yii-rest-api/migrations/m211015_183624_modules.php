<?php

use yii\db\Migration;

/**
 * Class m211015_183624_modules
 */
class m211015_183624_modules extends Migration
{
    /**
     * {@inheritdoc}
     */
    public function safeUp()
    {
        $this->createTable('modules',[
            'module_id' => $this->primaryKey(),
            'project_id' => $this->integer(),
            'title' => $this->string(255)->notNull(),
            'description' => $this->text()->notNull(),
            'is_delete' => $this->integer()->defaultValue(0),
            'created_at' => $this->timestamp()
        ]);
        $this->addForeignKey('FK_Project_Id','modules','project_id','project','project_id');
    }

    /**
     * {@inheritdoc}
     */
    public function safeDown()
    {
        $this->dropForeignKey('FK_Project_Id','modules');
        $this->dropTable('modules');
    }

    /*
    // Use up()/down() to run migration code without a transaction.
    public function up()
    {

    }

    public function down()
    {
        echo "m211015_183624_modules cannot be reverted.\n";

        return false;
    }
    */
}
