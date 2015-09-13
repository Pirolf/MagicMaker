class Card < ActiveRecord::Base
	has_many :card_entities

	has_many :color_entities
	has_many :colors, through: :color_entities
	
	has_many :special_ability_entities
	has_many :special_abilities, through: :special_ability_entities
end
