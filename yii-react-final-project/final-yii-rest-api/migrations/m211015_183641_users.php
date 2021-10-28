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
           'id'=> $this->primaryKey(),
            'firstname' => $this->string()->notNull(),
            'lastname'  => $this->string()->notNull(),
            'gender' => $this->string()->notNull(),
            'email_id'=> $this->string()->notNull(),
            'pro_pic' => $this->string(),
            'created_at' => $this->timestamp(),
            'is_deleted' => $this->integer()->defaultExpression('0'),
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
