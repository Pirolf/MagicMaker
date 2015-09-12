class Card < ActiveRecord::Base
	has_many :card_entities
	has_many :special_ability_entities
end
