require 'spec_helper'

describe 'sign up', type: :feature do
	it 'signs me up' do
		visit '/users/sign_up'
		within 'form#new_user' do
			fill_in 'Username', with: "testSignUp_#{Time.now.to_i}"
			fill_in 'Email', with: 'biubiu@biu.com'
			fill_in 'Password', with: 'null123!'
			fill_in 'Password confirmation', with: 'null123!'
		end
		click_button 'Sign up'
		expect(page).to have_content 'Log out'
	end
end