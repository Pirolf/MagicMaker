class Deck < ActiveRecord::Base
	has_many :card_entities
end
