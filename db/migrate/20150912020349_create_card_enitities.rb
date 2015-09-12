class CreateCardEnitities < ActiveRecord::Migration
  def change
    create_table :card_enitities do |t|
      t.integer :deck_id
      t.integer :card_id
      t.integer :quantity

      t.timestamps null: false
    end
  end
end
