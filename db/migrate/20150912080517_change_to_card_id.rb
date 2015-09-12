class ChangeToCardId < ActiveRecord::Migration
  def change
  	rename_column :special_ability_entities, :card_entity_id, :card_id
  end
end
