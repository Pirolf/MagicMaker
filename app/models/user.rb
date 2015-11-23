class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
	devise :database_authenticatable, :registerable,
    :recoverable, :rememberable, :trackable, :validatable

    has_many :cards, dependent: :destroy
    has_many :types, dependent: :destroy
    has_many :subtypes, dependent: :destroy
    
    validates :username, length: { maximum: 64 }, uniqueness: true
    validates :email, uniqueness:true
    validates :password, length: { maximum: 64, minimum: 8}
    validates :password_confirmation, length: { maximum: 64, minimum: 8}

    after_create :create_default_types

    DEFAULT_TYPES = {
    'Artifact': ['Equipment', 'Fortification'],
    'Artifact Creature': [],
    'Creature': ['Advisor', 'Cleric', 'Elemental', 'Illusion', 'Soldier', 'Wall'],
    'Enchantment': [],
    'Enchantment Creature': [],
    'Instant': ['Arcane', 'Trap'],
    'Land': [],
    'Basic Land': [],
    'Sorcery': ['Arcane']
    }

    def create_default_types
        DEFAULT_TYPES.each_pair do |k, v|
            type = self.types.create({ name: k })
            v.each do |subtype|
                subtype = type.subtypes.create({ name: v })
                self.subtypes.create({ name: v })
            end
        end
    end
end
