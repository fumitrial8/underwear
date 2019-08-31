json.array! @brands do |brand|
  json.name brand.name
  json.country brand.country
  json.image brand.image.url
  json.id brand.id
  
end