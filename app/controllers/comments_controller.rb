class CommentsController < ApplicationController
  
  def create
    @brand = Brand.find(params[:brand_id])
    @comment = Comment.new(comment_params)
    if @comment.save
      respond_to do |format|
        format.json
        format.html
      end
    else
      redirect_to brand_path(@brand)
    end
  end
  
  def session_create
    session[:country] = params[:country]
    session[:animal] = params[:animal]
    respond_to do |format|
      format.json
      format.html
    end
  end

  private
  
  def comment_params
    params[:animal] = session[:animal]
    params[:country] = session[:country]
    params.permit(:comment, :sexy_rate, :animal, :brand_id, :animal, :country)
  end

end
