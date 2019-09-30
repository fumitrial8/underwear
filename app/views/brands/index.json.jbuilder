
json.array! @brands do |brand|
  
  json.name brand.name
  json.country brand.country
  json.image brand&.image&.url
  json.id brand.id
  begin
    json.twitter @client&.user_timeline(brand&.twitter&.sub("https://twitter.com/", ""))&.first&.user&.profile_banner_uri_https&.to_s
  rescue
    json.twitter = nil
  end
end

json.array! << {count: Brand.count}