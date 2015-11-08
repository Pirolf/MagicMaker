class AddSubtypeToCard < ActiveRecord::Migration
  def change
    add_reference :cards, :subtype, index: true
    add_reference :cards, :type, index: true
  end
end
