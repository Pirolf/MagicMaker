class AddUserIdColumnToTypeAndSubtype < ActiveRecord::Migration
  def change
    add_reference :types, :user, index: true
    add_reference :subtypes, :user, index: true
  end
end
