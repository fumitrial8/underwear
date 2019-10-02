class ContactsController < ApplicationController
  def new
    @contact = Contact.new
    @brands = Brand.all
    
  end

  def create
    @contact = Contact.create(contact_params)
  end

  private

  def contact_params
    params.require(:contact).permit(:subject, :text, :nickname, :brands_id, :country, :sex, :age)
  end

end
