class CreateSpecialAbilityEntities < ActiveRecord::Migration
  def change
    create_table :special_ability_entities do |t|
      t.integer :card_entity_id
      t.integer :special_ability_id

      t.timestamps null: false
    end
  end
end
