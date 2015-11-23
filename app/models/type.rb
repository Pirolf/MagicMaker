class Type < ActiveRecord::Base
    belongs_to :user
    has_many :subtypes, dependent: :destroy
    has_many :cards, dependent: :destroy

    before_destroy :destroy_subtypes
    before_create :shout

    def destroy_subtypes
        p 'called'
        #self.subtypes.each do |s|
        #    s.destroy
        #end
    end

    def shout
        p 'type created'
    end
end
