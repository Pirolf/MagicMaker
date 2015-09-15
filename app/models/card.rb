class Card < ActiveRecord::Base
	has_many :card_entities

	has_many :special_ability_entities
	has_many :special_abilities, through: :special_ability_entities

	has_attached_file(
		:image_art, 
		styles: { large: "324x237#", medium: "162x118.5#", thumb: "100x100#" }, 
		:default_style => :large
		#default_url: "/images/:style/missing.png"54 * 39.5
		)
  	validates_attachment_content_type :image_art, content_type: /\Aimage\/.*\Z/
end
