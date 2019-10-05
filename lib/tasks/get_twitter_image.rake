namespace :get_twitter_image do
  desc "This is test"
  task greet: :environment do
    puts "hello"
  end

  desc "This is tweet_test"
  task image: :environment do
    require 'rake'
    def set_twitter_client
      api_key = Rails.application.credentials.twitter[:consumer_api_key]
      api_secret_key = Rails.application.credentials.twitter[:consumer_api_secret_key]
      access_token = Rails.application.credentials.twitter[:access_token]
      access_token_secret = Rails.application.credentials.twitter[:access_token_secret]
  
      @twitter = Twitter::REST::Client.new do |config|
        config.consumer_key = api_key
        config.consumer_secret = api_secret_key
        config.access_token = access_token
        config.access_token_secret = access_token_secret
      end
    end
    @brands = Brand.all
    @brand = Brand.first
    @client = set_twitter_client
    @brands.each do |brand|
      begin
        @image = @client&.user_timeline(brand.twitter&.sub("https://twitter.com/", ""))&.first&.user&.profile_banner_uri_https&.to_s
        @image.slice!("/web")
        brand.remote_image_url = @image
        brand.save!
      rescue
        puts "fail"
      else
        
      end
    end
  end
end
