class Subtype < ActiveRecord::Base
  belongs_to :type
  belongs_to :user
  has_many :cards, dependent: :destroy

  validates :name, presence: true, length: { maximum: 64 }, format: { with: /\A[^\\\/<>$#%^&|@*]*\z/ }

  def self.get(type)
    return [] if type == nil
    return type.subtypes
  end
end
