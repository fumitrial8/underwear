class CommentsController < ApplicationController
    


  def create
    @brand = Brand.find(params[:brand_id])
    @comment = Comment.new(comment_params)
    if @comment.save
      redirect_to "/brands/#{@brand.id}"
    else
      render '/brands/show'
    end
  end

  private
  
  def comment_params
    params.permit(:comment, :sexy_rate, :animal, :brand_id)
  end

end
