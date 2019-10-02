class ContactsController < ApplicationController
  def new
    @contact = Contact.new
    @brands = Brand.all
    
  end

  def create
    begin
      @contact = Contact.create(contact_params)
    rescue => exception
      render new_contact_path
      flash[:fail] = "Can't send your form!! Please check content"
    else
      if @contact.valid?
        redirect_to root_path
        flash[:success] = "Send your contact form successfully !!"
      else
        render new_contact_path
        flash[:fail] = "Can't send your form!! Please check content"
      end
    end
  end

  private

  def contact_params
    params.require(:contact).permit(:subject, :text, :nickname,:brand_id, :country, :sex, :age)
  end

end
