class CreateSpecialAbilities < ActiveRecord::Migration
  def change
    create_table :special_abilities do |t|
      t.string :name
      t.string :rule

      t.timestamps null: false
    end
  end
end
