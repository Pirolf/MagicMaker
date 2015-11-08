class AddTypeHasManySubtypes < ActiveRecord::Migration
  def change
    add_reference :subtypes, :type, index: true
  end
end
