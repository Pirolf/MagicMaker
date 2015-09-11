json.array!(@cards) do |card|
  json.extract! card, :id, :image_path, :colors, :attack, :defense, :desc
  json.url card_url(card, format: :json)
end
