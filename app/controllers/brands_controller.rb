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
      @brand_account = @client.user_search(@brand.twitter.sub("https://twitter.com/", ""), count: 5).first 
    end
  end

  def index
    if params[:page]
      @brands = Brand.limit(params[:show]).offset((params[:page].to_i - 1) * params[:show].to_i)
    else
      @brands = Brand.limit(3).offset(0)
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
    rate_ranking = Comment.group(:brand_id).order("average_sexy_rate DESC").limit(5).average(:sexy_rate).keys
    @brands = rate_ranking.map{|brand_id| Brand.find(brand_id)}
  end
  
  def area_ranking
    americas = ["VI","AW","AI","AG","VG","SV","CU","CW","GT","GP","GD","KY","CR","BL","MF","JM","SX","KN","VC","LC","TC","DO","DM","TT","NI","HT","PA","BS","BM","BB","PR","BZ","BQ","HN","MQ","MX","MS","AR","UY","EC","GY","CO","GS","SR","CL","PY","FK","BR","GF","VE","PE","BO","US","CA","PM"]
    asia = ["IO", "CC", "KM", "SC", "HM", "TF", "MG", "YT", "MV", "RE","RU","UZ","KZ","KG","TJ","TM","AF","AE","YE","IL","IQ","IR","OM","QA","KW","SA","SY","TR","BH","PS","JO","LB","KR","TW","CN","KP","JP","HK","MO","MN","ID","KH","SG","TH","TL","PH","BM","VN","MY","MM","LA","IN","LK","NP","PK","BD","BT"]
    oceania = ["AS", "WF", "AU", "UM", "MP", "KI", "GU", "CK","CX","WS","SB","TV","TK","TO","NR","NU","NC","NZ","NF","VU","PG","PW","PN","FJ","PF","MH","FM"]
    africa = ["GH","CV","GM","GN","GW","CI","SL","SN","SH","TG","EH","BF","BJ","ML","MR","LR","UG","GA","CM","CG","CD","ST","GQ","TD","CF","NG","NE","BI","RW","ET","ER","KE","DJ","SD","SO","TZ","SS","AO","SZ","ZM","ZW","NA","BW","MW","ZA","MU","MZ","LS","DZ","EG","TN","MA","LY"]
    europe = ["IE","AD","GB","IT","NL","GG","GR","SM","GI","JE","CH","ES","DE","VA","FR","BE","PT","IM","MC","LI","LU","CY","MT","AZ","AL","UA","EE","AT","MK","HR","GE","SK","SI","RS","CZ","HU","BG","BY","PL","BA","MD","ME","LV","LT","RO","IS","AX","GL","SE","SJ","DK","NO","FI","FO"]
    world = {'americas' => americas, 'asia' => asia, 'oceania'=> oceania, 'africa'=> africa, 'europe'=> europe}
    region = world[params[:area]]
    @region_brands = Brand.where(country: region)
    @comments = []
    @region_brands.each do |brand|
      @comments << {id: brand.id, average_sexy_rate: brand.comments.average(:sexy_rate), image: brand.image, name: brand.name}
    end
    @comments.sort_by!{|comment| comment[:average]}.reverse.take(5)
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
