class BrandsController < ApplicationController
  
  def home
  end

  def search
    @brands = Brand.where('name LIKE ?', "#{params[:name]}%").limit(10)
    respond_to do |format|
      format.json
    end
  end

  def show
    @brand = Brand.find(params[:id])
  end

  def index
    @brands = Brand.all
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

  private

  def brand_params
    params.require(:brand).permit(:name, :country, :image)
  end

end
