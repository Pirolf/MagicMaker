class Subtype < ActiveRecord::Base
  belongs_to :type
  belongs_to :user
  has_many :cards, dependent: :destroy

end
