class AddCardIdAndUserIdToCardsUsers < ActiveRecord::Migration
  def change
  	add_column :cards_users, :card_id, :integer
  	add_column :cards_users, :user_id, :integer
  end
end
