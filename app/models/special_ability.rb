class SpecialAbility < ActiveRecord::Base
	has_many :special_ability_entities
	has_many :cards, through: :special_ability_entities
end
