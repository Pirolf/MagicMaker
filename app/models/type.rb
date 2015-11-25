class Type < ActiveRecord::Base
    belongs_to :user
    has_many :subtypes, dependent: :destroy
    has_many :cards, dependent: :destroy
end
