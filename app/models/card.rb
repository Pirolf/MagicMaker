class Card < ActiveRecord::Base
	has_many :card_entities

	has_many :special_ability_entities
	has_many :special_abilities, through: :special_ability_entities

	has_attached_file(
		:image_art, 
		styles: { large: "324x237#", medium: "162x118.5#", thumb: "100x100#" }, 
		:default_style => :large,
		:default_url => "http://www.nichebuilder.com/Shared/PageBuilder/images/empty-image-placeholder.png"
		)
  	validates_attachment_content_type :image_art, content_type: /\Aimage\/.*\Z/
  	validates_attachment_size(:image_art, less_than: 2.megabytes, 
  		unless: Proc.new {|m| m[:image_art].nil?})
  	#validations
  	validates :name, presence: true, length: {maximum: 64}
  	validates :desc, allow_blank: true, length: {maximum: 1024}
  	validates_inclusion_of :attack, in: 0..99
  	validates_inclusion_of :defense, in: 0..99
  	validates_inclusion_of :color, in: Color.all.collect{|c| c.color_name}
  	[:mana_red, :mana_green, :mana_blue, 
  	:mana_black, :mana_white, :mana_none].each do |mana|
  		validates mana, :inclusion => {in: 0..99}
  	end 
end
