class Type < ActiveRecord::Base
    belongs_to :user
    has_many :subtypes, dependent: :destroy
    has_many :cards, dependent: :destroy

    validates :name, presence: true, length: { maximum: 64 }, format: { with: /\A[^\\\/<>$#%^&|@*]*\z/ }

    def self.get_by_user(user)
        return self.where(user_id: -1) if user == nil
        user.types
    end

    def ordered_subtypes
        subtypes.order("LOWER(name)")
    end
end
