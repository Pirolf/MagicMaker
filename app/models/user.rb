class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
	devise :database_authenticatable, :registerable,
    :recoverable, :rememberable, :trackable, :validatable

    has_many :cards

    validates :username, length: { maximum: 64 }, uniqueness: true
    validates :email, uniqueness:true
    validates :password, length: { maximum: 64, minimum: 8}
    validates :password_confirmation, length: { maximum: 64, minimum: 8}
end
