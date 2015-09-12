json.array!(@decks) do |deck|
  json.extract! deck, :id, :name, :desc
  json.url deck_url(deck, format: :json)
end
