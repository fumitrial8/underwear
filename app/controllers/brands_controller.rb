class BrandsController < ApplicationController
  
  def index
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

  private

  def brand_params
    params.require(:brand).permit(:name, :country, :image)
  end


end
