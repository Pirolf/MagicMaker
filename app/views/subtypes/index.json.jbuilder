json.array!(@subtypes) do |subtype|
  json.extract! subtype, :id
  json.url subtype_url(subtype, format: :json)
end
