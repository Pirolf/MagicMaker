class AddBelongsToHasManyToCardsUsers < ActiveRecord::Migration
  def change
  	change_table(:cards) do |t|
  		t.belongs_to :user, index: true
  	end
  end
end
