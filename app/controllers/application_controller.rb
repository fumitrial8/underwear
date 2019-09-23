class ApplicationController < ActionController::Base
  
  

  rescue_from CanCan::AccessDenied do |exception|
    binding.pry
    redirect_to root_url
  end

end
