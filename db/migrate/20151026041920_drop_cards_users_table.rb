class DropCardsUsersTable < ActiveRecord::Migration
  def up
    drop_table :cards_users
  end

  def down
    raise ActiveRecord::IrreversibleMigration
  end
end
