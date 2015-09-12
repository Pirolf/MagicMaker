class SpecialAbility < ActiveRecord::Base
	has_many :special_ability_entities
	has_many :cards, through: :special_ability_entities
	def find_entity id
		SpecialAbilityEntity.find_by special_ability_id: id
	end
end
