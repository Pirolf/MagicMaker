class Card < ActiveRecord::Base
	has_many :card_entities

	has_many :special_ability_entities
	has_many :special_abilities, through: :special_ability_entities

    belongs_to :type
    belongs_to :subtype
    
    belongs_to :user
  
	has_attached_file(
		:image_art, 
		styles: { large: "324x237#", medium: "162x118.5#", thumb: "100x100#" }, 
		:default_style => :large,
		:default_url => "http://www.nichebuilder.com/Shared/PageBuilder/images/empty-image-placeholder.png"
	)

	validates_attachment_content_type :image_art, content_type: /\Aimage\/.*\Z/
	validates_attachment_size(:image_art, less_than: 2.megabytes)

	validates :name, presence: true, length: { maximum: 64 }, format: { with: /\A[^\\\/<>$#%^&|@*]*\z/ }
	validates :desc, allow_blank: true, length: { maximum: 1024 }, format: { with: /\A[^\\\/<>$#%^&|@*]*\z/}
	validates_numericality_of :attack, :only_integer => true, :greater_than_or_equal_to => 0, :less_than_or_equal_to => 99
	validates_numericality_of :defense, :only_integer => true, :greater_than_or_equal_to => 0, :less_than_or_equal_to => 99

	validates_inclusion_of :color, in: ["White", "Black", "Red", "Blue", "Green", "None"]

	[:mana_red, :mana_green, :mana_blue, :mana_black, :mana_white, :mana_none].each do |mana|
		validates_numericality_of mana, :only_integer => true, :greater_than_or_equal_to => 0, :less_than_or_equal_to => 9
	end

  def get_frame_url
    color.downcase + '/frame.jpg'
  end

  def get_attack_defense_box_url
    color.downcase + '/attack_defense_box.png'
  end
end
