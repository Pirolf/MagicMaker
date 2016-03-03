class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception

  before_action :configure_permitted_parameters, if: :devise_controller?

  def after_sign_in_path_for(resource)
    sign_in_url = new_user_session_url
    if request.referer == sign_in_url
      super
    else
      stored_location_for(resource) || request.referer || root_path
    end
  end

  protected

  def configure_permitted_parameters
    devise_parameter_sanitizer.for(:sign_up) { |u| u.permit(:username, :email, :password, :password_confirmation) }
    #devise_parameter_sanitizer.for(:sign_in) { |u| u.permit(:login, :username, :email, :password) }
  end

  def authenticate_user!
    if user_signed_in?
      super
    else
      redirect_to new_user_session_url
      ## if you want render 404 page
      ## render :file => File.join(Rails.root, 'public/404'), :formats => [:html], :status => 404, :layout => false
    end
  end

  def authorize!
    if user_signed_in?
      authenticate_user!
    else
      render nothing: true, status: :unauthorized
    end
  end
end
