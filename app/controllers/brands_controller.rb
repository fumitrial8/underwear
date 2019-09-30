class BrandsController < ApplicationController

  def home
    @brands = Brand.all
   
  end

  def search
    @brands = Brand.where('name LIKE ?', "#{params[:name]}%").limit(10)
    respond_to do |format|
      format.json
    end
  end

  def show
    @brand = Brand.find(params[:id])
    @country = ISO3166::Country.new("#{@brand.country}")
    @client = set_twitter_client
    if @brand.twitter
      @brand_account = @client&.user_timeline(@brand&.twitter&.sub("https://twitter.com/", ""))&.first&.user
    end
  end

  def index
    @client = set_twitter_client
    
    if params[:page] != nil
      @brands = Brand.limit(params[:show]).offset((params[:page].to_i - 1) * params[:show].to_i)
    else
      @brands = Brand.limit(20).offset(0)
    end
    respond_to do |format|
      format.html 
      format.json
    end
  end

  def new
    @brand = Brand.new
  end

  def create
    @brand = Brand.create(brand_params)
    if @brand.save
      redirect_to root_path
    else
      render :new
      flash.now[:error] = 'Fill below forms'
    end
  end

  def ranking
    @client = set_twitter_client
    rate_ranking = Comment.group(:brand_id).order("average_sexy_rate DESC").limit(20).average(:sexy_rate).keys
    @brands = rate_ranking.map{|brand_id| Brand.find(brand_id)}
    if @brands.empty?
      @brands = Brand.all.shuffle.take(5)
    end
  end
  
  def area_ranking
    @client = set_twitter_client
    countries = []
    @countries = Country.where(region: params[:area])
    @countries.each do |country|
      countries << country[:name]
    end
    @brands = Comment.joins(:brand).where(country: countries).select("*, avg(comments.sexy_rate) as average_rating").group("brands.id").order("average_rating DESC") 
    if @brands.empty?
      @brands = Brand.where(country: countries).shuffle.take(5)
    end
    
  end

  private

  def brand_params
    params.require(:brand).permit(:name, :country, :image)
  end

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

end
