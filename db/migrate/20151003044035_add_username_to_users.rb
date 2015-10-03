class AddUsernameToUsers < ActiveRecord::Migration
  def change
  	add_column :users, :username, :string, limit: 64, default: "", null: false, unique: true
  	add_index :users, :username, unique: true, name: "index_users_on_username"
  end
end
