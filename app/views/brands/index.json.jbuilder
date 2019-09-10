json.array! @brands do |brand|
  json.name brand.name
  json.country brand.country
  json.image brand.image.url
  json.id brand.id
  if brand.twitter.present?
    json.twitter @client.user_search(brand.twitter.sub("https://twitter.com/", ""), count: 5).first&.profile_banner_uri_https.to_s
  end
end