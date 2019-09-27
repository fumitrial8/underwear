module ApplicationHelper


  def session_nil?
    if session[:animal] != nil || session[:country] != nil
      return false
    else
      return true
    end
  end

end
