module ControllerHelpers
  def sign_in(user = double('user'))
  	allow_message_expectations_on_nil
    if user.nil?
      allow(request.env['warden']).to receive(:user_signed_in?).and_throw(:warden, {:scope => :user})
      allow(controller).to receive(:current_user).and_return(nil)
    else
      allow(request.env['warden']).to receive(:user_signed_in?).and_return(true)
      allow(request.env['warden']).to receive(:authenticate!).and_return(user)
      allow(controller).to receive(:current_user).and_return(user)
    end
  end
end