class AddCardForeignKeys < ActiveRecord::Migration
  def change
    remove_column :cards, :user_id
    remove_column :cards, :type_id
    remove_column :cards, :subtype_id
    
    add_reference :cards, :type, index: true, foreign_key: true
    add_reference :cards, :subtype, index: true, foreign_key: true
    add_reference :cards, :user, index: true, foreign_key: true
  end
end
