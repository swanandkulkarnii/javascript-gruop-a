<?php

use yii\db\Migration;

/**
 * Class m211022_081347_useraddress
 */
class m211022_081347_useraddress extends Migration
{
    /**
     * {@inheritdoc}
     */
    public function safeUp()
    {
        $this->createTable('user_address', [
            'address_id' => $this->primaryKey(),
            'addressline1' => $this->string(255)->notNull(),
            'addressline2' => $this->string(255)->notNull(),
            'city' => $this->string(255)->notNull(),
            'state' => $this->string(255)->notNull(),
            'zipcode' => $this->integer()->notNull(),
            'country' => $this->string(100)->notNull(),
            'user_id' => $this->integer()->notNull(),
            'is_deleted' => $this->integer()->defaultExpression('0'),
            'created_at' => $this->timestamp(),
                     
        ]);
        $this->addForeignKey('FK_User_Id','user_address','user_id','users','id');
    }

   

    /**
     * {@inheritdoc}
     */
    public function safeDown()
    {
        $this->dropForeignKey('FK_User_Id','user_address');
        $this->dropTable('user_address');
    }

    /*
    // Use up()/down() to run migration code without a transaction.
    public function up()
    {

    }

    public function down()
    {
        echo "m211022_081347_useraddress cannot be reverted.\n";

        return false;
    }
    */
}
