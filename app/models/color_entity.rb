class ColorEntity < ActiveRecord::Base
	belongs_to :card
	belongs_to :color
	Color_mappings = { 0 => "none", 1 => "red", 2 => "green", 3 =>"blue", 4 => "black", 5 => "white"}
end
