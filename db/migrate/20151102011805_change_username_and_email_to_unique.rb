class ChangeUsernameAndEmailToUnique < ActiveRecord::Migration
  def change
    change_column :users, :email, :string, null: false, unique: true
    change_column :users, :username, :string, null: false, limit: 64
  end
end
