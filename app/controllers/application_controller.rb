class ApplicationController < ActionController::Base
  authorize_resource

  rescue_from CanCan::AccessDenied do |exception|
    redirect_to root_url
  end

end
