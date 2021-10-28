<?php

use yii\db\Migration;

/**
 * Class m211015_183641_users
 */
class m211015_183641_users extends Migration
{
    /**
     * {@inheritdoc}
     */
    public function safeUp()
    {
        $this->createTable('users',[
            'user_id' => $this->primaryKey(),
            'first_name' => $this->string(255)->notNull(),
            'last_name' => $this->string(255)->notNull(),
            'email' => $this->string(255)->notNull(),
            'profile_pic' => $this->text()->notNull(),
            'gender' => $this->string(255)->notNull(),
            'is_delete' => $this->integer()->defaultValue(0),
            'created_at' => $this->timestamp()
        ]);
    }

    /**
     * {@inheritdoc}
     */
    public function safeDown()
    {
        $this->dropTable('users');
    }

    /*
    // Use up()/down() to run migration code without a transaction.
    public function up()
    {

    }

    public function down()
    {
        echo "m211015_183641_users cannot be reverted.\n";

        return false;
    }
    */
}
