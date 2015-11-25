class AddForeignKeys < ActiveRecord::Migration
  def change
    remove_column :types, :user_id
    remove_column :subtypes, :type_id
    remove_column :subtypes, :user_id
    
    add_reference :subtypes, :type, index: true, foreign_key: true
    add_reference :types, :user, index: true, foreign_key: true
    add_reference :subtypes, :user, index: true, foreign_key: true
  end
end
