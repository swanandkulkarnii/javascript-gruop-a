<?php

use yii\db\Migration;

/**
 * Class m211015_183752_useraddress
 */
class m211015_183752_useraddress extends Migration
{
    /**
     * {@inheritdoc}
     */
    public function safeUp()
    {
        $this->createTable('useraddress',[
            'user_address_id' => $this->primaryKey(),
            'user_id' => $this->integer()->notNull(),
            'address' => $this->text()->notNull(),
            'city' => $this->string(255)->notNull(),
            'state' => $this->string(255)->notNull(),
            'country' => $this->string(255)->notNull(),
            'zip' => $this->integer()->notNull(),
            'is_delete' => $this->integer()->defaultValue(0),
            'created_at' => $this->timestamp()
        ]);
        $this->addForeignKey('FK_User_Id','useraddress','user_id','users','user_id');
    }

    /**
     * {@inheritdoc}
     */
    public function safeDown()
    {
        $this->dropForeignKey('FK_User_Id','useraddress');
        $this->dropTable('useraddress');
    }

    /*
    // Use up()/down() to run migration code without a transaction.
    public function up()
    {

    }

    public function down()
    {
        echo "m211015_183752_useraddress cannot be reverted.\n";

        return false;
    }
    */
}
