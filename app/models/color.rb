class Color < ActiveRecord::Base
	has_many :color_entities
	has_many :cards, through: :color_entities
end
