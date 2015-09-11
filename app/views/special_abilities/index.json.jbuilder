json.array!(@special_abilities) do |special_ability|
  json.extract! special_ability, :id, :name, :rule
  json.url special_ability_url(special_ability, format: :json)
end
